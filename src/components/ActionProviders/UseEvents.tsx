import React, { useEffect, useRef } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef





export type UseEventsProps = PartialUndef<{
  onClick: EventListener
  children: (...props: UseEventsRenderProps)=>React.ReactNode
}>
export type UseEventsRenderProps = [React.RefObject<Element>]



const UseEvents =
React.memo(
(props: UseEventsProps)=>{
  const elemRef = useRef<Element>(null)
  
  useEffect(
    ()=>{
      const elem = elemRef.current
      if (elem){
        
        if (props.onClick) elem.addEventListener('click', props.onClick)
        
        return ()=>{
          if (props.onClick) elem.removeEventListener('click', props.onClick)
        }
        
      }
    },
    [elemRef.current]
  )
  
  return props.children?.(elemRef)
})
export default UseEvents