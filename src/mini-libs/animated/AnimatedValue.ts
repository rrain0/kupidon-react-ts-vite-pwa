import { AsyncU } from '@util/common/AsyncU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedComputed } from 'src/mini-libs/animated/AnimatedComputed.ts'
import { AnimatedProperty, StartAnimationProps } from 'src/mini-libs/animated/AnimatedProperty.ts'
import {
  AnimationFunction,
  passAnimationFunction,
} from 'src/mini-libs/animated/animationFunciton.ts'
import { addAnimation, removeAnimation } from 'src/mini-libs/animated/runAnimations.ts'
import { getTime } from 'src/mini-libs/animated/util.ts'
import Mapper = TypeU.Mapper
import exists = TypeU.exists
import Callback = TypeU.Callback
import noop = TypeU.noop
import Callback1 = TypeU.Callback1
import withThrottle = AsyncU.withThrottle



export class AnimatedValue<Value> implements AnimatedProperty<Value, Value> {
  constructor(props: StartAnimationProps<Value>) {
    void this.start(props)
  }
  
  getValue() { return this }
  
  startValue!: Value
  startTime: number = getTime()
  animationFunction: AnimationFunction<Value> = passAnimationFunction
  
  // не влияет на значение, просто переводит в состояние finished
  finish: Callback = noop
  finished = false
  whenFinished!: Promise<void>
  
  // не влияет на значение, просто переводит в состояние canceled
  cancel: Callback = noop
  canceled = false
  whenCanceled!: Promise<void>
  
  get(time = getTime()): Value {
    const [v, finished] = this.animationFunction(this.startValue, time - this.startTime)
    if (!this.finished && finished) this.finish()
    return v
  }
  
  set(value: Value) {
    this.endCurrAnimation()
    this.startTime = getTime()
    this.startValue = value
    this.animationFunction = passAnimationFunction
    this.reset()
    addAnimation(this.update)
  }
  
  start(props: StartAnimationProps<Value>): Promise<void> {
    this.endCurrAnimation()
    this.startValue = props.startValue
    if (exists(props.startTime)) {
      this.startTime = props.startTime
    }
    if (exists(props.animationFunction)) {
      this.animationFunction = props.animationFunction
    }
    this.reset()
    addAnimation(this.update)
    return Promise.any([this.whenFinished, this.whenCanceled])
  }
  
  
  update = (time = getTime()) => {
    for (const l of this.listeners) l(this.get(time))
    if (this.finished) {
      this.removeAnimationThrottled()
    }
  }
  
  private removeAnimationThrottled = withThrottle(400, () => {
    if (!this.isRunning) removeAnimation(this.update)
  })
  
  map<Mapped>(mapper: Mapper<Value, Mapped>) {
    return new AnimatedComputed<Value, Value, Mapped>(this, mapper)
  }
  
  get isRunning() {
    return !this.finished && !this.canceled
  }
  
  endCurrAnimation() {
    if (!this.finished && !this.canceled) this.cancel()
  }
  
  reset() {
    this.finish = noop
    this.finished = false
    this.whenFinished = new Promise<void>(resolve => {
      this.finish = () => {
        this.finished = true
        resolve()
      }
    })
    
    this.cancel = noop
    this.canceled = false
    this.whenCanceled = new Promise<void>(resolve => {
      this.cancel = () => {
        this.canceled = true
        resolve()
      }
    })
  }
  
  
  private listeners = new Set<Callback1<Value>>()
  onChange(listener: Callback1<Value>) {
    this.listeners.add(listener)
  }
  removeOnChange(listener: Callback1<Value>) {
    this.listeners.delete(listener)
  }
  
}

