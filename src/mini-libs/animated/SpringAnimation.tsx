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
  
  const spring = createSpring({ mass, tension, friction, from: startValue, initVelocity })
  const prev = {
    time: prevTimestamp, finished, velocity: prevVelocity, value: prevValue,
  }
  const curr = spring({ to: endValue, time, prev })
  
  return {
    value: curr.value,
    finished: curr.finished,
    data: {
      prevTimestamp: curr.time,
      prevValue: curr.value,
      prevVelocity: curr.velocity,
      finished: curr.finished,
    },
  }
}




export type SpringParams = {
  mass: number
  tension: number
  friction: number
  from: number
  initVelocity: number
}
export type CurrSpringParams = Pu<{
  value: number
  velocity: number
  time: number
  finished: boolean
}>
export type NextSpringParams = {
  to: number
  time: number
  prev?: CurrSpringParams | undefined
}

export const createSpring = ({
  mass, tension, friction, from, initVelocity,
}: SpringParams) => ({
  to, time, prev,
}: NextSpringParams): CurrSpringParams => {
  
  if (prev?.finished) return prev
  
  class SpringState {
    constructor(
      public value = prev?.value ?? from,
      public velocity = prev?.velocity ?? initVelocity ?? 0,
    ) { }
    get springRestoringForce() { return -1 * tension * (this.value - to) }
    get dampingForce() { return -1 * this.velocity * friction }
    get acceleration() { return (this.springRestoringForce + this.dampingForce) / mass }
    next() {
      const velocity = this.velocity + this.acceleration / 1000
      const value = this.value + velocity / 1000
      return new SpringState(value, velocity)
    }
  }
  let finished = false
  let state = new SpringState()
  
  // Время Δt между прошлой и новой анимацией
  const stepTime = 1 // ms
  let restTime = time - (prev?.time ?? time)
  
  // Рассчитываем физику для каждого Δt
  while (restTime >= stepTime && !finished) {
    const next = state.next()
    
    const precision = 0.001
    // Условие, что у пружины кончилась энергия колебаться
    //finished = Math.abs(next.velocity) < precision && Math.abs(next.value - to) < precision
    
    // Условие, что первый раз дошли до точки
    finished = Math.sign(next.value - to) !== Math.sign(state.value - to)
    if (finished) next.value = to
    
    state = next
    restTime -= stepTime
  }
  const currTime = time - restTime
  
  const { value, velocity } = state
  return { value, velocity, time: currTime, finished }
}