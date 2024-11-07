import { animated, to, useSpringValue } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types'
import clsx from 'clsx'
import React, { useLayoutEffect } from 'react'
import { ArrayU } from 'src/util/common/ArrayU'
import { RangeU } from 'src/util/common/RangeU'
import { TypeU } from 'src/util/common/TypeU'
import { useAsRefGet } from 'src/util/react-state/useAsRefGet'
import { useMemoCompare } from 'src/util/react-state/useMemoCompare'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import { useNoSelect } from 'src/util/view/useNoSelect'
import NumRangeRo = RangeU.NumRangeRo
import Puro = TypeU.Puro
import Callback1 = TypeU.Callback1
import Setter = TypeU.Setter
import zeroBasedRange = RangeU.zeroBasedRange








// TODO
// todo autocalculate as css prop
const barLeftOffset = 21
const barRightOffset = 21





// dPx -> dProgress -> dValue
const dPxToDProgress = (dPx: number, trackLen: number) => RangeU.map(
  dPx,
  [0, trackLen],
  [0, 100]
)
const dProgressToDValue = (dProgress: number, minMax: NumRangeRo) => RangeU.map(
  dProgress,
  [0, 100],
  zeroBasedRange(minMax)
)

// progress -> clampedProgress -> value -> clampedValue
const progressToClampedProgress = (progress: number) => RangeU.clamp(
  progress,
  [0, 100]
)
const progressToValue = (progress: number, minMax: NumRangeRo) => RangeU.clamp(
  minMax[0] + dProgressToDValue(progress, minMax),
  minMax
)
const valueToClampedValue = (value: number, minMax: NumRangeRo) => RangeU.clamp(
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
const valueToClampedProgress = (value: number, minMax: NumRangeRo): number => RangeU.mapClamp(
  value,
  minMax,
  [0, 100]
)




export type UseSnappedDragP = {
  value: number
  setValue: Setter<number>
  isDragging: boolean
  setIsDragging: Setter<boolean>
} & Puro<{
  minMax: NumRangeRo
  
  // TODO rename to onDragStart, onDragging, onDragEnd
  // TODO send (value, valueProgress)
  onValueDragStart: Callback1<number>
  onValueDragging: Callback1<number>
  onValueDragEnd: Callback1<number>
}>

export const useSnappedDrag = (props: UseSnappedDragP) => {
  const {
    value,
    setValue,
    isDragging,
    setIsDragging,
    // TODO [0, trackLen] [0%, 100%]
    minMax: rawMinMax = [0, 1],
    onValueDragStart,
    onValueDragging,
    onValueDragEnd,
  } = props

  // track start viewport coordinate
  const [getTrackStart, setTrackStart] = useRefGetSet(0)
  // track length
  const [getTrackLen, setTrackLen] = useRefGetSet(0)
  
  const minMax = useMemoCompare(rawMinMax, ArrayU.eq)
  
  const [getMinMax] = useAsRefGet(minMax)
  
  const [getOnValueDragStart] = useAsRefGet(onValueDragStart)
  const [getOnValueDragging] = useAsRefGet(onValueDragging)
  const [getOnValueDragEnd] = useAsRefGet(onValueDragEnd)
  
  
  const [getDragStartProgress, setDragStartProgress] = useRefGetSet(0) // ..0..100..
  const [getDragProgress, setDragProgress] = useRefGetSet(0) // ..0..100..
  const [getValueProgress, setValueProgress] = useRefGetSet(0) // ..0..100..
  
  // TODO
  const shadowBarRightSpring = useSpringValue(0)
  // TODO
  const barRightSpring = useSpringValue(0)
  
  // TODO
  const [getBarRightPercent, setBarRightPercent] = useRefGetSet(100)
  
  // TODO
  const [getUpdateBars] = useAsRefGet(() => {
    const trackLen = getTrackLen()
    const uiPercentRight = progressToUiPercentRight(
      getValueProgress(), trackLen, barLeftOffset, barRightOffset
    )
    
    const shadowBarRight = Math.min(getBarRightPercent(), uiPercentRight)
    shadowBarRightSpring.set(shadowBarRight)
    
    const barRight = isDragging ? Math.max(getBarRightPercent(), uiPercentRight) : getBarRightPercent()
    barRightSpring.set(barRight)
  })
  
  // TODO
  useLayoutEffect(() => {
    const progress = valueToClampedProgress(value, minMax)
    const trackLen = getTrackLen()
    const uiPercentRight = progressToUiPercentRight(
      progress, trackLen, barLeftOffset, barRightOffset
    )
    setBarRightPercent(uiPercentRight)
  }, [value, minMax])
  
  // TODO
  useLayoutEffect(() => {
    getUpdateBars()()
  }, [isDragging, value, minMax])
  
  
  
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
      const trackStart = getTrackStart()
      const trackLen = getTrackLen()
      
      if (first) {
        setDragStartProgress(0)
        setDragProgress(0)
        setIsDragging(true)
        
        const startPx = vpx - trackStart
        const dragStartProgress = dPxToDProgress(startPx, trackLen)
        setDragStartProgress(dragStartProgress)
      }
      
      const dProgress = dPxToDProgress(dx, trackLen)
      const dragProgress = getDragProgress() + dProgress
      setDragProgress(dragProgress)
      
      const valueProgress = getDragStartProgress() + getDragProgress()
      const valueProgressClamped = progressToClampedProgress(valueProgress)
      setValueProgress(valueProgressClamped)
      
      const value = progressToValue(valueProgressClamped, minMax)
      const valueClamped = valueToClampedValue(value, minMax)
      
      setValue(valueClamped)
      if (first) getOnValueDragStart()?.(valueClamped)
      if (!first && !last) getOnValueDragging()?.(valueClamped)
      
      // TODO REMOVE
      // that functionality must be external by onValueDragStart, onValueDragging, onValueDragEnd callbacks
      //getUpdateBars()()
      
      if (last) {
        setIsDragging(false)
        getOnValueDragEnd()?.(valueClamped)
      }
    }
  ) as () => ReactDOMAttributes
  
  
  // forbid content selection for all elements while dragging
  useNoSelect(isDragging)
  
  
  // TODO rename to start, len, onDrag
  return {
    setTrackStart,
    setTrackLen,
    onTrackDrag,
  } as const
}


