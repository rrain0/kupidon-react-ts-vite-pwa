import { AsyncU } from 'src/utils/base/AsyncU.ts'

import { ReactU } from '@utils/react/ReactU.ts'
import { AnimatedComputed } from '@libs/animated/AnimatedComputed.ts'
import { AnimatedProperty } from '@libs/animated/AnimatedProperty.ts'
import {
  AnimationConfig, AnimationFun, AnimationConfigOnUpdateParams,
} from '@libs/animated/AnimationConfig.ts'
import { addAnimation, removeAnimation } from '@libs/animated/runAnimations.ts'
import { getTime } from '@libs/animated/util.ts'
import { Mapper } from 'src/utils/base/TypeUtils.ts'
import { Callback } from 'src/utils/base/TypeUtils.ts'
import { noop } from 'src/utils/base/TypeUtils.ts'
import { Callback1 } from 'src/utils/base/TypeUtils.ts'
import withThrottle = AsyncU.withThrottle
import { Pu } from 'src/utils/base/TypeUtils.ts'
import { isdef } from 'src/utils/base/TypeUtils.ts'
import noRepeatLog = ReactU.noRepeatLog
import noRepeatLog2 = ReactU.noRepeatLog2




export type AnimationEnded = Pu<{
  finished: boolean
  stopped: boolean
}>



export class AnimatedValue<Value> implements AnimatedProperty<Value> {
  
  constructor(initialValue: Value) {
    this.set(initialValue)
  }
  
  
  startTime: number = 0
  startValue!: Value
  cachedValue!: Value // last rendered value
  animationData: any
  animationFun: AnimationFun<Value, any> | undefined
  onUpdate: Callback1<AnimationConfigOnUpdateParams<Value>> | undefined
  
  
  
  setFinishedState: Callback = noop
  finished = false
  whenFinished!: Promise<{ finished: true }>
  
  setStoppedState: Callback = noop
  stopped = false
  whenStopped!: Promise<{ stopped: true }>
  
  get ended() {
    return this.finished || this.stopped
  }
  get whenEnded(): Promise<AnimationEnded> {
    return Promise.any([this.whenFinished, this.whenStopped])
  }
  
  
  
  get() { return this.cachedValue }
  
  map<Mapped>(mapper: Mapper<Value, Mapped>): AnimatedComputed<Value, Mapped> {
    return new AnimatedComputed<Value, Mapped>(this, mapper)
  }
  
  set(value: Value) {
    this.resetState()
    
    this.startTime = getTime()
    this.startValue = value
    this.cachedValue = value
    this.animationData = undefined
    this.animationFun = undefined
    this.onUpdate = undefined
    
    addAnimation(this.updateByTimeAndRefreshAndCheckStopAnimating)
  }
  
  async animate<D = undefined>(animation: AnimationConfig<Value, D>): Promise<AnimationEnded> {
    this.resetState()
    
    this.startTime = animation.startTime ?? getTime()
    this.startValue = animation.startValue ?? this.cachedValue
    this.cachedValue = animation.startValue ?? this.cachedValue
    this.animationData = animation.initialData
    this.animationFun = animation.animationFun
    this.onUpdate = animation.onUpdate
    
    addAnimation(this.updateByTimeAndRefreshAndCheckStopAnimating)
    
    return this.whenEnded
  }
  
  stop() {
    this.setStoppedState()
    
    this.animationData = undefined
    this.animationFun = undefined
    this.onUpdate = undefined
    
    this.removeAnimationThrottled()
  }
  
  
  
  
  
  updateByTime(time = getTime()) {
    const { value, finished, data } =
      this.animationFun?.({
        startValue: this.startValue,
        time: time - this.startTime,
        data: this.animationData,
      })
      ?? { value: this.startValue, finished: true }
    this.cachedValue = value
    this.animationData = data
    this.onUpdate?.({ value, finished })
    if (!this.finished && finished) this.setFinishedState()
  }
  
  refresh() {
    for (const l of this.listeners) l(this.get())
  }
  
  readonly updateByTimeAndRefreshAndCheckStopAnimating = (time = getTime()) => {
    this.updateByTime(time)
    this.refresh()
    if (this.ended) this.removeAnimationThrottled()
  }
  
  
  private readonly removeAnimationThrottled = withThrottle(400, () => {
    if (this.ended) {
      //console.log('remove')
      removeAnimation(this.updateByTimeAndRefreshAndCheckStopAnimating)
    }
  })
  
  
  
  
  
  resetState() {
    this.finished = false
    this.whenFinished = new Promise(resolve => {
      this.setFinishedState = () => {
        this.finished = true
        resolve({ finished: true })
      }
    })
    
    this.stopped = false
    this.whenStopped = new Promise(resolve => {
      this.setStoppedState = () => {
        this.stopped = true
        resolve({ stopped: true })
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

