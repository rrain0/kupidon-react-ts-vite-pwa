import { useOverlay } from '@util/react/useOverlay.ts'
import React, { useCallback } from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { useBool } from '@util/react/useBool.ts'
import SetterOrUpdater = TypeUtils.SetterOrUpdater
import PartialUndef = TypeUtils.PartialUndef
import ValueOrGenerator = TypeUtils.ValueOrGenerator
import Callback = TypeUtils.Callback




export type UseOverlayRenderProps = {
  isOpen: boolean
  open: Callback
  close: Callback
}
export type UseOverlayProps = {
  overlayName: string
} & PartialUndef<{
  children: ((props: UseOverlayRenderProps)=>React.ReactNode)
}>
const UseOverlay =
React.memo(
(props: UseOverlayProps)=>{
  const {
    overlayName,
    children
  } = props
  
  const [isOpen, open, close] = useOverlay(overlayName)
  
  /* const open = useCallback(()=>{
    console.log('open')
    open_()
  },[open_]) */
  
  return children?.({
    isOpen,
    open,
    close,
  })
})
export default UseOverlay