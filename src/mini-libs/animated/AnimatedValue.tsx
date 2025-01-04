import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedComputed } from 'src/mini-libs/animated/AnimatedComputed.tsx'
import { AnimatedProperty } from 'src/mini-libs/animated/AnimatedProperty.tsx'
import {
  AnimationFunction,
  passAnimationFunction,
} from 'src/mini-libs/animated/animationFunciton.ts'
import {
  AnimationProps,
  getTime,
} from 'src/mini-libs/animated/util.ts'
import Mapper = TypeU.Mapper
import exists = TypeU.exists
import Callback = TypeU.Callback
import noop = TypeU.noop



export class AnimatedValue<Value> implements AnimatedProperty<Value, Value> {
  constructor(props: AnimationProps<Value>) {
    void this.start(props)
  }
  
  getValue() { return this }
  
  startValue!: Value
  startTime: number = getTime()
  animationFunction: AnimationFunction<Value> = passAnimationFunction
  
  finish: Callback = noop
  finished = false
  whenFinished!: Promise<void>
  
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
  }
  
  start(props: AnimationProps<Value>): Promise<void> {
    this.endCurrAnimation()
    this.startValue = props.startValue
    if (exists(props.startTime)) {
      this.startTime = props.startTime
    }
    if (exists(props.animationFunction)) {
      this.animationFunction = props.animationFunction
    }
    this.reset()
    return Promise.any([this.whenFinished, this.whenCanceled])
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
  
  
  /*
  private listeners: Callback1<V>[] = []
  
  onChange(listener: Callback1<V>) {
    this.listeners.push(listener)
  }
  
  removeOnChange(listener: Callback1<V>) {
    ArrayU.remove(this.listeners, listener)
  }
  
  removeAllOnChange() {
    ArrayU.clear(this.listeners)
  }
  
  private notify() {
    this.listeners.forEach(it => it(this.value))
  }
   */
  
  map<Mapped>(mapper: Mapper<Value, Mapped>) {
    return new AnimatedComputed<Value, Value, Mapped>(this, mapper)
  }
  
}

