import React from 'react'
import { TypeU } from '@util/common/TypeU.ts'
import { useBool } from 'src/util/react-state/useBool.ts'
import SetterOrUpdater = TypeU.SetterOrUpdater
import PartialUndef = TypeU.PartialUndef
import ValueOrGenerator = TypeU.ValueOrGenerator
import Callback = TypeU.Callback




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