import React, { PropsWithChildren, useMemo } from 'react'
import { createPortal } from 'react-dom'



const ModalPortal = React.memo(
  (props: PropsWithChildren) => {
    const modalView = useMemo(() => document.getElementById('modal-outlet'), [])
    
    return <>
      {/* or maybe simply place it to the 'document.body' ... */}
      { modalView && createPortal(props.children, modalView) }
    </>
  }
)
export default ModalPortal
