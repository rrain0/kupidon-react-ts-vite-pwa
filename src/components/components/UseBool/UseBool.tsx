import React from 'react'

import { useBool } from '@utils/state/react/useBool.ts'
import { SetterOrUpdater } from '@utils/base/tsUtils.ts'
import { Pu } from '@utils/base/tsUtils.ts'
import { ValueOrProducer } from '@utils/base/tsUtils.ts'
import { Cb } from '@utils/base/tsUtils.ts'




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