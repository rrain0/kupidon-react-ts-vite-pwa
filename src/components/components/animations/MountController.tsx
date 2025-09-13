import { useAsCallback } from '@utils/state/react/base/useAsCallback.ts'
import { useBool } from '@utils/state/react/base/useBool.ts'
import React, { useEffect } from 'react'

import { Pu } from '@utils/base/typeUtils.ts'
import { Cb } from '@utils/base/typeUtils.ts'




export type MountControllerProps = Pu<{
  isOpen: boolean
  children: (props: MountControllerRenderProps) => React.ReactNode
}>
export type MountControllerRenderProps = {
  isOpen: boolean
  allowUnmount: Cb
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

