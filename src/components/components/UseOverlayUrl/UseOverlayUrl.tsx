import React from 'react'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'

import { Cb } from '@utils/base/typeUtils.ts'
import { Pu } from '@utils/base/typeUtils.ts'




export type UseOverlayUrlRenderProps = {
  isOpen: boolean
  open: Cb
  close: () => void
  closeWithAction: (action?: Cb) => void
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
