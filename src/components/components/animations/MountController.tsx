import { useAsCallback } from '@utils/react/state/useAsCallback.ts'
import { useBool } from '@utils/react/state/useBool.ts'
import React, { useEffect } from 'react'

import { Pu } from '@utils/base/math/typeUtils.ts'
import { Callback } from '@utils/base/math/typeUtils.ts'




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

