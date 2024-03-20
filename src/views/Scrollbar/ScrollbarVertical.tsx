/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types'
import React, {
  useCallback, useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import classNames from "classnames"
import { useFakePointerRef } from 'src/components/ActionProviders/UseFakePointerRef'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useAsRef } from 'src/utils/react/useAsRef'
import { useNoSelect } from 'src/utils/react/useNoSelect'
import { getElemProps } from 'src/utils/common/ElemProps'
import { MathUtils } from 'src/utils/common/NumberUtils'
import { useStateAndRef } from 'src/utils/react/useStateAndRef'
import { ScrollbarVerticalStyle } from 'src/views/Scrollbar/ScrollbarVerticalStyle'
import inRange = MathUtils.inRange0
import fitRange = MathUtils.fitRange0
import reset = EmotionCommon.reset
import PartialUndef = TypeUtils.PartialUndef
import trueOrUndef = TypeUtils.trueOrUndef
import mapRange = MathUtils.mapRange
import noop = TypeUtils.noop
import SetterOrUpdater = TypeUtils.SetterOrUpdater
import fitRange2 = MathUtils.fitRange
import contents = EmotionCommon.contents
import inRange2 = MathUtils.inRange



// useScroll from use-spring - BUT it is broken when child 'display: contents;'
// todo use @use-gesture/react and refs instead of state





export type ScrollbarVerticalCustomProps = {
  // size of visible content part 0..100
  visiblePartPercent: number
} & PartialUndef<{
  // incoming scroll progress 0..100
  scroll: number
  // set scroll progress 0..100
  setScroll: SetterOrUpdater<number>
  // min scrollbar length in px
  //minLength: number
}>
export type ScrollbarVerticalForwardRefProps = JSX.IntrinsicElements['div']
export type ScrollbarVerticalRefElement = HTMLDivElement

export type ScrollbarVerticalProps = ScrollbarVerticalCustomProps & ScrollbarVerticalForwardRefProps



const ScrollbarVertical =
React.memo(
React.forwardRef<ScrollbarVerticalRefElement, ScrollbarVerticalProps>(
(props, forwardedRef) => {
  const {
    visiblePartPercent,
    scroll = 0,
    setScroll = noop,
    //minLength = 0,
    className,
    ...restProps
  } = props
  
  
  const trackRef = useRef<ScrollbarVerticalRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>trackRef.current!, [])
  const thumbBoxRef = useRef<HTMLDivElement>(null)
  useFakePointerRef(trackRef,thumbBoxRef)
  
  
  /*
  useEffect(()=>{
    console.log('scrollProps',scrollProps)
  },[scrollProps])
  */
  
  
  const [trackProps, setTrackProps] = useState({ height: 0 })
  const updateTrackProps = ()=>{
    const track = trackRef.current
    if (track){
      const d = getElemProps(track)
      setTrackProps({
        height: d.contentHeight,
      })
    }
  }
  
  
  // Track Resize Observer
  useEffect(
    ()=>{
      updateTrackProps()
      const track = trackRef.current
      if (track){
        const trackResizeObserver = new ResizeObserver(updateTrackProps)
        trackResizeObserver.observe(track)
        return ()=>trackResizeObserver.disconnect()
      }
    },
    [trackRef.current]
  )
  
  
  
  /* const [dragStart, setDragStart] = useStateAndRef(undefined as undefined | {
    vpy: number,
  }) */
  const [isDragging, setIsDragging] = useState(false)
  
  const visiblePartPercentRef = useAsRef(visiblePartPercent)
  
  const dragStartRef = useRef({ isByThumbBox: false })
  
  const onThumbBoxPointerDown = ()=>{
    dragStartRef.current.isByThumbBox = true
  }
  
  const onTrackDrag = useDrag(
    gesture=>{
      const {
        first, active, last,
        xy: [ , vpy],
        movement: [ , my],
        delta: [ , dy],
      } = gesture
      
      const trackProps = {
        vpy: 0,
        height: 0,
      }
      {
        const track = trackRef.current
        if (track){
          const d = getElemProps(track)
          trackProps.vpy = d.vpYFloat
          trackProps.height = d.heightFloat
        }
      }
      
      
      const toPercent = (px: number) =>
        px / (trackProps.height * (100-visiblePartPercentRef.current)/100) * 100
      const dyPercent = toPercent(dy)
      const yPercent = toPercent(vpy-trackProps.vpy)
      
      if (first){
        setIsDragging(true)
        if (!dragStartRef.current.isByThumbBox){
          setScroll(fitRange2(yPercent, [0,100]))
        }
      }
      if (active){
        if (yPercent<0) setScroll(0)
        else if (yPercent>100) setScroll(100)
        else setScroll(s=>fitRange2(s+dyPercent, [0,100]))
      }
      if (last){
        setIsDragging(false)
        dragStartRef.current.isByThumbBox = false
      }
    }
  ) as ()=>ReactDOMAttributes
  
  
  
  
  
  // forbid content selection for all elements while dragging scrollbar
  useNoSelect(isDragging)
  
  
  
  
  
  
  const scrollbarTrackProps = {
    className: classNames(className, ScrollbarVerticalStyle.El.track.name),
    [ScrollbarVerticalStyle.Attr.active.name]: trueOrUndef(isDragging),
    ...restProps,
    ref: trackRef,
  }
  const thumbBoxProps = {
    className: ScrollbarVerticalStyle.El.thumbBox.name,
    style: {
      height: visiblePartPercent+'%',
      top: mapRange(scroll, [0,100], [0, 100-visiblePartPercent])+'%',
    },
    onPointerDown: onThumbBoxPointerDown,
    ref: thumbBoxRef,
  }
  const thumbProps = {
    className: ScrollbarVerticalStyle.El.thumb.name
  }
  
  
  return <ScrollbarTrack {...scrollbarTrackProps} {...onTrackDrag()}>
      <ScrollbarThumbBox {...thumbBoxProps}>
        <ScrollbarThumb {...thumbProps}/>
      </ScrollbarThumbBox>
    </ScrollbarTrack>
}))
export default ScrollbarVertical



const ScrollbarTrack = styled.div`
  ${reset};
  position: relative;
  touch-action: none; // prevents browser gesture handling on mobile devices
  width: 10px; height: 100%;
  background: rgba(248,248,248,0.35);
  border-radius: 999999px;
`



const ScrollbarThumbBox = styled.div`
  position: absolute;
  touch-action: none; // prevents browser gesture handling on mobile devices
  //will-change: top, height;
  left: 0; right: 0;
  height: 0; top: 0;
`




const ScrollbarThumb = styled.div`
  touch-action: none; // prevents browser gesture handling on mobile devices
  width: 100%; height: 100%;
  //pointer-events: none;

  background: rgba(248,248,248,0.5);
  border-radius: 999999px;
`


