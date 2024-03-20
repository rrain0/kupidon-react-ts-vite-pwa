import React, { useRef } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef




export type UseElemRefProps<E extends Element = Element> = PartialUndef<{
  render: (ref: React.RefObject<E>)=>React.ReactNode
}>
const UseElemRef =
<E extends Element = Element>
(props: UseElemRefProps<E>)=>{
  const elemRef = useRef<E>(null)
  return props.render?.(elemRef)
}
export default UseElemRef



