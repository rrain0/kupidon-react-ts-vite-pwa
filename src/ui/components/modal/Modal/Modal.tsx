import { TypeU } from '@util/common/TypeU.ts'
import { PointerU } from '@util/pointer/PointerU.ts'
import { useOnThisClick } from '@util/pointer/useOnThisClick.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React, { useImperativeHandle, useRef } from 'react'
import { useUpNodesScrollLock } from '@util/pointer/useUpNodesScrollLock.ts'
import Pu = TypeU.Pu
import combineProps = ReactU.combineProps
import stopPointerAndMouseEvents = PointerU.stopPointerAndMouseEvents




export type ModalProps = React.ComponentPropsWithRef<'article'> & Pu<{
  disableOnThisClick: boolean
  disableStopPointerAndMouseEvents: boolean
  enableUpNodesScroll: boolean
}>


const Modal = React.memo((props: ModalProps) => {
  const {
    ref,
    disableOnThisClick,
    disableStopPointerAndMouseEvents,
    enableUpNodesScroll,
    onClick, ...restProps
  } = props
  
  const elemRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  const onThisClick = useOnThisClick()
  
  useUpNodesScrollLock(!enableUpNodesScroll, { elementRef: elemRef })
  
  return (
    <div
      ref={elemRef}
      {...combineProps(
        restProps,
        !disableOnThisClick ? onThisClick(onClick) : onClick,
        !disableStopPointerAndMouseEvents && stopPointerAndMouseEvents(),
      )}
    />
  )
})
export default Modal

