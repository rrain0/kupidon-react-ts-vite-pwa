import { css } from '@emotion/react'
import { animated } from '@react-spring/web'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer.tsx'
import { BottomSheetProps } from 'src/ui/widgets/BottomSheet/BottomSheetDialog.tsx'
import { BottomSheetParts } from 'src/ui/widgets/BottomSheet/BottomSheetParts.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { useUpNodesScrollLock } from 'src/util/element/useUpNodesScrollLock.ts'
import { useBottomSheet } from 'src/ui/widgets/BottomSheet/useBottomSheet.ts'
import React, { useLayoutEffect } from 'react'
import fixed = EmotionCommon.fixed






const BottomSheetDialog =
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
    
    <div /* Frame */ css={BottomSheetParts.frameStyle}
      ref={bottomSheetFrameRef as any}
    >
      <UserActionsConsumer>
        <animated.div /* Bottom Sheet */ css={BottomSheetParts.sheetStyle}
          style={sheetSpring}
          ref={bottomSheetRef as any} // Must be
        >
          
          {props.children?.({ sheetDrag })}
        
        </animated.div>
      </UserActionsConsumer>
    </div>
    
  </UserActionsConsumer>
})
export default BottomSheetDialog

