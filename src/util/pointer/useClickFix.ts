import React from 'react'
import { useWasDragged } from 'src/util/pointer/useWasDragged.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'




// todo hack fix for click
// TODO Pointer // TODO костыль для клика.
//  Без костыля если при закрывании шторки на андроиде жать кнопку,
//  то клик не работает, хотя всё ок.
export const useClickFix = <E extends HTMLElement = HTMLElement>() => {
  const [getWasClicked, setWasClicked] = useRefGetSet(0)
  const { getWasDragged } = useWasDragged()
  
  return {
    onPointerDown: (ev: React.PointerEvent) => {
      // Pointer & Mouse Left Button is 0
      if (ev.button === 0) setWasClicked(1)
    },
    onPointerUp: (ev: React.PointerEvent<E>) => {
      if (getWasClicked() === 1 && !getWasDragged()) {
        setWasClicked(2)
        const elem = ev.currentTarget
        setTimeout(() => {
          // TODO Pointer - click fix 2
          if (getWasClicked() === 2) {
            elem.click()
          }
        }, 250)
      }
    },
    onClick: (ev: React.MouseEvent) => {
      setWasClicked(0)
    },
  } as const
}