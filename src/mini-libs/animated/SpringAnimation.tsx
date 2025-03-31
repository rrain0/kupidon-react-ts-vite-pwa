import { AnimationFunWithData } from 'src/mini-libs/animated/Animation.ts'


/*
m - mass - масса груза пружины
k - tension - кэффициент упругости
α (альфа) - friction - коэффициент трения среды

ω₀ (омега нулевое) - частота колебаний без учёта силы трения
T - period - период колебаний пружины без учета трения
ζ (дзета) - damping ratio - кэффициент затухания
 */

export type SpringAnimationParams = {
  mass: number
  tension: number
  friction: number
  initVelocity: number
  endValue: number
}
export type SpringAnimationData = {
  prevTimestamp: number
  prevValue: number
  prevVelocity: number
  finished: boolean
}
export const createSpringAnimation = ({
  mass, tension, friction, initVelocity, endValue,
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
  let safeValue = prevValue || startValue
  
  // Рассчитываем физику для каждого 1-миллисекундного интервала
  for (let i = 0; i < normalizedDiff; i++) {
    const springRestoringForce = -1 * tension * (safeValue - endValue)
    const dampingForce = -1 * safeVelocity * friction
    const acceleration = (springRestoringForce + dampingForce) / mass
    
    safeVelocity = safeVelocity + acceleration / 1000
    safeValue  = safeValue + safeVelocity / 1000
  }
  
  const precision = 0.001
  finished = Math.abs(safeVelocity) < precision
    && Math.abs(safeValue - endValue) < precision
  
  // Отнимаем оставшуюся часть миллисекунды от текущего времени,
  // так как мы ее не проанимировали
  prevTimestamp = currentTimestamp - decimalDiffPart
  prevValue = safeValue
  prevVelocity = safeVelocity
  return { value: safeValue, finished, data: {
    prevTimestamp, prevValue, prevVelocity, finished,
  } }
}