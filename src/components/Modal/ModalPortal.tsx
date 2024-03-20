import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useRecoilValue } from 'recoil'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef




export type ModalPortalProps = PartialUndef<{
  children: React.ReactNode
}>
const ModalPortal =
React.memo(
(props: ModalPortalProps)=>{
  const modalId = useRecoilValue(AppRecoil).modalOutletId
  const modalView = useMemo(
    ()=>modalId ? document.getElementById(modalId) : undefined,
    [modalId]
  )
  
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