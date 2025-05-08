import { useBool } from '@util/react-state/useBool.ts'
import React, { useEffect } from 'react'
import { TypeU } from 'src/util/common/TypeU'
import Pu = TypeU.Pu
import Callback = TypeU.Callback




export type MountControllerRenderProps = {
  isOpen: boolean
  allowUnmount: Callback
}
export type MountControllerProps = Pu<{
  isOpen: boolean
  children: (props: MountControllerRenderProps) => React.ReactNode
}>



const MountController = React.memo((props: MountControllerProps) => {
  const {
    children,
    isOpen = false,
  } = props
  
  const [canUnmount, allowUnmount, preventUnmount] = useBool(false)
  useEffect(() => {
    if (isOpen) preventUnmount()
  }, [isOpen])
  
  if (isOpen || !canUnmount) return children?.({ isOpen, allowUnmount })
  return undefined
})
MountController.displayName = 'MountController'
export default MountController

