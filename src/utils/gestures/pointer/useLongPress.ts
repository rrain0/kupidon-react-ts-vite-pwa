import React from 'react'
import { isIOS } from 'react-device-detect'

import { useWasGesture } from 'src/utils/gestures/pointer/useWasGesture.ts'
import { useRefGetSet } from 'src/utils/react/state/useRefGetSet.ts'
import { Callback } from 'src/utils/base/typeUtils.ts'




const longPressDelay = 350



export const useLongPress = () => {
  const [getTimerId, setTimerId] = useRefGetSet<any>(undefined)
  const { getWasDragged, applyLongPressed } = useWasGesture()
  
  return (onLongPress?: Callback) => ({
    onPointerDown: (ev: React.PointerEvent) => {
      // Any Touch & Mouse Left Button is 0
      if (ev.button === 0) {
        const timerId = setTimeout(() => {
          if (!getWasDragged() && onLongPress) {
            applyLongPressed()
            navigator.vibrate?.(100)
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


