import { AsyncU } from '@util/common/AsyncU.ts'
import { StringU } from '@util/common/StringU.ts'
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
import Callback = TypeU.Callback
import noop = TypeU.noop
import Callback1 = TypeU.Callback1
import withThrottle = AsyncU.withThrottle
import camelCaseToKebabCase = StringU.camelCaseToKebabCase




/* export const batchUpdate: Map<
  HTMLElement,
  Record<'attrs' | 'style', Record<string, string>>
> = new Map() */



export class AnimatedValue<Value> implements AnimatedProperty<Value, Value> {
  constructor(props: StartAnimationProps<Value>) {
    void this.start(props)
  }
  
  getValue() { return this }
  
  startValue!: Value
  startTime: number = getTime()
  animationFunction: AnimationFunction<Value> = passAnimationFunction
  
  // не влияет на анимируемое значение, просто переводит в состояние finished
  finish: Callback = noop
  finished = false
  whenFinished!: Promise<void>
  
  // не влияет на анимируемое значение, просто переводит в состояние canceled
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
  
  async start(props: StartAnimationProps<Value>): Promise<void> {
    this.endCurrAnimation()
    this.startValue = props.startValue
    if (props.startTime !== undefined) {
      this.startTime = props.startTime
    }
    if (props.animationFunction !== undefined) {
      this.animationFunction = props.animationFunction
    }
    this.reset()
    addAnimation(this.update)
    return Promise.any([this.whenFinished, this.whenCanceled])
  }
  
  
  readonly update = (time = getTime()) => {
    const v = this.get(time)
    for (const l of this.listeners) l(v)
    
    // Так немного медленнее
    /* for (const [el, props] of batchUpdate.entries()) {
      for (const [attr, value] of Object.entries(props.attrs)) {
        el[attr] = value
      }
      
      for (const [style, value] of Object.entries(props.style)) {
        el.style[style] = value
      }
      
      // el.style.cssText += Object.entries(props.style)
      //   .map(([style, value]) => `${camelCaseToKebabCase(style)}:${value};`)
      //   .join('')
    }
    batchUpdate.clear() */
    
    /*
    const anims = this.animations
    const aLen = anims.length
    for (let i = 0; i < aLen; i++) anims[i]?.(v)
     */
    
    if (this.finished) {
      this.removeAnimationThrottled()
    }
  }
  
  private readonly removeAnimationThrottled = withThrottle(400, () => {
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
  
  /*
  private animations: Callback1<Value>[] = []
  onChange2(listener: Callback1<Value>): number {
    const i = this.animations.length
    this.animations[i] = listener
    return i
  }
  removeOnChange2(index: number) {
    const anims = this.animations
    const len = anims.length
    delete anims[index]
    //console.log('this.animations.length', anims.length)
    //console.log('this.animations', anims)
    //if (len >= 200) this.animations = anims.filter(it => !!it)
  }
   */
}

