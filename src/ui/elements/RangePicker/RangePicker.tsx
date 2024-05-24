import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types.ts'
import { MathUtils } from '@util/common/MathUtils.ts'
import { getElemProps } from '@util/element/ElemProps.ts'
import { useNoSelect } from '@util/react/useNoSelect.ts'
import clsx from 'clsx'
import React, { useImperativeHandle, useRef, useState } from 'react'
import { ScrollbarVerticalStyle } from 'src/ui/elements/Scrollbar/ScrollbarVerticalStyle.ts'
import { TypeUtils } from 'src/util/common/TypeUtils'
import { AppTheme } from '@util/theme/AppTheme.ts'
import PartialUndef = TypeUtils.PartialUndef
import Theme = AppTheme.Theme
import noop = TypeUtils.noop
import Setter = TypeUtils.Setter
import fitRange = MathUtils.fitRange





export type RangePickerCustomProps = PartialUndef<{
  minMax: [number, number]
  range: [number, number]
  setRange: Setter<[number, number]>
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
    /* minMax = [0, 100],
    range = [0, 50],
    setRange = noop, */
    className,
    ...restProps
  } = props
  
  
  const trackRef = useRef<RangePickerRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>trackRef.current!,[])
  
  const [progress, setProgress] = useState<[number, number]>([0, 30])
  
  const [isDragging, setIsDragging] = useState(false)
  
  const dragStartRef = useRef({ tip: null as null | 'left' | 'right' })
  
  const onTrackDrag = useDrag(
    gesture=>{
      const {
        first, active, last,
        xy: [ vpx, vpy],
        movement: [ mx, my],
        delta: [ dx, dy],
      } = gesture
      
      const trackProps = {
        vpx: 0,
        width: 0,
      }
      {
        const track = trackRef.current
        if (track){
          const d = getElemProps(track)
          trackProps.vpx = d.vpXFloat + 20
          trackProps.width = d.widthFloat - 20*2
        }
      }
      
      
      const toPercent = (px: number) => 100 * px / trackProps.width
      const dxPercent = toPercent(dx)
      const xPercent = toPercent(vpx-trackProps.vpx)
      
      if (first){
        setIsDragging(true)
        setProgress([0, fitRange(xPercent, [0,100])])
        /* if (!dragStartRef.current.isByThumbBox){
          setProgress([0, fitRange(xPercent, [0,100])])
        } */
      }
      if (active){
        if (xPercent<0) setProgress([0, 0])
        else if (xPercent>100) setProgress([0, 100])
        else setProgress( s=>([0, fitRange(s[1] + dxPercent, [0,100])]))
      }
      if (last){
        setIsDragging(false)
        //dragStartRef.current.isByThumbBox = false
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
  
  
  return <div css={trackStyle}
    {...trackProps}
    {...onTrackDrag()}
    ref={trackRef}
  >
    <div css={bar}
      style={{ width: `${progress[1]}%` }}
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
  border: 2px solid ${t.containerAccent.bgc2[0]};
  border: none;
  background: ${t.containerNormal.contentAccent2[0]};
`

const bar = (t: AppTheme.Theme) => css`
  position: absolute;
  height: 100%;
  background: ${t.containerAccent.bgc2[0]};
  border-radius: inherit;
  
  left: 0%;
  width: 30%;
  
  display: grid;
  grid: 'lHandle . rHandle' 100% / auto 1fr auto;
  padding: 5px;
`
const leftHandle = (t: AppTheme.Theme) => css`
  grid-area: lHandle;
  height: 32px;
  width: 19px;
  border-radius: 16px 3px 3px 16px;
  background: ${t.containerAccent.content2[0]};
`
const rightHandle = (t: AppTheme.Theme) => css`
  grid-area: rHandle;
  height: 32px;
  width: 19px;
  border-radius: 3px 16px 16px 3px;
  background: ${t.containerAccent.content2[0]};
`