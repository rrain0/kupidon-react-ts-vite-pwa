import { TypeU } from '@util/common/TypeU.ts'
import { AnimationFun } from 'src/mini-libs/animated/Animation.ts'
import Pu = TypeU.Pu


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
export type SpringAnimationData = Pu<{
  prevTimestamp: number
  prevValue: number
  prevVelocity: number
  finished: boolean
}>
export const createSpringAnimation = ({
  mass, tension, friction, initVelocity, endValue,
  // @ts-expect-error
}: SpringAnimationParams): AnimationFun<number, SpringAnimationData | undefined> => ({
  startValue, time, data: { prevTimestamp, prevValue, prevVelocity, finished } = { },
}) => {
  
  if (finished) return { value: prevValue, finished, data: {
    prevTimestamp, prevValue, prevVelocity, finished,
  } }
  
  const currentTimestamp = time
  const fractionalDiff = currentTimestamp - (prevTimestamp ?? currentTimestamp)
  const naturalDiffPart = Math.floor(fractionalDiff)
  const decimalDiffPart = fractionalDiff % 1
  const normalizedDiff = Math.min(naturalDiffPart, 46)
  
  let velocity = prevVelocity ?? initVelocity ?? 0
  let value = prevValue ?? startValue
  
  // Рассчитываем физику для каждого 1-миллисекундного интервала
  for (let i = 0; i < normalizedDiff; i++) {
    const springRestoringForce = -1 * tension * (value - endValue)
    const dampingForce = -1 * velocity * friction
    const acceleration = (springRestoringForce + dampingForce) / mass
    
    velocity = velocity + acceleration / 1000
    value  = value + velocity / 1000
  }
  
  const precision = 0.001
  finished = Math.abs(velocity) < precision
    && Math.abs(value - endValue) < precision
  
  return { value, finished, data: {
    // Отнимаем оставшуюся часть миллисекунды от текущего времени, так как мы ее не проанимировали
    prevTimestamp: currentTimestamp - decimalDiffPart,
    prevValue: value,
    prevVelocity: velocity,
    finished,
  } }
}




export type SpringParams = {
  mass: number
  tension: number
  friction: number
  initVelocity: number
}
export type CurrSpringParams = {
  value: number
  velocity: number
  time: number
  finished: boolean
}
export type NextSpringParams = {
  from: number
  to: number
  time: number
  prev?: CurrSpringParams | undefined
}

export const createSpring = ({
  mass, tension, friction, initVelocity,
}: SpringParams) => ({
  from, to, time, prev,
}: NextSpringParams): CurrSpringParams => {
  
  if (prev?.finished) return prev
  
  const fractionalDiff = time - (prev?.time ?? time)
  const naturalDiffPart = Math.floor(fractionalDiff)
  const decimalDiffPart = fractionalDiff % 1
  const normalizedDiff = Math.min(naturalDiffPart, 46)
  
  let velocity = prev?.velocity ?? initVelocity ?? 0
  let value = prev?.value ?? from
  
  // Рассчитываем физику для каждого 1-миллисекундного интервала
  for (let i = 0; i < normalizedDiff; i++) {
    const springRestoringForce = -1 * tension * (value - to)
    const dampingForce = -1 * velocity * friction
    const acceleration = (springRestoringForce + dampingForce) / mass
    
    velocity = velocity + acceleration / 1000
    value  = value + velocity / 1000
  }
  
  const precision = 0.001
  const finished = Math.abs(velocity) < precision
    && Math.abs(value - to) < precision
  
  return { value, velocity, time: time - decimalDiffPart, finished }
}