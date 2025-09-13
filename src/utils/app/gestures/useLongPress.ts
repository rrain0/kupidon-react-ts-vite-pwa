import React from 'react'
import { isIOS } from 'react-device-detect'

import { useWasGesture } from 'src/utils/app/gestures/useWasGesture.ts'
import { useRefGetSet } from 'src/utils/state/react/base/useRefGetSet.ts'
import { Cb } from 'src/utils/base/typeUtils.ts'




const longPressDelay = 350



export const useLongPress = () => {
  const [getTimerId, setTimerId] = useRefGetSet<any>(undefined)
  const { getWasDragged, applyLongPressed } = useWasGesture()
  
  return (onLongPress?: Cb) => ({
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


