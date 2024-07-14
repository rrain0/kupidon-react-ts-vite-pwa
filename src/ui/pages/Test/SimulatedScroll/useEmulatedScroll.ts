import { useSpringValue } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import React from 'react'
import { ArrayU } from 'src/util/common/ArrayU'
import { MathU } from 'src/util/common/MathU'
import { RangeU } from 'src/util/common/RangeU'
import { TypeU } from 'src/util/common/TypeU'
import { useRefAsGetSet } from 'src/util/react-state-and-ref/useRefAsGetSet'
import { useRefGetSet } from 'src/util/react-state-and-ref/useRefGetSet'
import Getter = TypeU.Getter
import NumRange = RangeU.NumRange
import addWithRetainingLastElemsWithSameSign = ArrayU.addRetainingLastElemsWithSameSign
import maxAbs = MathU.maxAbs




export const useEmulatedScroll = (
  progress: React.MutableRefObject<number>,
  getMinMaxValue: Getter<NumRange>,
  dVpToMinMaxBased: ([dx, dy]: NumRange) => number
) => {

  const [getProgress, setProgress] = useRefAsGetSet(progress)
  const progressToValue = () => RangeU.map(getProgress(), [0, 100], getMinMaxValue())
  const valueToProgress = (dV: number) => RangeU.map(dV, getMinMaxValue(), [0, 100])
  
  const spring = useSpringValue(0)
  const springClamped = spring.to(v => RangeU.clamp(v, getMinMaxValue()))
  
  
  const [getLastDvps, setLastDvps] = useRefGetSet([] as Array<{ ts: number, dT: number, dVp: number }>)
  // noinspection JSVoidFunctionReturnValueUsed
  const contentDrag = useDrag(
    gesture => {
      const {
        first: isFirst,
        active: isActive,
        last: isLast,
        xy: [vpx, vpy], // viewport x, viewport y
        movement: [mx, my],
        delta: [dx, dy],
        velocity: [spdx, spdy], // px/ms (nonnegative)
        direction: [dirx, diry], // positive for y is from top to bottom,
        timeDelta,
        timeStamp,
      } = gesture
      
      //console.log({ isFirst, isActive, isLast, dy, timeDelta })
      //console.log(timeDelta, timeStamp, document.timeline.currentTime, +new Date())
      
      if (isFirst) {
        const progress = RangeU.mapClamp(spring.get(), getMinMaxValue(), [0, 100])
        setProgress(progress)
      }
      
      const clearDvps = () => {
        const dVps = getLastDvps()
        let sign = 0
        setLastDvps(dVps.reverse().filter(it => {
          if (it.ts - it.dT < (document.timeline.currentTime as unknown as number) - 200) return false
          const s = Math.sign(it.dVp)
          if (!sign) {
            sign = s
            return true
          }
          if (s === sign) return true
          return false
        }))
      }
      
      if (!isFirst && isActive) {
        const dVp = dVpToMinMaxBased([dx, dy])
        
        getLastDvps().push({ ts: timeStamp, dT: timeDelta, dVp })
        clearDvps()
        
        const dProgress = valueToProgress(dVp)
        setProgress(getProgress() + dProgress)
        
        spring.set(progressToValue())
      }
      
      if (isLast) {
        clearDvps()
        const spd = 500 * ArrayU.avg(getLastDvps().map(it => it.dVp / it.dT))
        //console.log('spd', spd)
        if (Math.abs(spd) > 350) {
          const dProgress = RangeU.map(
            spd,
            getMinMaxValue(),
            [0, 100]
          )
          setProgress(getProgress() + dProgress)
        }
        
        void spring.start(progressToValue(), {
          config: {
            clamp: true,
            mass: 1,
            tension: 80,
            friction: 30,
          },
        })
      }
    }
  )
  
  
  const apply = () => {
    !spring.isAnimating && spring.set(progressToValue())
  }
  
  apply()
  
  
  return {
    drag: contentDrag,
    value: springClamped,
    apply,
    progressToValue,
    valueToProgress,
  } as const
}


