import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import PartialUndef = TypeUtils.PartialUndef




export type ModalPortalProps = PartialUndef<{
  children: React.ReactNode
}>
const ModalPortal =
React.memo(
(props: ModalPortalProps)=>{
  const modalView = useMemo(()=>document.getElementById('modal-outlet'), [])
  
  /*
  const prevFocus = useRef<HTMLElement|SVGElement|null>()
  useLayoutEffect(
    ()=>{
      prevFocus.current = document.activeElement as HTMLElement|SVGElement
    },
    []
  )
  useEffect(
    ()=>{
      findFirstFocusableElement(modalView)?.focus()
      return ()=>prevFocus.current?.focus()
    },
    []
  )
   */
  
  return <>
    {/* or maybe simply place it to the 'document.body' ... */}
    { modalView && createPortal(props.children, modalView) }
  </>
})
export default ModalPortal