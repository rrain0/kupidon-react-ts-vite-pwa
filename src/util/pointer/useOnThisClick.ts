import React from 'react'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'



// TODO Pointer merge with useOnClick(onClick, { thisElemOnly: true })
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