import React from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { useBool } from '@util/react/useBool.ts'
import SetterOrUpdater = TypeUtils.SetterOrUpdater
import PartialUndef = TypeUtils.PartialUndef
import ValueOrGenerator = TypeUtils.ValueOrGenerator
import Callback = TypeUtils.Callback




export type UseBoolRenderProps = {
  value: boolean
  notValue: boolean
  setValue: SetterOrUpdater<boolean>
  setTrue: Callback
  setFalse: Callback
  toggleValue: Callback
}
export type UseBoolProps = PartialUndef<{
  initial: ValueOrGenerator<boolean>
  children: ((props: UseBoolRenderProps)=>React.ReactNode)
}>
const UseBool =
React.memo(
(props: UseBoolProps)=>{
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