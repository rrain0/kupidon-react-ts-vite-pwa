import React, { useEffect, useRef } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef




export const useFakePointerRef = (...refs: React.RefObject<Element>[])=>{
  useEffect(
    ()=>{
      const elements = refs.map(it=>it.current).filter(it=>it) as Element[]
      
      if (elements.length){
        const onPointerDown = ()=>{
          //console.log('onPointerDown check')
        }
        elements.forEach(it=>it.addEventListener('pointerdown',onPointerDown))
        return ()=>{
          elements.forEach(it=>it.removeEventListener('pointerdown',onPointerDown))
        }
      }
    },
    refs.map(it=>it.current)
  )
}





export type UseFakePointerRefRenderProps = {
  ref: React.RefObject<Element>
  ref2: React.RefObject<Element>
  ref3: React.RefObject<Element>
  ref4: React.RefObject<Element>
}
export type UseFakePointerRefProps = PartialUndef<{
  children: (props: UseFakePointerRefRenderProps)=>React.ReactNode
}>



// todo hack fix
// JSX onPointer...={} doesn't work on iOS Safari
// without manually adding at least empty pointer event handler via element.addEventListener
const UseFakePointerRef =
(props: UseFakePointerRefProps)=>{
  
  const elemRef1 = useRef<Element>(null)
  const elemRef2 = useRef<Element>(null)
  const elemRef3 = useRef<Element>(null)
  const elemRef4 = useRef<Element>(null)
  
  useFakePointerRef(elemRef1, elemRef2, elemRef3, elemRef4)
  
  return props.children?.({
    ref: elemRef1,
    ref2: elemRef2,
    ref3: elemRef3,
    ref4: elemRef4,
  })
}
export default UseFakePointerRef



