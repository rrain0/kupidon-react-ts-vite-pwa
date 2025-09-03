import styled from '@emotion/styled'

import { PointerU } from '@utils/gestures/pointer/PointerU.ts'
import { useClick } from '@utils/gestures/pointer/useClick.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import React, { useImperativeHandle, useRef } from 'react'
import { useUpNodesScrollLock } from '@utils/gestures/pointer/useUpNodesScrollLock.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import ModalPortal from 'src/components/components/modal/ModalPortal.tsx'
import { Pu } from '@utils/base/TypeUtils.ts'
import combineProps = ReactU.combineProps
import stopPointerAndMouseEvents = PointerU.stopPointerAndMouseEvents
import fixedBottom = EmotionCommon.fixedBottom
import modalFloor1k = StyleVals.modalFloor1k




export type ModalProps = React.ComponentProps<'article'> & Pu<{
  noPortal: boolean
  disableOnThisClick: boolean
  disableStopPointerAndMouseEvents: boolean
  onlyFrame: boolean
  disableUpNodesScroll: boolean
  noDim: boolean
  noPointer: boolean
}>


const Modal = React.memo((props: ModalProps) => {
  const {
    ref,
    noPortal,
    disableOnThisClick,
    disableStopPointerAndMouseEvents,
    onlyFrame,
    disableUpNodesScroll = onlyFrame,
    noDim = onlyFrame,
    noPointer = onlyFrame,
    onClick,
    children,
    ...restProps
  } = props
  
  const elemRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  const getOnClick = useClick({ onlyThisElemClick: !disableOnThisClick })
  
  useUpNodesScrollLock(!disableUpNodesScroll, { elementRef: elemRef })
  
  const Portal = noPortal ? React.Fragment : ModalPortal
  return (
    <Portal>
      <ModalElem
        ref={elemRef}
        data-display-name='Modal'
        css={[
          noDim && { backgroundColor: 'transparent' },
          noPointer && EmotionCommon.noPointer,
        ]}
        {...combineProps(
          restProps,
          getOnClick(onClick),
          !disableStopPointerAndMouseEvents && stopPointerAndMouseEvents(),
        )}
      >
        {children}
      </ModalElem>
    </Portal>
  )
})
Modal.displayName = 'Modal'
export default Modal



const ModalElem = styled.div([
  fixedBottom, {
    height: '100dvh',
    zIndex: modalFloor1k,
    // TODO Theme
    backgroundColor: '#0000009a',
  },
])

