import { css } from '@emotion/react'
import { animated, to, useSpring, useSpringValue } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types.ts'
import { TypeU } from '@util/common/TypeU'
import { useElemRef } from 'src/util/react-state/useElemRef'
import { getViewProps } from 'src/util/view/ViewProps.ts'
import { RangeU } from 'src/util/common/RangeU'
import { useAsRefGet } from 'src/util/react-state/useAsRefGet.ts'
import { useAwaitMounting } from '@util/react/useAwaitMounting.ts'
import { useNoSelect } from 'src/util/view/useNoSelect.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import clsx from 'clsx'
import React, { useImperativeHandle, useLayoutEffect, useState } from 'react'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import zeroBasedRange = RangeU.zeroBasedRange
import Setter = TypeU.Setter
import NumRangeRo = RangeU.NumRangeRo
import Callback1 = TypeU.Callback1
import Puro = TypeU.Puro
import Ro = TypeU.Ro


// Slider or Scale Picker


/*
Фичи:
  1) Невозможно установить неправильный range из UI
  2) отображение неправильного рэнджа как правильного (left в приоритете)
 
тодо:
  1) Ступенчатый Range Picker
     Добавить тень, которая будет двигаться вместе с пальцем
     Обычный бар будет двигаться дискретно
     Сделать пропсы как на обычный бар, так и на тень
  2) Выделение концов по нажатию (событие active)
 
тодо:
  Правильно реагировать на изменения range / minMax / trackWidth во время перетаскивания ползунков
  1) произошёл сдвиг виджета на экране - пофиг, работаем так, как будто его не двигали
  2) произошло расширение / сужение виджета - учитываем это
  3) снаружи изменили рэндж - учитываем это

тодо:
  Состояние active
*/



// todo autocalculate as css prop
const tipWidth = 21






const dPxToDProgress = (dPx: number, trackW: number, tipW: number) => RangeU.map(
  dPx,
  [0, (trackW - 2 * tipW)],
  [0, 100]
)
const dProgressToDValue = (dProgress: number, minMax: NumRangeRo) => RangeU.map(
  dProgress,
  [0, 100],
  zeroBasedRange(minMax)
)
const progressToValue = (progress: number, minMax: NumRangeRo) => RangeU.clamp(
  minMax[0] + dProgressToDValue(progress, minMax),
  minMax
)
const progressToClampedProgress = (progress: number) => RangeU.clamp(progress, [0, 100])
const valueToClampedValue = (value: number, minMax: NumRangeRo) => RangeU.clamp(
  value,
  minMax
)
const progressToUiPercentRight = (progress: number, trackW: number): number => 100 - RangeU.map(
  progress,
  [0, 100],
  [100 * 2 * tipWidth / trackW, 100]
)


const valueToProgress = (value: number, minMax: NumRangeRo): number => RangeU.mapClamp(
  value, minMax, [0, 100]
)





export type SliderExtraProps = Ro<{
  value: number
  setValue: Setter<number>
  minMax: NumRangeRo
}> & Puro<{
  onValueDragStart: Callback1<number>
  onValueDragging: Callback1<number>
  onValueDragEnd: Callback1<number>
  isHideBar: boolean
}>


export type SliderRefElement = HTMLDivElement
export type SliderProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & SliderExtraProps


const Slider = React.memo(
  React.forwardRef<SliderRefElement, SliderProps>(
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
      
      const [trackRef, getTrack] = useElemRef<SliderRefElement>(null)
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
      // todo add px distance between start & curr progress
      
      const [getValueProgress, setValueProgress] = useRefGetSet(0)
      
      
      
      const shadowBarRightSpring = useSpringValue(0)
      const barRightSpring = useSpringValue(0)
      
      
      const [getBarRightPercent, setBarRightPercent] = useRefGetSet(100)
      
      const [getUpdateBars] = useAsRefGet(() => {
        const trackW = getTrackDimens().w
        const uiPercentRight = progressToUiPercentRight(getValueProgress(), trackW)
        
        const shadowBarRight = Math.min(getBarRightPercent(), uiPercentRight)
        shadowBarRightSpring.set(shadowBarRight)
        
        const barRight = isDragging ? Math.max(getBarRightPercent(), uiPercentRight) : getBarRightPercent()
        barRightSpring.set(barRight)
      })
      
      useLayoutEffect(() => {
        const progress = valueToProgress(outerValue, outerMinMax)
        const trackW = getTrackDimens().w
        const uiPercentRight = progressToUiPercentRight(progress, trackW)
        setBarRightPercent(uiPercentRight)
      }, [outerValue, ...outerMinMax])
      
      useLayoutEffect(() => {
        getUpdateBars()()
      }, [isDragging, outerValue, ...outerMinMax])
      
      
      // noinspection JSVoidFunctionReturnValueUsed
      const onTrackDrag = useDrag(
        gesture => {
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
            
            const dragStartProgressRight = dPxToDProgress(
              vpx - (trackX + 3 / 2 * tipWidth),
              trackW,
              tipWidth,
            )
            setDragStartProgress(dragStartProgressRight)
          }
          
          const dProgress = dPxToDProgress(dx, trackW, tipWidth)
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
        }
      ) as () => ReactDOMAttributes
      
      
      
      // forbid draw to screen before data from element ref are available
      useAwaitMounting()
      
      // forbid content selection for all elements while dragging scrollbar
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
  )
)
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

