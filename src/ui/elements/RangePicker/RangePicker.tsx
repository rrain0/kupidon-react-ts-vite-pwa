import { css } from '@emotion/react'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types.ts'
import { MathUtils } from '@util/common/MathUtils.ts'
import { getElemProps } from '@util/element/ElemProps.ts'
import { useNoSelect } from '@util/react/useNoSelect.ts'
import { useRef2 } from '@util/react/useRef2.ts'
import clsx from 'clsx'
import React, { useImperativeHandle, useRef, useState } from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils'
import { AppTheme } from '@util/theme/AppTheme.ts'
import PartialUndef = TypeUtils.PartialUndef
import Setter = TypeUtils.Setter
import fitRange = MathUtils.fitRange
import mapRange = MathUtils.mapRange
import Mapper = TypeUtils.Mapper
import SetterOrUpdater = TypeUtils.SetterOrUpdater




const tipWidth = 27



export type RangePickerCustomProps = {
  minMax: [number, number]
  range: [number, number]
  setRange: SetterOrUpdater<[number, number]>
} & PartialUndef<{
  displayedRange: Mapper<[number, number]> // можно сделать ступенчатый прогресс
}>
export type RangePickerForwardRefProps = React.JSX.IntrinsicElements['div']
//export type RangePickerForwardRefProps = Omit<React.JSX.IntrinsicElements['div'], 'children'>
export type RangePickerRefElement = HTMLDivElement
export type RangePickerProps = RangePickerCustomProps & RangePickerForwardRefProps



const RangePicker =
React.memo(
React.forwardRef<RangePickerRefElement, RangePickerProps>(
(props, forwardedRef)=>{
  const {
    minMax,
    range,
    setRange,
    displayedRange,
    className,
    ...restProps
  } = props
  
  
  const trackRef = useRef<RangePickerRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>trackRef.current!,[])
  
  const getTrackDimens = ()=>{
    const trackProps = {
      vpx: 0,
      width: 0,
    }
    const track = trackRef.current
    if (track){
      const d = getElemProps(track)
      trackProps.vpx = d.vpXFloat
      trackProps.width = d.widthFloat
    }
    return trackProps
  }
  
  
  const [isDragging, setIsDragging] = useState(false)
  const [getActiveTip, setActiveTip] = useRef2(null as 'left' | 'right' | null)
  const [getInitialPercent, setInitialPercent] = useRef2(0)
  const [getPrevPercent, setPrevPercent] = useRef2(0)
  
  // noinspection JSVoidFunctionReturnValueUsed
  const onTrackDrag = useDrag(
    gesture=>{
      const {
        first, active, last,
        xy: [vpx, vpy],
        movement: [mx, my],
        delta: [dx, dy],
      } = gesture
      
      const trackDimens = getTrackDimens()
      
      const toDPercent = (dPx: number) =>
        100 * dPx / (-1/2*tipWidth + trackDimens.width - 3/2*tipWidth)
      const dPercent = toDPercent(dx)
      
      if (first){
        setIsDragging(true)
        const leftPercent = toDPercent(vpx - (trackDimens.vpx + 1/2*tipWidth))
        const rightPercent = toDPercent(vpx - (trackDimens.vpx + 3/2*tipWidth))
        if (leftPercent < (range[0] + range[1])/2) setActiveTip('left')
        else setActiveTip('right')
        
        // todo определить левый или правый в зависимости от реальных пикселей на экране (не прогресса, а пикселей)
        if (getActiveTip()==='left') {
          setRange(s=>([leftPercent, s[1]]))
          setInitialPercent(leftPercent)
          setPrevPercent(leftPercent)
        }
        if (getActiveTip()==='right') {
          setRange(s=>([s[0], rightPercent]))
          setInitialPercent(rightPercent)
          setPrevPercent(rightPercent)
        }
      }
      if (active){
        /*
         todo
          1) произошёл сдвиг виджета по оси x - пофиг, работаем так, как будто его не двигали
          2) произошло расширение / сужение виджета - учитываем это
          3) снаружи изменили рэндж - учитываем это
          4) сделать невозможным установить неправильный range
          5) отображение неправильного рэнджа как правильного (left в приоритете)
        */
        if (getActiveTip()==='left') {
          setRange(s=>([s[0]+dPercent, s[1]]))
          
        }
        if (getActiveTip()==='right') {
          setRange(s=>([s[0], s[1]+dPercent]))
          
        }
      }
      if (last){
        setIsDragging(false)
        setActiveTip(null)
      }
    }
  ) as ()=>ReactDOMAttributes
  
  
  
  
  
  
  
  // forbid content selection for all elements while dragging scrollbar
  useNoSelect(isDragging)
  
  
  
  const trackProps = {
    className: clsx(className, /* ScrollbarVerticalStyle.El.track.name */),
    /* [ScrollbarVerticalStyle.Attr.active.name]: trueOrUndef(isDragging), */
    ...restProps,
    ref: trackRef,
  }
  const trackW = getTrackDimens().width
  const progressLeft = fitRange(range[0], [0, 100])
  const progressRight = fitRange(range[1], [progressLeft, 100])
  const barProps = {
    style: {
      left: `${mapRange(progressLeft, [0, 100],
        [0, 100 * (trackW - 2*tipWidth) / trackW ]
      )}%`,
      right: `${100 - mapRange(progressRight, [0, 100],
        [100 * 2*tipWidth / trackW, 100]
      )}%`,
    }
  }
  
  
  return <div css={trackStyle}
    {...trackProps}
    {...onTrackDrag()}
    ref={trackRef}
  >
    <div css={bar}
      {...barProps}
    >
      <div css={leftHandle}/>
      <div css={rightHandle}/>
    </div>
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