import { css } from '@emotion/react'
import { animated } from '@react-spring/web'
import { ReactDOMAttributes } from '@use-gesture/react/src/types'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { ReactUtils } from 'src/util/common/ReactUtils.ts'
import { useUpNodesScrollLock } from '@util/react/useUpNodesScrollLock.ts'
import {
  ComputedBottomSheetDimens,
  useBottomSheet, UseBottomSheetOptions,
} from 'src/ui/elements/BottomSheet/useBottomSheet.ts'
import React, {
  useLayoutEffect,
} from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import fixed = EmotionCommon.fixed
import PartialUndef = TypeUtils.PartialUndef
import Callback1 = TypeUtils.Callback1




export type BottomSheetChildrenProps = {
  sheetDrag: (...args: any[]) => ReactDOMAttributes
}
export type BottomSheetRefsProps = {
  bottomSheetFrameRef: React.RefObject<HTMLElement>
  bottomSheetRef: React.RefObject<HTMLElement>
  bottomSheetHeaderRef: React.RefObject<HTMLElement>
  bottomSheetContentRef: React.RefObject<HTMLElement>
}
export type BottomSheetOptionsProps = UseBottomSheetOptions
& PartialUndef<{
  onComputedDimens: Callback1<ComputedBottomSheetDimens>
  onSnapPointsPx: Callback1<number[]>
}>
export type BottomSheetChildren = PartialUndef<{
  children: (renderProps: BottomSheetChildrenProps)=>React.ReactNode
}>
export type BottomSheetProps =
  BottomSheetRefsProps & BottomSheetOptionsProps & BottomSheetChildren



const BottomSheet =
React.memo(
(props: BottomSheetProps) => {
  const {
    sheetState,
    setSheetState,
    snapIdx,
    setSnapIdx,
    snapPoints,
    animationDuration,
    closeable,
    defaultOpenIdx,
    
    onComputedDimens,
    onSnapPointsPx,
    
    bottomSheetFrameRef,
    bottomSheetRef,
    bottomSheetHeaderRef,
    bottomSheetContentRef,
  } = props
  
  
  
  
  
  const {
    computedSheetDimens,
    snapPointsPx,
    realDefaultOpenIdx,
    sheetSpring,
    sheetDrag
  } = useBottomSheet(
    bottomSheetFrameRef,
    bottomSheetRef,
    bottomSheetHeaderRef,
    bottomSheetContentRef,
    {
      sheetState,
      setSheetState,
      snapIdx,
      setSnapIdx,
      snapPoints,
      animationDuration,
      closeable,
      defaultOpenIdx,
    }
  )
  useLayoutEffect(
    ()=>onComputedDimens?.(computedSheetDimens),
    [computedSheetDimens]
  )
  useLayoutEffect(
    ()=>onSnapPointsPx?.(snapPointsPx),
    [snapPointsPx]
  )
  
  
  useUpNodesScrollLock(
    !['closed',null].includes(sheetState),
    { elementRef: bottomSheetFrameRef }
  )
  
  
  //useLayoutEffect(()=>console.log('state',state),[state])
  
  
  
  return <UserActionsConsumer>
    
    <animated.div /* Frame */ css={frameStyle}
      style={{
        background: sheetSpring.height.to(
          height=>{
            const bgcDimHex = function(){
              const maxDimHeight = snapPointsPx[realDefaultOpenIdx??0]
              const dimHeight = Math.min(height, maxDimHeight)
              return Math.trunc(dimHeight / maxDimHeight * 256 * 0.6)
                .toString(16).padStart(2,'0')
            }()
            if (!['closed',null].includes(sheetState)) return `#000000${bgcDimHex}`
            return 'none'
          }
        ),
        pointerEvents: ![null,'closed','closing'].includes(sheetState) ? 'auto' : 'none',
      }}
      
      ref={bottomSheetFrameRef as any}
      
      // need to prevent click if dragged if frame is draggable
      onClick={()=>{
        //console.log('dimmed background click: closing...')
        setSheetState('closing')
        //setSheetState('closed')
      }}
    >
      <UserActionsConsumer>
        <animated.div /* Bottom Sheet */ css={sheetStyle}
          style={sheetSpring}
          ref={bottomSheetRef as any} // Must be
        >
          
          {props.children?.({ sheetDrag })}
        
        </animated.div>
      </UserActionsConsumer>
    </animated.div>
    
  </UserActionsConsumer>
})
export default BottomSheet



const frameStyle = css`
  ${fixed};
  z-index: 30;
  background: none;
  pointer-events: none;
  //touch-action: none;
  display: grid;
  place-items: end center;
`
const sheetStyle = css`
  display: grid;
  grid-template-rows: auto 1fr;
  justify-items: stretch;
  width: 100%;
  //overflow: hidden;
  pointer-events: auto;

  max-height: 100%; // Must be
`