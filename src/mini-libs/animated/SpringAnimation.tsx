import { AnimationFunWithData } from 'src/mini-libs/animated/Animation.ts'




export type SpringAnimationParams = {
  mass: number
  tension: number
  friction: number
  initVelocity: number
  from: number
  to: number
  prevTimestamp: number
  prevVelocity: number
  prevValue: number
}
export type SpringAnimationData = {
  prevTimestamp: number
  prevValue: number
  prevVelocity: number
  finished: boolean
}
export const springAnimation = ({
  mass, tension, friction, initVelocity, from, to,
}: SpringAnimationParams): AnimationFunWithData<number, SpringAnimationData> => ({
  startValue, time, data: { prevTimestamp, prevValue, prevVelocity, finished },
}) => {
  
  if (finished) return { value: prevValue, finished, data: {
    prevTimestamp, prevValue, prevVelocity, finished,
  } }
  
  const currentTimestamp = time
  const fractionalDiff = currentTimestamp - (prevTimestamp || currentTimestamp)
  const naturalDiffPart = Math.floor(fractionalDiff)
  const decimalDiffPart = fractionalDiff % 1
  const normalizedDiff = Math.min(naturalDiffPart, 46)
  
  let safeVelocity = prevVelocity || initVelocity || 0
  let safeValue = prevValue || from
  
  // Рассчитываем физику для каждого 1-миллисекундного интервала
  for (let i = 0; i < normalizedDiff; i++) {
    const springRestoringForce = -1 * tension * (safeValue - to)
    const dampingForce = -1 * safeVelocity * friction
    const acceleration = (springRestoringForce + dampingForce) / mass
    
    safeVelocity = safeVelocity + acceleration / 1000
    safeValue  = safeValue + safeVelocity / 1000
  }
  
  const precision = 0.001
  finished = Math.abs(safeVelocity) < precision
    && Math.abs(safeValue - to) < precision
  
  // Отнимаем оставшуюся часть миллисекунды от текущего времени,
  // так как мы ее не проанимировали
  prevTimestamp = currentTimestamp - decimalDiffPart
  prevValue = safeValue
  prevVelocity = safeVelocity
  return { value: safeValue, finished, data: {
    prevTimestamp, prevValue, prevVelocity, finished,
  } }
}