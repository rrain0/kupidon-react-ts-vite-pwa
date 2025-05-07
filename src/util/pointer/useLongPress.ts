import React from 'react'
import { isIOS } from 'react-device-detect'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useWasGesture } from 'src/util/pointer/useWasGesture.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import Callback = TypeU.Callback




const longPressDelay = 350



export const useLongPress = () => {
  const [getTimerId, setTimerId] = useRefGetSet<any>(undefined)
  const { getWasDragged } = useWasGesture()
  
  return (onLongPress?: Callback) => ({
    onPointerDown: (ev: React.PointerEvent) => {
      // Any Touch & Mouse Left Button is 0
      if (ev.button === 0) {
        const timerId = setTimeout(() => {
          if (!getWasDragged() && onLongPress) {
            navigator.vibrate(100)
            onLongPress()
          }
        }, longPressDelay)
        setTimerId(timerId)
      }
    },
    onPointerUp: () => {
      clearTimeout(getTimerId())
    },
    onPointerLeave: () => {
      clearTimeout(getTimerId())
    },
    onPointerCancel: () => {
      clearTimeout(getTimerId())
    },
  } as const)
}


