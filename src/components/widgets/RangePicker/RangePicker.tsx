import { css } from '@emotion/react'
import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { getViewProps } from 'src/utils/view/ViewProps.ts'
import {
  rangeClamp,
  rangeMap,
  rangeMapClamp,
  rangeZeroBased,
} from '@utils/base/math/rangeUtils.ts'
import { useAsRefGet } from '@utils/state/react/base/useAsRefGet.ts'
import { useSkipRepaintAfterMount } from '@utils/react/useSkipRepaintAfterMount.ts'
import { useNoSelect } from '@utils/move/pointer/useNoSelect.ts'
import { useRefGetSet } from '@utils/state/react/base/useRefGetSet.ts'
import clsx from 'clsx'
import React, { useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import { Pu } from '@utils/base/tsUtils.ts'
import { Mapper } from '@utils/base/tsUtils.ts'
import { SetterOrUpdater } from '@utils/base/tsUtils.ts'
import { NumRange } from '@utils/base/math/rangeUtils.ts'




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




const tipWidth = 27



export type RangePickerExtraProps = {
  minMax: NumRange
  range: NumRange
  setRange: SetterOrUpdater<NumRange>
} & Pu<{
  toDisplayedRange: Mapper<NumRange> // можно сделать ступенчатый прогресс
}>
export type RangePickerProps =
  & Omit<React.ComponentProps<'div'>, 'children'>
  & RangePickerExtraProps



const RangePicker = React.memo((props: RangePickerProps) => {
  const {
    ref, className,
    minMax: outerMinMax,
    range: outerRange,
    setRange: setOuterRange,
    toDisplayedRange,
    ...restProps
  } = props
  
  const trackRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => trackRef.current!, [])
  
  const getTrackDimens = () => {
    const trackProps = {
      vpx: 0,
      width: 0,
    }
    const track = trackRef.current
    if (track) {
      const d = getViewProps(track)
      trackProps.vpx = d.vpXFloat
      trackProps.width = d.widthFloat
    }
    return trackProps
  }
  
  const [prevMinMax, setPrevMinMax] = useState(outerMinMax)
  const [prevRange, setPrevRange] = useState(outerRange)
  
  const [getMinMax] = useAsRefGet(outerMinMax)
  
  const [isDragging, setIsDragging] = useState(false)
  const [getActiveTip, setActiveTip] = useRefGetSet(null as 'left' | 'right' | null)
  // % of bar handle values width
  const [getStartProgress, setStartProgress] = useRefGetSet(0)
  const [getCurrProgress, setCurrProgress] = useRefGetSet(0)
  // todo add px distance between start & curr progress
  
  const [getProgressRange, setProgressRange] = useRefGetSet<NumRange>(
    rangeToProgress(outerRange, outerMinMax)
  )
  
  
  
  const [barSpring, barSpringApi] = useSpring(() => ({
    left: '0%',
    right: '0%',
  }))
  useLayoutEffect(() => {
    const trackW = getTrackDimens().width
    //console.log('trackW', trackW)
    const uiPercent = progressToUiPercent(getProgressRange(), trackW)
    barSpringApi.set({
      left: `${uiPercent[0]}%`,
      right: `${uiPercent[1]}%`,
    })
  }, [])
  
  const [getRange, setRange] = useRefGetSet<NumRange>(outerRange)
  const setAllRanges = (range: NumRange) => {
    setRange(range)
    setPrevRange(range)
    setOuterRange(range)
  }
  
  
  useEffect(() => {
    if (outerMinMax !== prevMinMax || outerRange !== prevRange) {
      setPrevMinMax(outerMinMax)
      setPrevRange(outerRange)
      setRange(outerRange)
      const progress = rangeToProgress(outerRange, outerMinMax)
      setProgressRange(progress)
      const trackW = getTrackDimens().width
      const uiPercent = progressToUiPercent(progress, trackW)
      barSpringApi.set({
        left: `${uiPercent[0]}%`,
        right: `${uiPercent[1]}%`,
      })
    }
  }, [outerRange, outerMinMax])
  
  
  const onTrackDrag = useDrag(gesture => {
    const {
      first, active, last,
      xy: [vpx, vpy],
      movement: [mx, my],
      delta: [dx, dy],
    } = gesture
    
    const minMax = getMinMax()
    const { vpx: trackX, width: trackW } = getTrackDimens()
    
    const dPxToDProgress = (dPx: number) => rangeMap(
      dPx,
      [0, (trackW - 2*tipWidth)],
      [0, 100]
    )
    const dProgressToDValue = (dProgress: number) => rangeMap(
      dProgress,
      [0, 100],
      rangeZeroBased(minMax)
    )
    const progressToValue = (progress: number) => rangeClamp(
      minMax[0] + dProgressToDValue(progress),
      minMax
    )
    
    if (first) {
      setActiveTip(null)
      setStartProgress(0)
      setCurrProgress(0)
      setIsDragging(true)
      
      const startProgressLeft = dPxToDProgress(vpx - (trackX + 1/2*tipWidth))
      const startProgressRight = dPxToDProgress(vpx - (trackX + 3/2*tipWidth))
      const [progressLeft, progressRight] = getProgressRange()
      
      
      setActiveTip(
        (startProgressLeft - progressLeft) <= (progressRight - startProgressRight)
          ? 'left' : 'right'
      )
      
      if (getActiveTip() === 'left') {
        setStartProgress(startProgressLeft)
      }
      if (getActiveTip() === 'right') {
        setStartProgress(startProgressRight)
      }
    }
    if (active) {
      
      const dProgress = dPxToDProgress(dx)
      setCurrProgress(getCurrProgress() + dProgress)
      
      if (getActiveTip() === 'left') {
        const [, progressRight] = getProgressRange()
        const progressLeft = rangeClamp(
          getStartProgress() + getCurrProgress(),
          [0, progressRight]
        )
        setProgressRange([progressLeft, progressRight])
        
        const [, rangeR] = getRange()
        const rangeL = rangeClamp(
          progressToValue(progressLeft),
          [minMax[0], rangeR]
        )
        setAllRanges([rangeL, rangeR])
      }
      if (getActiveTip() === 'right') {
        const [progressLeft] = getProgressRange()
        const progressRight = rangeClamp(
          getStartProgress() + getCurrProgress(),
          [progressLeft, 100]
        )
        setProgressRange([progressLeft, progressRight])
        
        const [rangeL] = getRange()
        const rangeR = rangeClamp(
          progressToValue(progressRight),
          [rangeL, minMax[1]]
        )
        setAllRanges([rangeL, rangeR])
      }
      
      const uiPercent = progressToUiPercent(getProgressRange(), trackW)
      barSpringApi.set({
        left: `${uiPercent[0]}%`,
        right: `${uiPercent[1]}%`,
      })
      
    }
    if (last) {
      setIsDragging(false)
    }
  }, { })
  
  
  
  
  // forbid draw to screen before data from element ref are available
  useSkipRepaintAfterMount()
  
  // forbid content selection for all elements while dragging scrollbar
  useNoSelect(isDragging)
  
  
  
  const trackProps = {
    className: clsx(className /* ScrollbarVerticalStyle.El.track.name */),
    /* [ScrollbarVerticalStyle.Attr.active.name]: trueOrUndef(isDragging), */
    ...restProps,
    ref: trackRef,
  }
  
  
  
  
  return (
    <div css={trackStyle}
      {...trackProps}
      {...onTrackDrag()}
      ref={trackRef}
    >
      <animated.div css={bar}
        // @ts-expect-error
        style={{ ...barSpring }}
      >
        <div css={leftHandle}/>
        <div css={rightHandle}/>
      </animated.div>
    </div>
  )
})
export default RangePicker



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
  
  // manipulate left & right to display actual range data
  left: 0%;
  right: 0%;
  
  display: grid;
  grid: 'lHandle . rHandle' 100% / auto 1fr auto;
  padding: 5px;
`
const leftHandle = (t: AppTheme.Theme) => css`
  grid-area: lHandle;
  height: 32px;
  width: 19px;
  border-radius: 16px 3px 3px 16px;
  background: ${t.rangePicker.handleBg[0]};
`
const rightHandle = (t: AppTheme.Theme) => css`
  grid-area: rHandle;
  height: 32px;
  width: 19px;
  border-radius: 3px 16px 16px 3px;
  background: ${t.rangePicker.handleBg[0]};
`




const progressToUiPercent = (progress: NumRange, trackW: number): NumRange => [
  rangeMap(
    progress[0],
    [0, 100],
    [0, 100 * (trackW - 2 * tipWidth) / trackW ]
  ),
  100 - rangeMap(
    progress[1],
    [0, 100],
    [100 * 2 * tipWidth / trackW, 100]
  ),
]


const rangeToProgress = (range: NumRange, minMax: NumRange): NumRange => {
  const progressLeft = rangeMapClamp(
    range[0], minMax, [0, 100]
  )
  const progressRight = rangeMapClamp(
    range[1], minMax, [0, 100], [progressLeft, 100]
  )
  return [progressLeft, progressRight]
}
