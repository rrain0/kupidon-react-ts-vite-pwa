import { animated } from '@react-spring/web'
import { ReactDOMAttributes } from '@use-gesture/react/src/types.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import { useClick } from '@utils/pointer/useClick.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import clsx from 'clsx'
import { useUpNodesScrollLock } from '@utils/pointer/useUpNodesScrollLock.ts'
import { BottomSheetS6 } from 'src/components/widgets/BottomSheet/BottomSheetS6.ts'
import {
  ComputedBottomSheetDimens,
  useBottomSheet, UseBottomSheetOptions,
} from 'src/components/widgets/BottomSheet/useBottomSheet.ts'
import React, {
  useLayoutEffect,
} from 'react'
import combineProps = ReactU.combineProps
import Callback1 = TypeU.Callback1
import Pu = TypeU.Pu
import ClassStyle = ReactU.ClassStyle
import toEmptyAttr = TypeU.toEmptyAttr





export type BottomSheetChildrenProps = {
  sheetDrag: (...args: any[]) => ReactDOMAttributes
}
export type BottomSheetRefsProps = {
  bottomSheetFrameRef: React.RefObject<HTMLDivElement | null>
  bottomSheetRef: React.RefObject<HTMLDivElement | null>
  bottomSheetHeaderRef: React.RefObject<HTMLDivElement | null>
  bottomSheetContentRef: React.RefObject<HTMLDivElement | null>
}
export type BottomSheetOptionsProps = ClassStyle & UseBottomSheetOptions & Pu<{
  onComputedDimens: Callback1<ComputedBottomSheetDimens>
  onSnapPointsPx: Callback1<number[]>
  bgDim: boolean
}>
export type BottomSheetChildren = Pu<{
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
  
  
  const visible = sheetState !== 'closed' && sheetState !== null
  const visibleAndNotClosing = visible && sheetState !== 'closing'
  
  useUpNodesScrollLock(visible, { elementRef: bottomSheetFrameRef })
  
  const getOnClick = useClick({ onlyThisElemClick: true })
  
  const dataDragging = BottomSheetS6.W.els.sheetFrame.ss!.dragging.n
  
  return (
    <animated.div
      data-display-name='Bottom Sheet Frame'
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
            if (visible) return `rgba(0, 0, 0, ${bgDim})`
            return 'none'
          }),
          pointerEvents: visibleAndNotClosing ? 'auto' : 'none',
        },
        ...style,
      }}
      ref={bottomSheetFrameRef}
      {...{ [dataDragging]: toEmptyAttr(sheetState === 'dragging') }}
      
      {...combineProps(
        // TODO Bottom Sheet - need to prevent click if dragged if frame is draggable & sheet is dragging
        //  For this need to do frame drag threshold, but not handle
        bgDim && getOnClick(() => {
          //console.log('dimmed background click: closing...')
          setSheetState('closing')
          //setSheetState('closed')
        }),
      )}
    >
      <animated.div
        data-display-name='Bottom Sheet'
        className={BottomSheetS6.W.els.sheet.n}
        // @ts-expect-error
        style={sheetSpring}
        ref={bottomSheetRef} // Must be
      >
        
        {props.children?.({ sheetDrag })}
      
      </animated.div>
    </animated.div>
  )
})
export default BottomSheet
