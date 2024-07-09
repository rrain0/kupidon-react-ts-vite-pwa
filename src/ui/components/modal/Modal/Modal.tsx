import React, { useImperativeHandle, useRef } from 'react'
import { useUpNodesScrollLock } from 'src/util/element/useUpNodesScrollLock.ts'




export type ModalProps = React.ComponentPropsWithoutRef<'article'>


const Modal = React.memo(
  React.forwardRef<HTMLDivElement, ModalProps>(
    (props, forwardedRef) => {
      
      const { ...restProps } = props
      
      const elemRef = useRef<HTMLDivElement>(null)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      
      useUpNodesScrollLock(true, { elementRef: elemRef })
      
      return <div
        {...restProps}
        ref={elemRef}
      />
    }
  )
)
export default Modal

