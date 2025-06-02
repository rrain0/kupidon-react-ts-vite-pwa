import { useBool } from '@util/react-state/useBool.ts'
import React, { useEffect } from 'react'
import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu
import Callback = TypeU.Callback




export type MountControllerProps = Pu<{
  isOpen: boolean
  children: (props: MountControllerRenderProps) => React.ReactNode
}>
export type MountControllerRenderProps = {
  isOpen: boolean
  allowUnmount: Callback
}



const MountController = React.memo((props: MountControllerProps) => {
  const {
    children,
    isOpen = false,
  } = props
  
  const [canUnmount, allowUnmount, preventUnmount] = useBool(!isOpen)
  useEffect(() => { if (isOpen) preventUnmount() }, [isOpen])
  
  if (isOpen || !canUnmount) return children?.({
    isOpen,
    allowUnmount, // stable
  })
  return undefined
})
MountController.displayName = 'MountController'
export default MountController

