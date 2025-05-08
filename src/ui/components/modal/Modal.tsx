import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import { PointerU } from '@util/pointer/PointerU.ts'
import { useClick } from '@util/pointer/useClick.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React, { useImperativeHandle, useRef } from 'react'
import { useUpNodesScrollLock } from '@util/pointer/useUpNodesScrollLock.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import ModalPortal from 'src/ui/components/modal/ModalPortal.tsx'
import Pu = TypeU.Pu
import combineProps = ReactU.combineProps
import stopPointerAndMouseEvents = PointerU.stopPointerAndMouseEvents
import fixedBottom = EmotionCommon.fixedBottom
import modalFloor1k = StyleVals.modalFloor1k
import noThisPointer = EmotionCommon.noThisPointer




export type ModalProps = React.ComponentPropsWithRef<'article'> & Pu<{
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
          noPointer && noThisPointer,
        ]}
        {...combineProps(
          restProps,
          getOnClick(onClick),
          !disableStopPointerAndMouseEvents && stopPointerAndMouseEvents(),
        )}
      />
    </Portal>
  )
})
Modal.displayName = 'Modal'
export default Modal



const ModalElem = styled.div([
  fixedBottom, {
    height: '100dvh',
    zIndex: modalFloor1k,
    backgroundColor: '#0000009a',
  },
])

