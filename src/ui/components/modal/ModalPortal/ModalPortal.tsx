import { ReactU } from '@util/react/ReactU.ts'
import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import Children = ReactU.Children



const ModalPortal = React.memo(({ children }: Children) => {
  const modalView = useMemo(() => document.getElementById('modal-outlet'), [])
  
  /* or maybe simply place it to the 'document.body' ... */
  return modalView && createPortal(children, modalView)
})
ModalPortal.displayName = 'ModalPortal'
export default ModalPortal
