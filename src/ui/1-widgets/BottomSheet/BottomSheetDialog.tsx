import { animated } from '@react-spring/web'
import { ReactDOMAttributes } from '@use-gesture/react/src/types.ts'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer.tsx'
import { BottomSheetParts } from 'src/ui/1-widgets/BottomSheet/BottomSheetParts.ts'
import { useUpNodesScrollLock } from 'src/util/element/useUpNodesScrollLock.ts'
import {
  ComputedBottomSheetDimens,
  useBottomSheet, UseBottomSheetOptions,
} from 'src/ui/1-widgets/BottomSheet/useBottomSheet.ts'
import React, {
  useLayoutEffect,
} from 'react'
import { TypeU } from '@util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import Callback1 = TypeU.Callback1




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



const BottomSheetDialog = React.memo(
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
      sheetDrag,
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
      () => onComputedDimens?.(computedSheetDimens),
      [computedSheetDimens]
    )
    useLayoutEffect(
      () => onSnapPointsPx?.(snapPointsPx),
      [snapPointsPx]
    )
    
    
    useUpNodesScrollLock(
      !['closed', null].includes(sheetState),
      { elementRef: bottomSheetFrameRef }
    )
    
    
    //useLayoutEffect(()=>console.log('state',state),[state])
    
    
    
    return <UserActionsConsumer>
      
      <animated.div /* Frame */ css={BottomSheetParts.frameStyle}
        style={{
          // @ts-expect-error
          background: sheetSpring.height.to(
            height => {
              const bgDimHex = function() {
                const maxDimHeight = snapPointsPx[realDefaultOpenIdx??0]
                const dimHeight = Math.min(height, maxDimHeight)
                return Math.trunc(dimHeight / maxDimHeight * 256 * 0.6)
                  .toString(16).padStart(2, '0')
              }()
              if (!['closed', null].includes(sheetState)) return `#000000${bgDimHex}`
              return 'none'
            }
          ),
          pointerEvents: ![null, 'closed', 'closing'].includes(sheetState) ? 'auto' : 'none',
        }}
        
        ref={bottomSheetFrameRef as any}
        
        // need to prevent click if dragged if frame is draggable
        onClick={() => {
          //console.log('dimmed background click: closing...')
          setSheetState('closing')
          //setSheetState('closed')
        }}
      >
        <UserActionsConsumer>
          <animated.div /* Bottom Sheet */ css={BottomSheetParts.sheetStyle}
            // @ts-expect-error
            style={sheetSpring}
            ref={bottomSheetRef as any} // Must be
          >
            
            {props.children?.({ sheetDrag })}
          
          </animated.div>
        </UserActionsConsumer>
      </animated.div>
      
    </UserActionsConsumer>
  }
)
export default BottomSheetDialog
