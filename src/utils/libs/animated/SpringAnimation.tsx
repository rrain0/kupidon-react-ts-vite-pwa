
import { AnimationFun } from '@libs/animated/AnimationConfig.ts'
import { Pu } from 'src/utils/base/TypeUtils.ts'


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
  initVelocity?: number | undefined
  endValue: number
}
export type SpringAnimationData = Pu<{
  prevTime: number
  prevValue: number
  prevVelocity: number
  finished: boolean
}>
export const createSpringAnimation = ({
  mass, tension, friction, initVelocity, endValue,
}: SpringAnimationParams): AnimationFun<number, SpringAnimationData | undefined> => ({
  startValue, time, data: { prevTime, prevValue, prevVelocity, finished } = { },
}) => {
  
  const spring = createSpring({ mass, tension, friction, from: startValue, initVelocity })
  const prev = {
    time: prevTime, finished, velocity: prevVelocity, value: prevValue,
  }
  const curr = spring({ to: endValue, time, prev })
  
  return {
    value: curr.value,
    finished: curr.finished,
    data: {
      prevTime: curr.time,
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
  initVelocity?: number | undefined
}
export type OutSpringParams = {
  value: number
  velocity: number
  time: number
  finished: boolean
}
export type CurrSpringParams = Pu<OutSpringParams>
export type NextSpringParams = {
  to: number
  time: number
  prev?: CurrSpringParams | undefined
}

export const createSpring = ({
  mass, tension, friction, from, initVelocity = 0,
}: SpringParams) => ({
  to, time, prev: _prev,
}: NextSpringParams): OutSpringParams => {
  
  const prev = {
    value: _prev?.value ?? from,
    velocity: _prev?.velocity ?? initVelocity,
    time: _prev?.time ?? time,
    finished: _prev?.finished ?? false,
  }
  
  if (prev.finished) return prev
  
  class SpringState {
    constructor(
      public value = prev.value,
      public velocity = prev.velocity,
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
  let restTime = time - prev.time
  
  //console.log('spring', restTime)
  
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