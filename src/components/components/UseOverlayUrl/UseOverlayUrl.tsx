import React from 'react'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'

import { Callback } from '@utils/base/TypeUtils.ts'
import { Pu } from '@utils/base/TypeUtils.ts'




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
