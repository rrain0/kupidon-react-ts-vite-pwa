import { useAsCallback } from '@utils/state/react/base/useAsCallback.ts'
import { useBool0 } from '@utils/state/react/useBool0.ts'
import React, { useEffect } from 'react'

import { Pu } from '@utils/base/tsUtils.ts'
import { Cb } from '@utils/base/tsUtils.ts'




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
  
  const [canUnmount, allowUnmount, preventUnmount] = useBool0(!isOpen)
  useEffect(() => { if (isOpen) preventUnmount() }, [isOpen])
  
  if (isOpen || !canUnmount) return children?.({
    isOpen,
    allowUnmount, // stable
  })
  return undefined
})
MountController.displayName = 'MountController'
export default MountController

