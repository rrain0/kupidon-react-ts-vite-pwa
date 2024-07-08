import React, { useImperativeHandle, useRef } from 'react'
import { TypeU } from '@util/common/TypeU.ts'
import { useUpNodesScrollLock } from 'src/util/element/useUpNodesScrollLock.ts'
import PartialUndef = TypeU.PartialUndef




export type ModalCustomProps = PartialUndef<{}>
export type ForwardRefProps = React.JSX.IntrinsicElements['article']
type RefElement = HTMLDivElement

export type ModalProps = ModalCustomProps & ForwardRefProps
const Modal =
React.memo(
React.forwardRef<RefElement, ModalProps>(
(props, forwardedRef)=>{
  const { ...restProps } = props
  
  const elemRef = useRef<RefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  useUpNodesScrollLock(true, { elementRef: elemRef })
  
  return <div
    {...restProps}
    ref={elemRef}
  />
}))
export default Modal



