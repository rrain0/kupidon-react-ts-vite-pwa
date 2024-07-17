import { css } from '@emotion/react'
import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types.ts'
import { getElemProps } from '@util/element/ElemProps.ts'
import { RangeU } from 'src/util/common/RangeU'
import { useAsRefGet } from 'src/util/react-state-and-ref/useAsRefGet.ts'
import { useAwaitMounting } from '@util/react/useAwaitMounting.ts'
import { useNoSelect } from 'src/util/element/useNoSelect.ts'
import { useRefGetSet } from 'src/util/react-state-and-ref/useRefGetSet.ts'
import clsx from 'clsx'
import React, { useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import { TypeU } from '@util/common/TypeU.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import PartialUndef = TypeU.PartialUndef
import Mapper = TypeU.Mapper
import SetterOrUpdater = TypeU.SetterOrUpdater
import NumRange = RangeU.NumRange
import zeroBasedRange = RangeU.zeroBasedRange




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



export type RangePickerCustomProps = {
  minMax: NumRange
  range: NumRange
  setRange: SetterOrUpdater<NumRange>
} & PartialUndef<{
  toDisplayedRange: Mapper<NumRange> // можно сделать ступенчатый прогресс
}>
export type RangePickerForwardRefProps = Omit<React.JSX.IntrinsicElements['div'], 'children'>
export type RangePickerRefElement = HTMLDivElement
export type RangePickerProps = RangePickerCustomProps & RangePickerForwardRefProps



const RangePicker =
React.memo(
React.forwardRef<RangePickerRefElement, RangePickerProps>(
(props, forwardedRef) => {
  const {
    minMax: outerMinMax,
    range: outerRange,
    setRange: setOuterRange,
    toDisplayedRange,
    className,
    ...restProps
  } = props
  
  const trackRef = useRef<RangePickerRefElement>(null)
  useImperativeHandle(forwardedRef, () => trackRef.current!, [])
  
  const getTrackDimens = () => {
    const trackProps = {
      vpx: 0,
      width: 0,
    }
    const track = trackRef.current
    if (track) {
      const d = getElemProps(track)
      trackProps.vpx = d.vpXFloat
      trackProps.width = d.widthFloat
    }
    return trackProps
  }
  
  const [prevMinMax, setPrevMinMax] = useState(outerMinMax)
  const [prevRange, setPrevRange] = useState(outerRange)
  
  const getMinMax = useAsRefGet(outerMinMax)
  
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
      const { vpx: trackX, width: trackW } = getTrackDimens()
      
      const dPxToDProgress = (dPx: number) => RangeU.map(
        dPx,
        [0, (trackW - 2*tipWidth)],
        [0, 100]
      )
      const dProgressToDValue = (dProgress: number) => RangeU.map(
        dProgress,
        [0, 100],
        zeroBasedRange(minMax)
      )
      const progressToValue = (progress: number) => RangeU.clamp(
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
          const progressLeft = fitRange(
            getStartProgress() + getCurrProgress(),
            [0, progressRight]
          )
          setProgressRange([progressLeft, progressRight])
          
          const [, rangeR] = getRange()
          const rangeL = fitRange(
            progressToValue(progressLeft),
            [minMax[0], rangeR]
          )
          setAllRanges([rangeL, rangeR])
        }
        if (getActiveTip() === 'right') {
          const [progressLeft] = getProgressRange()
          const progressRight = fitRange(
            getStartProgress() + getCurrProgress(),
            [progressLeft, 100]
          )
          setProgressRange([progressLeft, progressRight])
          
          const [rangeL] = getRange()
          const rangeR = fitRange(
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
    }
  ) as () => ReactDOMAttributes
  
  
  
  
  // forbid draw to screen before data from element ref are available
  useAwaitMounting()
  
  // forbid content selection for all elements while dragging scrollbar
  useNoSelect(isDragging)
  
  
  
  const trackProps = {
    className: clsx(className /* ScrollbarVerticalStyle.El.track.name */),
    /* [ScrollbarVerticalStyle.Attr.active.name]: trueOrUndef(isDragging), */
    ...restProps,
    ref: trackRef,
  }
  
  
  
  
  return <div css={trackStyle}
    {...trackProps}
    {...onTrackDrag()}
    ref={trackRef}
  >
    <animated.div css={bar}
      style={{ ...barSpring }}
    >
      <div css={leftHandle}/>
      <div css={rightHandle}/>
    </animated.div>
  </div>
}))
export default RangePicker



const trackStyle = (t: AppTheme.Theme) => css`
  touch-action: none; // prevents browser gesture handling on mobile devices
  width: 100%;
  height: 42px;
  position: relative;
  border-radius: 999999px;
  border: none;
  background: ${t.rangePicker.trackBgc[0]};
`

const bar = (t: AppTheme.Theme) => css`
  position: absolute;
  height: 100%;
  background: ${t.rangePicker.barBgc[0]};
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
  background: ${t.rangePicker.handleBgc[0]};
`
const rightHandle = (t: AppTheme.Theme) => css`
  grid-area: rHandle;
  height: 32px;
  width: 19px;
  border-radius: 3px 16px 16px 3px;
  background: ${t.rangePicker.handleBgc[0]};
`




const progressToUiPercent = (progress: NumRange, trackW: number): NumRange => [
  RangeU.map(
    progress[0],
    [0, 100],
    [0, 100 * (trackW - 2*tipWidth) / trackW ]
  ),
  100 - RangeU.map(
    progress[1],
    [0, 100],
    [100 * 2*tipWidth / trackW, 100]
  ),
]


const rangeToProgress = (range: NumRange, minMax: NumRange): NumRange => {
  const progressLeft = RangeU.mapClamp(
    range[0], minMax, [0, 100]
  )
  const progressRight = RangeU.mapClamp(
    range[1], minMax, [0, 100], [progressLeft, 100]
  )
  return [progressLeft, progressRight]
}
