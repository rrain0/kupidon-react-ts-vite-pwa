import { animated } from '@react-spring/web'
import { ReactDOMAttributes } from '@use-gesture/react/src/types.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { PointerU } from '@util/pointer/PointerU.ts'
import { useOnThisClick } from '@util/pointer/useOnThisClick.ts'
import { ReactU } from '@util/react/ReactU.ts'
import clsx from 'clsx'
import { useUpNodesScrollLock } from '@util/pointer/useUpNodesScrollLock.ts'
import { BottomSheetS6 } from 'src/ui/1-widgets/BottomSheet/BottomSheetS6.ts'
import {
  ComputedBottomSheetDimens,
  useBottomSheet, UseBottomSheetOptions,
} from 'src/ui/1-widgets/BottomSheet/useBottomSheet.ts'
import React, {
  useLayoutEffect,
} from 'react'
import stopPointerAndMouseEvents = PointerU.stopPointerAndMouseEvents
import combineProps = ReactU.combineProps
import Callback1 = TypeU.Callback1
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle
import attrExists = TypeU.attrEmpty





export type BottomSheetChildrenProps = {
  sheetDrag: (...args: any[]) => ReactDOMAttributes
}
export type BottomSheetRefsProps = {
  bottomSheetFrameRef: React.RefObject<HTMLDivElement | null>
  bottomSheetRef: React.RefObject<HTMLDivElement | null>
  bottomSheetHeaderRef: React.RefObject<HTMLDivElement | null>
  bottomSheetContentRef: React.RefObject<HTMLDivElement | null>
}
export type BottomSheetOptionsProps = ClassStyle & UseBottomSheetOptions & Puro<{
  onComputedDimens: Callback1<ComputedBottomSheetDimens>
  onSnapPointsPx: Callback1<number[]>
  bgDim: boolean
}>
export type BottomSheetChildren = Puro<{
  children: (renderProps: BottomSheetChildrenProps) => React.ReactNode
}>
export type BottomSheetProps =
  BottomSheetRefsProps & BottomSheetOptionsProps & BottomSheetChildren




const BottomSheet = React.memo((props: BottomSheetProps) => {
  const {
    className,
    style,
    
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
    bgDim = true,
    
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
  useLayoutEffect(() => {
    onComputedDimens?.(computedSheetDimens)
  }, [computedSheetDimens])
  useLayoutEffect(() => {
    onSnapPointsPx?.(snapPointsPx)
  }, [snapPointsPx])
  
  
  useUpNodesScrollLock(
    !['closed', null].includes(sheetState),
    { elementRef: bottomSheetFrameRef }
  )
  
  const onThisClick = useOnThisClick()
  
  //useLayoutEffect(() => console.log('state',state), [state])
  
  const dataDragging = BottomSheetS6.W.els.sheetFrame.ss!.dragging.n
  
  return (
    <animated.div
      data-display-name="Bottom Sheet Frame"
      className={clsx(BottomSheetS6.W.els.sheetFrame.n, className)}
      // @ts-expect-error
      style={{
        ...bgDim && {
          background: sheetSpring.height.to(height => {
            const bgDim = function() {
              const maxDimHeight = snapPointsPx[realDefaultOpenIdx ?? 0]
              const dimHeight = Math.min(height, maxDimHeight)
              return dimHeight / maxDimHeight * 0.6
            }()
            if (!['closed', null].includes(sheetState)) return `rgba(0, 0, 0, ${bgDim})`
            return 'none'
          }),
          pointerEvents: ![null, 'closed', 'closing'].includes(sheetState) ? 'auto' : 'none',
        },
        ...style,
      }}
      ref={bottomSheetFrameRef}
      {...{ [dataDragging]: attrExists(sheetState === 'dragging') }}
      
      {...combineProps(
        // TODO Bottom Sheet - need to prevent click if dragged if frame is draggable & sheet is dragging
        //  For this need to do frame drag threshold, but not handle
        bgDim && onThisClick(() => {
          //console.log('dimmed background click: closing...')
          setSheetState('closing')
          //setSheetState('closed')
        }),
        stopPointerAndMouseEvents()
      )}
    >
      <animated.div
        data-display-name="Bottom Sheet"
        className={BottomSheetS6.W.els.sheet.n}
        // @ts-expect-error
        style={sheetSpring}
        ref={bottomSheetRef} // Must be
        {...stopPointerAndMouseEvents()}
      >
        
        {props.children?.({ sheetDrag })}
      
      </animated.div>
    </animated.div>
  )
})
export default BottomSheet
