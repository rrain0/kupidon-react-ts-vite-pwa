import styled from '@emotion/styled'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types.ts'
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { RangeU } from 'src/util/common/RangeU'
import { useAsRef } from 'src/util/react-state/useAsRef.ts'
import { useNoSelect } from 'src/util/element/useNoSelect.ts'
import { getElemProps } from '@util/element/ElemProps.ts'
import { ScrollbarVerticalStyle } from 'src/ui/1-widgets/Scrollbar/ScrollbarVerticalStyle.ts'
import reset = EmotionCommon.reset
import PartialUndef = TypeU.PartialUndef
import trueOrUndef = TypeU.trueOrUndef
import noop = TypeU.noop
import SetterOrUpdater = TypeU.SetterOrUpdater



// make any point of bar will be dragged as current position
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
export type ScrollbarVerticalForwardRefProps = React.JSX.IntrinsicElements['div']
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
  
  // noinspection JSVoidFunctionReturnValueUsed
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
        if (track) {
          const d = getElemProps(track)
          trackProps.vpy = d.vpYFloat
          trackProps.height = d.heightFloat
        }
      }
      
      
      const toPercent = (px: number) =>
        px / (trackProps.height * (100-visiblePartPercentRef.current)/100) * 100
      const dyPercent = toPercent(dy)
      const yPercent = toPercent(vpy-trackProps.vpy)
      
      if (first) {
        setIsDragging(true)
        if (!dragStartRef.current.isByThumbBox){
          setScroll(RangeU.clamp(yPercent, [0, 100]))
        }
      }
      if (active) {
        if (yPercent<0) setScroll(0)
        else if (yPercent>100) setScroll(100)
        else setScroll(s => RangeU.clamp(s+dyPercent, [0,100]))
      }
      if (last) {
        setIsDragging(false)
        dragStartRef.current.isByThumbBox = false
      }
    }
  ) as ()=>ReactDOMAttributes
  
  
  
  
  // forbid content selection for all elements while dragging scrollbar
  useNoSelect(isDragging)
  
  
  
  
  
  
  const scrollbarTrackProps = {
    className: clsx(className, ScrollbarVerticalStyle.El.track.name),
    [ScrollbarVerticalStyle.Attr.active.name]: trueOrUndef(isDragging),
    ...restProps,
    ref: trackRef,
  }
  const thumbBoxProps = {
    className: ScrollbarVerticalStyle.El.thumbBox.name,
    style: {
      height: visiblePartPercent+'%',
      top: RangeU.map(scroll, [0, 100], [0, 100-visiblePartPercent])+'%',
    },
    onPointerDown: onThumbBoxPointerDown,
    ref: thumbBoxRef,
  }
  const thumbProps = {
    className: ScrollbarVerticalStyle.El.thumb.name,
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


