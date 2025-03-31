import { AsyncU } from '@util/common/AsyncU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedComputed } from 'src/mini-libs/animated/AnimatedComputed.ts'
import { AnimatedProperty } from 'src/mini-libs/animated/AnimatedProperty.ts'
import {
  AnimationConfig, AnimationFun, AnimationConfigOnUpdateParams,
} from 'src/mini-libs/animated/AnimationConfig.ts'
import { addAnimation, removeAnimation } from 'src/mini-libs/animated/runAnimations.ts'
import { getTime } from 'src/mini-libs/animated/util.ts'
import Mapper = TypeU.Mapper
import Callback = TypeU.Callback
import noop = TypeU.noop
import Callback1 = TypeU.Callback1
import withThrottle = AsyncU.withThrottle
import exists = TypeU.exists





export class AnimatedValue<Value> implements AnimatedProperty<Value> {
  constructor(params: { initialValue: Value }) {
    void this.set(params.initialValue)
  }
  
  startValue!: Value
  startTime: number = getTime()
  animationData: any
  animationFun: AnimationFun<Value, any> | undefined
  onUpdate: Callback1<AnimationConfigOnUpdateParams<Value>> | undefined
  
  // не влияет на анимируемое значение, просто переводит в состояние finished
  finish: Callback = noop
  finished = false
  whenFinished!: Promise<void>
  
  // не влияет на анимируемое значение, просто переводит в состояние canceled
  cancel: Callback = noop
  canceled = false
  whenCanceled!: Promise<void>
  
  get(time = getTime()): Value {
    const { value, finished, data } =
      this.animationFun?.({
        startValue: this.startValue,
        time: time - this.startTime,
        data: this.animationData,
      })
      ?? { value: this.startValue, finished: true }
    this.animationData = data
    this.onUpdate?.({ value, finished })
    if (!this.finished && finished) this.finish()
    return value
  }
  
  set(value: Value) {
    this.endCurrAnimation()
    this.startTime = getTime()
    this.startValue = value
    this.animationData = undefined
    this.animationFun = undefined
    this.onUpdate = undefined
    this.resetCompletionState()
    addAnimation(this.update)
  }
  
  async start<D = undefined>(animation: AnimationConfig<Value, D>): Promise<void> {
    this.endCurrAnimation()
    this.startValue = animation.startValue
    if (exists(animation.startTime)) {
      this.startTime = animation.startTime
    }
    else {
      this.startTime = getTime()
    }
    this.animationData = animation.initialData
    this.animationFun = animation.animationFun
    this.onUpdate = animation.onUpdate
    this.resetCompletionState()
    addAnimation(this.update)
    return Promise.any([this.whenFinished, this.whenCanceled])
  }
  
  
  readonly update = (time = getTime()) => {
    const v = this.get(time)
    for (const l of this.listeners) l(v)
    if (this.finished) this.removeAnimationThrottled()
  }
  
  
  private readonly removeAnimationThrottled = withThrottle(400, () => {
    if (!this.isRunning) {
      //console.log('remove')
      removeAnimation(this.update)
    }
  })
  
  map<Mapped>(mapper: Mapper<Value, Mapped>) {
    return new AnimatedComputed<Value, Mapped>(this, mapper)
  }
  
  get isRunning() {
    return !this.finished && !this.canceled
  }
  
  endCurrAnimation() {
    if (!this.finished && !this.canceled) this.cancel()
  }
  
  resetCompletionState() {
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

