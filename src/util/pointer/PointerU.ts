import React from 'react'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import { useAppPointerAction } from 'src/util/pointer/useAppPointerAction.ts'



export namespace PointerU {
  
  
  export const evStopPropagation = (ev: React.BaseSyntheticEvent | Event) => {
    ev.stopPropagation()
  }
  export const evPreventDefault = (ev: React.BaseSyntheticEvent | Event) => {
    ev.preventDefault()
  }
  
  
  
  
  
  
  
  
  
  // Consume Pointer & Wheel events
  export const stopPointerAndMouseEvents = (stop = true) => {
    if (!stop) return undefined
    return {
      onClick: evStopPropagation,
      
      onMouseDown: evStopPropagation,
      onMouseMove: evStopPropagation,
      onMouseUp: evStopPropagation,
      onMouseOut: evStopPropagation,
      
      onMouseEnter: evStopPropagation,
      onMouseOver: evStopPropagation,
      onMouseLeave: evStopPropagation,
      
      onWheel: evStopPropagation,
      
      onPointerDown: evStopPropagation,
      onPointerMove: evStopPropagation,
      onPointerUp: evStopPropagation,
      onPointerOut: evStopPropagation,
      onPointerCancel: evStopPropagation,
      
      onPointerEnter: evStopPropagation,
      onPointerOver: evStopPropagation,
      onPointerLeave: evStopPropagation,
      
      onTouchStart: evStopPropagation,
      onTouchMove: evStopPropagation,
      onTouchEnd: evStopPropagation,
      onTouchCancel: evStopPropagation,
    }
  }
  
  
}




