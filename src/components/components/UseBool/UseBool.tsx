import React from 'react'

import { useBool } from '@utils/state/react/base/useBool.ts'
import { SetterOrUpdater } from '@utils/base/typeUtils.ts'
import { Pu } from '@utils/base/typeUtils.ts'
import { ValueOrProducer } from '@utils/base/typeUtils.ts'
import { Cb } from '@utils/base/typeUtils.ts'




export type UseBoolRenderProps = {
  value: boolean
  notValue: boolean
  setValue: SetterOrUpdater<boolean>
  setTrue: Cb
  setFalse: Cb
  toggleValue: Cb
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