import React from 'react'
import { useWasGesture } from 'src/utils/gestures/pointer/useWasGesture.ts'
import { useRefGetSet } from 'src/utils/react/state/useRefGetSet.ts'
import { ReactU } from 'src/utils/react/ReactU.ts'
import OnClick = ReactU.OnClick




// TODO hack fix for click
// TODO Pointer // TODO костыль для клика.
//  Без костыля если при закрывании шторки драгом или в течение секунды после закрытия шторки драгом
//  на андроиде жать кнопку открыть, то клик не работает, хотя всё ок.
// + Запрещает клик, если был другой жест
export const useClick = <E extends HTMLElement = HTMLElement>({
  onlyThisElemClick = false,
} = { }) => {
  const [getClickState, setClickState] = useRefGetSet(0)
  
  const { getWasGesture } = useWasGesture()
  
  const [getTimerId, setTimerId] = useRefGetSet<any>(undefined)
  
  return (onClick?: OnClick) => ({
    onPointerDown: (ev: React.PointerEvent) => {
      setClickState(0)
      
      // Any touch or mouse left button is 0
      if (ev.button === 0) {
        setClickState(1)
      }
      
      if (getClickState() !== 1) setClickState(-1)
    },
    onPointerUp: (ev: React.PointerEvent<E>) => {
      if (!getWasGesture()) {
        if (getClickState() === 1) {
          setClickState(2)
        }
      }
      
      if (getClickState() !== 2) setClickState(-1)
      
      const elem = ev.currentTarget
      setTimerId(setTimeout(() => {
        // Таймер фиксит непоявление события клика, когда он должен был появиться
        // This calls standard onClick below
        elem?.click()
      }, 250))
    },
    onClick: (ev: React.MouseEvent) => {
      if (getClickState() !== 0) {
        clearTimeout(getTimerId())
        if (getClickState() === 2) {
          if (!onlyThisElemClick || ev.currentTarget === ev.target) onClick?.(ev)
        }
        setClickState(0)
      }
      else {
        // Клик был вызван программно
        if (!onlyThisElemClick || ev.currentTarget === ev.target) onClick?.(ev)
      }
    },
  } as const)
}
