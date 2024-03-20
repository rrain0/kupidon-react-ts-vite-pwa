import React from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useBoolState } from 'src/utils/react/useBoolState'
import SetterOrUpdater = TypeUtils.SetterOrUpdater
import PartialUndef = TypeUtils.PartialUndef
import ValueOrGenerator = TypeUtils.ValueOrGenerator




export type UseBoolRenderProps = {
  value: boolean
  notValue: boolean
  setValue: SetterOrUpdater<boolean>
  setTrue: ()=>void
  setFalse: ()=>void
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
  
  const [value, setTrue, setFalse, , setValue] = useBoolState(initial)
  
  return children?.({
    value,
    notValue: !value,
    setValue,
    setTrue,
    setFalse
  })
})
export default UseBool