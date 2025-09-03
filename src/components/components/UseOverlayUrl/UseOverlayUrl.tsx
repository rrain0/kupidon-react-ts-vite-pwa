import React from 'react'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import Callback = TypeU.Callback
import Pu = TypeU.Pu




export type UseOverlayUrlRenderProps = {
  isOpen: boolean
  open: Callback
  close: () => void
  closeWithAction: (action?: Callback) => void
}

export type UseOverlayProps = {
  overlayName: string
} & Pu<{
  children: (props: UseOverlayUrlRenderProps) => React.ReactNode
}>

const UseOverlayUrl = React.memo((props: UseOverlayProps) => {
  const { overlayName } = props
  
  const { isOpen, open, close, closeWithAction } = useOverlayUrl(overlayName)
  
  return props.children?.({ isOpen, open, close, closeWithAction })
})
export default UseOverlayUrl
