import React from 'react'
import { useOverlayUrl } from 'src/ui/components/action-providers/UseOverlayUrl/hook/useOverlayUrl.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Callback = TypeU.Callback
import Puro = TypeU.Puro




export type UseOverlayUrlRenderProps = {
  isOpen: boolean
  open: Callback
  close: (action?: Callback) => void
}

export type UseOverlayProps = {
  overlayName: string
} & Puro<{
  children: (props: UseOverlayUrlRenderProps) => React.ReactNode
}>

const UseOverlayUrl = React.memo((props: UseOverlayProps) => {
  const { overlayName } = props
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  return props.children?.({ isOpen, open, close })
})
export default UseOverlayUrl
