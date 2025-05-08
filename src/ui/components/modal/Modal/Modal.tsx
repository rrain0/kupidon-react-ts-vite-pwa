import { TypeU } from '@util/common/TypeU.ts'
import { PointerU } from '@util/pointer/PointerU.ts'
import { useOnThisClick } from '@util/pointer/useOnThisClick.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React, { useImperativeHandle, useRef } from 'react'
import { useUpNodesScrollLock } from '@util/pointer/useUpNodesScrollLock.ts'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import Pu = TypeU.Pu
import combineProps = ReactU.combineProps
import stopPointerAndMouseEvents = PointerU.stopPointerAndMouseEvents




export type ModalProps = React.ComponentPropsWithRef<'article'> & Pu<{
  disableOnThisClick: boolean
  disableStopPointerAndMouseEvents: boolean
  disableUpNodesScroll: boolean
  noPortal: boolean
}>


const Modal = React.memo((props: ModalProps) => {
  const {
    ref,
    disableOnThisClick,
    disableStopPointerAndMouseEvents,
    disableUpNodesScroll,
    noPortal,
    onClick,
    ...restProps
  } = props
  
  const elemRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  const onThisClick = useOnThisClick()
  
  useUpNodesScrollLock(!disableUpNodesScroll, { elementRef: elemRef })
  
  const Portal = noPortal ? React.Fragment : ModalPortal
  return (
    <Portal>
      <div
        ref={elemRef}
        data-display-name='Modal'
        {...combineProps(
          restProps,
          !disableOnThisClick ? onThisClick(onClick) : onClick,
          !disableStopPointerAndMouseEvents && stopPointerAndMouseEvents(),
        )}
      />
    </Portal>
  )
})
Modal.displayName = 'Modal'
export default Modal

