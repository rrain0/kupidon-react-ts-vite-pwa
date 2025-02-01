import React from 'react'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'



export namespace PointerU {
  
  
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
            if (getWasClicked() === 2) ct.click()
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
      onClick: stopReactEventPropagation,
      
      onMouseDown: stopReactEventPropagation,
      onMouseMove: stopReactEventPropagation,
      onMouseUp: stopReactEventPropagation,
      onMouseOut: stopReactEventPropagation,
      
      onMouseEnter: stopReactEventPropagation,
      onMouseOver: stopReactEventPropagation,
      onMouseLeave: stopReactEventPropagation,
      
      onWheel: stopReactEventPropagation,
      
      onPointerDown: stopReactEventPropagation,
      onPointerMove: stopReactEventPropagation,
      onPointerUp: stopReactEventPropagation,
      onPointerOut: stopReactEventPropagation,
      onPointerCancel: stopReactEventPropagation,
      
      onPointerEnter: stopReactEventPropagation,
      onPointerOver: stopReactEventPropagation,
      onPointerLeave: stopReactEventPropagation,
      
      onTouchStart: stopReactEventPropagation,
      onTouchMove: stopReactEventPropagation,
      onTouchEnd: stopReactEventPropagation,
      onTouchCancel: stopReactEventPropagation,
    }
  }
  
}



const stopReactEventPropagation = (ev: React.BaseSyntheticEvent) => {
  ev.stopPropagation()
}

