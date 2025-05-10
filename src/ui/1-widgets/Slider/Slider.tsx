import { css } from '@emotion/react'
import { animated, to, useSpringValue } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { TypeU } from '@util/common/TypeU'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import { getViewProps } from 'src/util/view/ViewProps.ts'
import { RangeU } from 'src/util/common/RangeU'
import { useAsRefGet } from 'src/util/react-state/useAsRefGet.ts'
import { useAwaitMounting } from '@util/react/useAwaitMounting.ts'
import { useNoSelect } from '@util/pointer/useNoSelect.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import clsx from 'clsx'
import React, { useImperativeHandle, useLayoutEffect, useState } from 'react'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import zeroBasedRange = RangeU.zeroBased
import Setter = TypeU.Setter
import NumRange = RangeU.NumRange
import Callback1 = TypeU.Callback1
import Pu = TypeU.Pu


// Slider or Scale Picker

// TODO extract logic to hook useSlider

/*
Фичи:
  1) Невозможно установить неправильное value из UI
  2) Отображение переданного неправильного value как правильного в пределах minMax
  3) Тень.
     3.1) При перемещении пальца правее текущего значения - тень двигается за пальцем,
          а шкала остаётся на месте, пока значение не изменится.
     3.2) При перемещении пальца влево, тень остаётся на месте,
          а шкала двигается с пальцем, пока значение не изменится
  4) Реагирует на изменения.
     4.1) Изменение высоты не влияет на работу слайдера.
     4.1) Изменение value мгновенно учитывается во время драгания.
     4.2) При перемещении слайдера по экрану во время драгания,
          драгание происходит, как будто он остался на месте.
     4.3) Изменение minMax: просто пресчитываются новые значения dragValue, drag шкала остаётся на месте.
          value не будет изменено, пока бар не подрагается.
          Если сразу надо было новое value вместе с minMax,
          то его сразу должны были пересчитать снаружи и отправить с minMax.
     4.3) При изменении ширины слайдера во время драгания,
          все его значения шкал пропорционально сжимаются (через проценты CSS),
          текущая точка под пальцем сохраняет значение, но относительно неё пропорционально изменяются
          начальное положение пальца и количество value/px пропорционально изменениям размеров слайдера
          (происходит автоматически,
          т.к. хранится начальный прогресс и dProgress, которые не привязаны к пикселям).
 
 TODO:
  1) Какой-нибудь визуальный отклик по нажатию (состояние active)
  2) Вынести логику вычислений в хук
  3) Возможно стоит сделать значение через Spring
*/



// todo autocalculate as css prop
const barLeftOffset = 21
const barRightOffset = 21





// dPx -> dProgress -> dValue
const dPxToDProgress = (dPx: number, trackW: number, lOffset: number, rOffset: number) => RangeU.map(
  dPx,
  [0, (trackW - (lOffset + rOffset))],
  [0, 100]
)
const dProgressToDValue = (dProgress: number, minMax: NumRange) => RangeU.map(
  dProgress,
  [0, 100],
  zeroBasedRange(minMax)
)

// progress -> clampedProgress -> value -> clampedValue
const progressToClampedProgress = (progress: number) => RangeU.clamp(
  progress,
  [0, 100]
)
const progressToValue = (progress: number, minMax: NumRange) => RangeU.clamp(
  minMax[0] + dProgressToDValue(progress, minMax),
  minMax
)
const valueToClampedValue = (value: number, minMax: NumRange) => RangeU.clamp(
  value,
  minMax
)

// progress -> uiPercent
const progressToUiPercentRight =
(progress: number, w: number, lOffset: number, rOffset: number): number => 100 - RangeU.map(
  progress,
  [0, 100],
  [100 * (lOffset + rOffset) / w, 100]
)

// value -> clampedProgress
const valueToClampedProgress = (value: number, minMax: NumRange): number => RangeU.mapClamp(
  value,
  minMax,
  [0, 100]
)





export type SliderExtraProps = {
  value: number
  setValue: Setter<number>
  minMax: NumRange
} & Pu<{
  onValueDragStart: Callback1<number>
  onValueDragging: Callback1<number>
  onValueDragEnd: Callback1<number>
  isHideBar: boolean
}>


export type SliderRefElement = HTMLDivElement
export type SliderProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & SliderExtraProps


const Slider = React.memo(React.forwardRef<SliderRefElement, SliderProps>(
  (props, forwardedRef) => {
    const {
      value: outerValue,
      setValue: setOuterValue,
      minMax: outerMinMax,
      onValueDragStart,
      onValueDragging,
      onValueDragEnd,
      isHideBar,
      className,
      ...restProps
    } = props
    
    const [getTrack, , trackRef] = useElemRefGetSet<SliderRefElement>()
    useImperativeHandle(forwardedRef, () => trackRef.current!, [])
    
    const getTrackDimens = () => {
      const track = getTrack()
      if (track) {
        const d = getViewProps(track)
        return { vpx: d.vpx, w: d.w }
      }
      return { vpx: 0, w: 0 }
    }
    
    const [getMinMax] = useAsRefGet(outerMinMax)
    const [getOnValueDragStart] = useAsRefGet(onValueDragStart)
    const [getOnValueDragging] = useAsRefGet(onValueDragging)
    const [getOnValueDragEnd] = useAsRefGet(onValueDragEnd)
    
    const [isDragging, setIsDragging] = useState(false)
    const [getDragStartProgress, setDragStartProgress] = useRefGetSet(0) // 0..100
    const [getDragProgress, setDragProgress] = useRefGetSet(0) // any number in 0..100 units
    
    const [getValueProgress, setValueProgress] = useRefGetSet(0)
    
    
    
    const shadowBarRightSpring = useSpringValue(0)
    const barRightSpring = useSpringValue(0)
    
    
    const [getBarRightPercent, setBarRightPercent] = useRefGetSet(100)
    
    const [getUpdateBars] = useAsRefGet(() => {
      const trackW = getTrackDimens().w
      const uiPercentRight = progressToUiPercentRight(
        getValueProgress(), trackW, barLeftOffset, barRightOffset
      )
      
      const shadowBarRight = Math.min(getBarRightPercent(), uiPercentRight)
      shadowBarRightSpring.set(shadowBarRight)
      
      const barRight = isDragging ? Math.max(getBarRightPercent(), uiPercentRight) : getBarRightPercent()
      barRightSpring.set(barRight)
    })
    
    useLayoutEffect(() => {
      const progress = valueToClampedProgress(outerValue, outerMinMax)
      const trackW = getTrackDimens().w
      const uiPercentRight = progressToUiPercentRight(
        progress, trackW, barLeftOffset, barRightOffset
      )
      setBarRightPercent(uiPercentRight)
    }, [outerValue, ...outerMinMax])
    
    useLayoutEffect(() => {
      getUpdateBars()()
    }, [isDragging, outerValue, ...outerMinMax])
    
    
    const onTrackDrag = useDrag(gesture => {
      const {
        first, active, last,
        xy: [vpx, vpy],
        movement: [mx, my],
        delta: [dx, dy],
      } = gesture
      
      const minMax = getMinMax()
      const { vpx: trackX, w: trackW } = getTrackDimens()
      
      if (first) {
        setDragStartProgress(0)
        setDragProgress(0)
        setIsDragging(true)
        
        const startPx = vpx - (trackX + barLeftOffset + barRightOffset / 2)
        const dragStartProgressRight = dPxToDProgress(
          startPx, trackW, barLeftOffset, barRightOffset
        )
        setDragStartProgress(dragStartProgressRight)
      }
      
      const dProgress = dPxToDProgress(dx, trackW, barLeftOffset, barRightOffset)
      const dragProgress = getDragProgress() + dProgress
      setDragProgress(dragProgress)
      
      const valueProgressRight = getDragStartProgress() + getDragProgress()
      const valueProgressRightClamped = progressToClampedProgress(valueProgressRight)
      setValueProgress(valueProgressRightClamped)
      
      const valueRight = progressToValue(valueProgressRightClamped, minMax)
      const valueRightClamped = valueToClampedValue(valueRight, minMax)
      
      setOuterValue(valueRightClamped)
      if (first) getOnValueDragStart()?.(valueRightClamped)
      if (!first && !last) getOnValueDragging()?.(valueRightClamped)
      
      getUpdateBars()()
      
      if (last) {
        setIsDragging(false)
        getOnValueDragEnd()?.(valueRightClamped)
      }
    }, { })
    
    
    
    // forbid draw to screen before data from element ref are available
    useAwaitMounting()
    
    // forbid content selection for all elements while dragging
    useNoSelect(isDragging)
    
    
    return (
      <div css={trackStyle}
        className={clsx(className/*, ScrollbarVerticalStyle.El.track.name */)}
        /* {...{ [ScrollbarVerticalStyle.Attr.active.name]: trueOrUndef(isDragging) }} */
        // TODO combine handlers from restProps and onTrackDrag()
        {...restProps}
        {...onTrackDrag()}
        ref={trackRef}
      >
        
        <animated.div css={shadowBar}
          style={{
            // @ts-expect-error
            display: isDragging ? 'flex' : 'none',
            right: to([shadowBarRightSpring], r => `${r}%`),
          }}
        />
        
        <animated.div css={bar}
          style={{
            // @ts-expect-error
            display: !isHideBar ? 'flex' : 'none',
            right: to([barRightSpring], r => `${r}%`),
          }}
        />
        
      </div>
    )
  }
))
export default Slider


const trackStyle = (t: AppTheme.Theme) => css`
  touch-action: none; // prevents browser gesture handling on mobile devices
  width: 100%;
  height: 42px;
  position: relative;
  border-radius: 999999px;
  border: none;
  background: ${t.rangePicker.trackBg[0]};
`

const bar = (t: AppTheme.Theme) => css`
  position: absolute;
  height: 100%;
  background: ${t.rangePicker.barBg[0]};
  border-radius: inherit;
  left: 0;
  
  // manipulate right to display actual value
  right: 100%;
`

const shadowBar = (t: AppTheme.Theme) => css`
  position: absolute;
  height: 100%;
  background: #00000022;
  border-radius: inherit;
  left: 0;
  
  // manipulate right to display actual value
  right: 100%;
`

