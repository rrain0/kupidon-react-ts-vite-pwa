import React from 'react'

import { useBool } from '@utils/react/state/useBool.ts'
import { SetterOrUpdater } from '@utils/base/TypeUtils.ts'
import { Pu } from '@utils/base/TypeUtils.ts'
import { ValueOrProducer } from '@utils/base/TypeUtils.ts'
import { Callback } from '@utils/base/TypeUtils.ts'




export type UseBoolRenderProps = {
  value: boolean
  notValue: boolean
  setValue: SetterOrUpdater<boolean>
  setTrue: Callback
  setFalse: Callback
  toggleValue: Callback
}
export type UseBoolProps = Pu<{
  initial: ValueOrProducer<boolean>
  children: ((props: UseBoolRenderProps) => React.ReactNode)
}>
const UseBool =
React.memo(
(props: UseBoolProps) => {
  const {
    initial = false,
    children
  } = props
  
  const [value, setTrue, setFalse, toggleValue, setValue] = useBool(initial)
  
  return children?.({
    value,
    notValue: !value,
    setValue,
    setTrue,
    setFalse,
    toggleValue,
  })
})
export default UseBool