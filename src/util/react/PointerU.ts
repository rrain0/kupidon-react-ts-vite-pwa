import React from 'react'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import { useAppPointerAction } from 'src/util/view/useAppPointerAction.ts'



export namespace PointerU {
  
  
  export const evStopPropagation = (ev: React.BaseSyntheticEvent | Event) => {
    ev.stopPropagation()
  }
  export const evPreventDefault = (ev: React.BaseSyntheticEvent | Event) => {
    ev.preventDefault()
  }
  
  
  
  export const useOnThisClick = <T extends Element>() => {
    const [getCanCloseByClickEv, setCanCloseByClickEv] = useRefGetSet(0)
    
    return (onClick?: React.MouseEventHandler<T>) => ({
      onPointerDown: (ev: React.PointerEvent) => {
        if (ev.currentTarget === ev.target) setCanCloseByClickEv(1)
      },
      onPointerUp: (ev: React.PointerEvent) => {
        if (ev.currentTarget === ev.target && getCanCloseByClickEv() === 1) {
          setCanCloseByClickEv(2)
        }
      },
      onClick: (ev: React.MouseEvent<T>) => {
        if (getCanCloseByClickEv() === 2) onClick?.(ev)
        setCanCloseByClickEv(0)
      },
    })
  }
  
  
  
  // todo hack fix for click
  // TODO Pointer // TODO костыль для клика.
  //  Без костыля если при закрывании шторки на андроиде жать кнопку, то клик не работает, хотя всё ок.
  export const useClickFix = <E extends HTMLElement = HTMLElement>() => {
    const [getWasClicked, setWasClicked] = useRefGetSet(0)
    const { getWasDragged } = useAppPointerAction()
    
    return {
      onPointerDown: (ev: React.PointerEvent) => {
        // Pointer & Mouse Left Button is 0
        if (ev.button === 0) setWasClicked(1)
      },
      onPointerUp: (ev: React.PointerEvent<E>) => {
        if (getWasClicked() === 1) {
          setWasClicked(2)
          const ct = ev.currentTarget
          setTimeout(() => {
            // TODO Pointer - click fix 2
            if (getWasClicked() === 2 && !getWasDragged()) {
              ct.click()
            }
          }, 50)
        }
      },
      onClick: (ev: React.MouseEvent) => {
        setWasClicked(3)
      },
    } as const
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




