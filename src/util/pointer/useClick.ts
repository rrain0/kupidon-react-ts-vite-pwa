import React from 'react'
import { useWasGesture } from 'src/util/pointer/useWasGesture.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import { ReactU } from 'src/util/react/ReactU.ts'
import OnClick = ReactU.OnClick




// todo hack fix for click
// TODO Pointer // TODO костыль для клика.
//  Без костыля если при закрывании шторки драгом или в течение секунды после закрытия шторки драгом
//  на андроиде жать кнопку открыть, то клик не работает, хотя всё ок.
// + Запрещает клик, если был другой жест
export const useClick = <E extends HTMLElement = HTMLElement>() => {
  const [getClickState, setClickState] = useRefGetSet(0)
  const { getWasGesture } = useWasGesture()
  
  return (onClick?: OnClick) => ({
    onPointerDown: (ev: React.PointerEvent) => {
      // Any Touch & Mouse Left Button is 0
      if (ev.button === 0) setClickState(1)
    },
    onPointerUp: (ev: React.PointerEvent<E>) => {
      if (getClickState() === 1 && !getWasGesture()) {
        setClickState(2)
        const elem = ev.currentTarget
        setTimeout(() => {
          if (getClickState() === 2) elem.click()
        }, 250)
      }
    },
    onClick: (ev: React.MouseEvent) => {
      setClickState(0)
      if (getWasGesture()) return
      onClick?.(ev)
    },
  } as const)
}