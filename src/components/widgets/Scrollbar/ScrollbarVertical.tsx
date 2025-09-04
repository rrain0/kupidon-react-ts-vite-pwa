import styled from '@emotion/styled'
import { useDrag } from '@use-gesture/react'
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { rangeClamp, rangeMap } from '@utils/base/math/rangeUtils.ts'
import { useAsRefGet } from '@utils/react/state/useAsRefGet.ts'
import { useNoSelect } from '@utils/gestures/pointer/useNoSelect.ts'
import { getViewProps } from 'src/utils/view/ViewProps.ts'
import { ScrollbarVerticalStyle } from 'src/components/widgets/Scrollbar/ScrollbarVerticalStyle.ts'
import reset = EmotionCommon.reset
import { Pu } from '@utils/base/math/typeUtils.ts'
import { noop } from '@utils/base/math/typeUtils.ts'
import { SetterOrUpdater } from '@utils/base/math/typeUtils.ts'
import { toEmptyAttr } from '@utils/base/math/typeUtils.ts'


// TODO Доделать новый скроллбар

// make any point of bar will be dragged as current position
// useScroll from use-spring - BUT it is broken when child 'display: contents;'
// todo use @use-gesture/react and refs instead of state



export type ScrollbarVerticalExtraProps = {
  // size of visible content part 0..100
  visiblePartPercent: number
} & Pu<{
  // incoming scroll progress 0..100
  scroll: number
  // set scroll progress 0..100
  setScroll: SetterOrUpdater<number>
  // min scrollbar length in px
  //minLength: number
}>

export type ScrollbarVerticalProps =
  & React.ComponentProps<'div'>
  & ScrollbarVerticalExtraProps



const ScrollbarVertical = React.memo((props: ScrollbarVerticalProps) => {
  const {
    ref, className,
    visiblePartPercent,
    scroll = 0,
    setScroll = noop,
    //minLength = 0,
    ...restProps
  } = props
  
  
  const trackRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => trackRef.current!, [])
  const thumbBoxRef = useRef<HTMLDivElement>(null)
  
  
  /*
   useEffect(() => {
   console.log('scrollProps',scrollProps)
   },[scrollProps])
   */
  
  
  const [trackProps, setTrackProps] = useState({ height: 0 })
  const updateTrackProps = () => {
    const track = trackRef.current
    if (track) {
      const d = getViewProps(track)
      setTrackProps({
        height: d.contentHeight,
      })
    }
  }
  
  
  // Track Resize Observer
  useEffect(() => {
    updateTrackProps()
    const track = trackRef.current
    if (track) {
      const trackResizeObserver = new ResizeObserver(updateTrackProps)
      trackResizeObserver.observe(track)
      return () => trackResizeObserver.disconnect()
    }
  }, [trackRef.current])
  
  
  
  /* const [dragStart, setDragStart] = useStateAndRef(undefined as undefined | {
   vpy: number,
   }) */
  const [isDragging, setIsDragging] = useState(false)
  
  const [getVisiblePartPercent] = useAsRefGet(visiblePartPercent)
  
  const dragStartRef = useRef({ isByThumbBox: false })
  
  const onThumbBoxPointerDown = () => {
    dragStartRef.current.isByThumbBox = true
  }
  
  const onTrackDrag = useDrag(gesture => {
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
        const d = getViewProps(track)
        trackProps.vpy = d.vpYFloat
        trackProps.height = d.heightFloat
      }
    }
    
    
    const toPercent = (px: number) =>
      px / (trackProps.height * (100 - getVisiblePartPercent()) / 100) * 100
    const dyPercent = toPercent(dy)
    const yPercent = toPercent(vpy-trackProps.vpy)
    
    if (first) {
      setIsDragging(true)
      if (!dragStartRef.current.isByThumbBox) {
        setScroll(rangeClamp(yPercent, [0, 100]))
      }
    }
    if (active) {
      if (yPercent < 0) setScroll(0)
      else if (yPercent>100) setScroll(100)
      else setScroll(s => rangeClamp(s+dyPercent, [0, 100]))
    }
    if (last) {
      setIsDragging(false)
      dragStartRef.current.isByThumbBox = false
    }
  }, { })
  
  
  
  
  // forbid content selection for all elements while dragging scrollbar
  useNoSelect(isDragging)
  
  
  
  
  
  
  const scrollbarTrackProps = {
    className: clsx(className, ScrollbarVerticalStyle.El.track.name),
    [ScrollbarVerticalStyle.Attr.active.name]: toEmptyAttr(isDragging),
    ...restProps,
    ref: trackRef,
  }
  const thumbBoxProps = {
    className: ScrollbarVerticalStyle.El.thumbBox.name,
    style: {
      height: visiblePartPercent+'%',
      top: rangeMap(scroll, [0, 100], [0, 100-visiblePartPercent])+'%',
    },
    onPointerDown: onThumbBoxPointerDown,
    ref: thumbBoxRef,
  }
  const thumbProps = {
    className: ScrollbarVerticalStyle.El.thumb.name,
  }
  
  
  return (
    <ScrollbarTrack {...scrollbarTrackProps} {...onTrackDrag()}>
      <ScrollbarThumbBox {...thumbBoxProps}>
        <ScrollbarThumb {...thumbProps}/>
      </ScrollbarThumbBox>
    </ScrollbarTrack>
  )
})
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


