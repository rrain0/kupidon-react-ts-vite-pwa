import { TypeU } from '@util/common/TypeU.ts'
import { PointerU } from '@util/pointer/PointerU.ts'
import { useOnThisClick } from '@util/pointer/useOnThisClick.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React, { useImperativeHandle, useRef } from 'react'
import { useUpNodesScrollLock } from '@util/pointer/useUpNodesScrollLock.ts'
import Puro = TypeU.Puro
import combineProps = ReactU.combineProps
import stopPointerAndMouseEvents = PointerU.stopPointerAndMouseEvents




export type ModalProps = React.ComponentPropsWithoutRef<'article'> & Puro<{
  disableOnThisClick?: boolean
  disableStopPointerAndMouseEvents?: boolean
}>


const Modal = React.memo(React.forwardRef<HTMLDivElement, ModalProps>(
  (props, forwardedRef) => {
    
    const {
      disableOnThisClick,
      disableStopPointerAndMouseEvents,
      onClick, ...restProps
    } = props
    
    const elemRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(forwardedRef, () => elemRef.current!, [])
    
    const onThisClick = useOnThisClick()
    
    useUpNodesScrollLock(true, { elementRef: elemRef })
    
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
  }
))
export default Modal

