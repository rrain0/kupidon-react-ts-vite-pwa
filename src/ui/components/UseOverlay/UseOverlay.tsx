import React from 'react'
import { useOverlay } from 'src/ui/components/UseOverlay/useOverlay.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import Callback = TypeUtils.Callback
import PartialUndef = TypeUtils.PartialUndef




export type UseOverlayRenderProps = {
  isOpen: boolean
  open: Callback
  close: Callback
}

export type UseOverlayProps = {
  overlayName: string
} & PartialUndef<{
  children: (props: UseOverlayRenderProps)=>React.ReactNode
}>

const UseOverlay =
React.memo(
(props: UseOverlayProps)=>{
  const { overlayName } = props
  
  const { isOpen, open, close } = useOverlay(overlayName)
  
  return props.children?.({ isOpen, open, close })
})
export default UseOverlay