/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useImperativeHandle, useRef } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useUpNodesScrollLock } from 'src/utils/react/useUpNodesScrollLock'
import PartialUndef = TypeUtils.PartialUndef




export type ModalCustomProps = PartialUndef<{}>
export type ForwardRefProps = JSX.IntrinsicElements['article']
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



