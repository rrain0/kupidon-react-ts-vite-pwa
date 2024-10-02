import { css } from '@emotion/react'
import { animated, to, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types.ts'
import { useElemRef } from 'src/util/react-state/useElemRef'
import { getViewProps } from 'src/util/view/ViewProps.ts'
import { RangeU } from 'src/util/common/RangeU'
import { useAsRefGet } from 'src/util/react-state/useAsRefGet.ts'
import { useAwaitMounting } from '@util/react/useAwaitMounting.ts'
import { useNoSelect } from 'src/util/view/useNoSelect.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import clsx from 'clsx'
import React, { useImperativeHandle, useLayoutEffect, useState } from 'react'
import { TypeU } from '@util/common/TypeU.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import SetterOrUpdater = TypeU.SetterOrUpdater
import NumRange = RangeU.NumRange
import zeroBasedRange = RangeU.zeroBasedRange


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
const dProgressToDValue = (dProgress: number, minMax: NumRange) => RangeU.map(
  dProgress,
  [0, 100],
  zeroBasedRange(minMax)
)
const progressToValue = (progress: number, minMax: NumRange) => RangeU.clamp(
  minMax[0] + dProgressToDValue(progress, minMax),
  minMax
)
const progressToClampedProgress = (progress: number) => RangeU.clamp(progress, [0, 100])
const valueToClampedValue = (value: number, minMax: NumRange) => RangeU.clamp(
  value,
  minMax
)
const progressToUiPercentRight = (progress: number, trackW: number): number => 100 - RangeU.map(
  progress,
  [0, 100],
  [100 * 2 * tipWidth / trackW, 100]
)


const valueToProgress = (value: number, minMax: NumRange): number => RangeU.mapClamp(
  value, minMax, [0, 100]
)





export type SliderExtraProps = {
  value: number
  setValue: SetterOrUpdater<number>
  minMax: NumRange
}


export type SliderRefElement = HTMLDivElement
export type SliderProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & SliderExtraProps


const Slider = React.memo(
  React.forwardRef<SliderRefElement, SliderProps>(
    (props, forwardedRef) => {
      const {
        minMax: outerMinMax,
        value: outerValue,
        setValue: setOuterValue,
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
      
      const [isDragging, setIsDragging] = useState(false)
      const [getDragStartProgress, setDragStartProgress] = useRefGetSet(0) // 0..100
      const [getDragProgress, setDragProgress] = useRefGetSet(0) // any number in 0..100 units
      // todo add px distance between start & curr progress
      
      const [getValueProgress, setValueProgress] = useRefGetSet(0)
      
      
      
      const [barSpring, barSpringApi] = useSpring(() => ({ right: 0 }))
      const [shadowBarSpring, shadowBarSpringApi] = useSpring(() => ({ right: 0 }))
      
      const setValue = (value: number) => {
        setOuterValue(value)
      }
      
      const [barRightPercent, setBarRightPercent] = useState(100)
      useLayoutEffect(() => {
        const progress = valueToProgress(outerValue, outerMinMax)
        const trackW = getTrackDimens().w
        const uiPercent = progressToUiPercentRight(progress, trackW)
        setBarRightPercent(uiPercent)
      }, [outerValue, ...outerMinMax])
      
      
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
          if (active) {
            const dProgress = dPxToDProgress(dx, trackW, tipWidth)
            const dragProgress = getDragProgress() + dProgress
            setDragProgress(dragProgress)
            
            const valueProgressRight = getDragStartProgress() + getDragProgress()
            const valueProgressRightClamped = progressToClampedProgress(valueProgressRight)
            setValueProgress(valueProgressRightClamped)
            
            const valueRight = progressToValue(valueProgressRightClamped, minMax)
            const valueRightClamped = valueToClampedValue(valueRight, minMax)
            setValue(valueRightClamped)
            
            const uiPercentRight = progressToUiPercentRight(getValueProgress(), trackW)
            shadowBarSpringApi.set({ right: uiPercentRight })
          }
          if (last) {
            setIsDragging(false)
          }
        }
      ) as () => ReactDOMAttributes
      
      
      
      // forbid draw to screen before data from element ref are available
      useAwaitMounting()
      
      // forbid content selection for all elements while dragging scrollbar
      useNoSelect(isDragging)
      
      
      //console.log('isDragging, barRightPercent', isDragging, barRightPercent)
      
      
      return (
        <div css={trackStyle}
          className={clsx(className /* ScrollbarVerticalStyle.El.track.name */)}
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
              right: to([shadowBarSpring.right], r => {
                return `${Math.min(barRightPercent, r)}%`
              }),
              /* right: barRightPercent >= shadowBarSpring.right.get()
                ? to([shadowBarSpring.right], r => `${r}%`)
                : `${barRightPercent}%`, */
              //zIndex: barRightPercent >= shadowBarSpring.right.get() ? 'auto' : 1,
            }}
          />
          
          <animated.div css={bar}
            style={{
              // @ts-expect-error
              right: isDragging
                ? to([shadowBarSpring.right], r => {
                  return `${Math.max(barRightPercent, r)}%`
                })
                : `${barRightPercent}%`,
              /* right: barRightPercent >= shadowBarSpring.right.get()
                ? `${barRightPercent}%`
                : to([shadowBarSpring.right], r => `${r}%`), */
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

