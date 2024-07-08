import React from 'react'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Callback = TypeU.Callback
import PartialUndef = TypeU.PartialUndef




export type UseOverlayUrlRenderProps = {
  isOpen: boolean
  open: Callback
  close: Callback
}

export type UseOverlayProps = {
  overlayName: string
} & PartialUndef<{
  children: (props: UseOverlayUrlRenderProps)=>React.ReactNode
}>

const UseOverlayUrl =
React.memo(
(props: UseOverlayProps)=>{
  const { overlayName } = props
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  return props.children?.({ isOpen, open, close })
})
export default UseOverlayUrl