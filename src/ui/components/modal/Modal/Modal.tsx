import React, { useImperativeHandle, useRef } from 'react'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import { useUpNodesScrollLock } from '@util/react/useUpNodesScrollLock.ts'
import PartialUndef = TypeUtils.PartialUndef




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



