import React, { useLayoutEffect } from 'react'


export const usePreventWheelEvent = (ref: React.RefObject<HTMLElement>)=>{
  
  useLayoutEffect(()=>{
    const el = ref.current
    if (el){
      
      const onWheel = (ev: WheelEvent)=>{
        ev.preventDefault()
        ev.stopPropagation()
        console.log('onWheel',ev)
      }
      
      el.addEventListener('wheel', onWheel, { passive: false })
      
      return ()=>{
        el.removeEventListener('wheel', onWheel)
      }
    }
  },[ref.current])
  
}

