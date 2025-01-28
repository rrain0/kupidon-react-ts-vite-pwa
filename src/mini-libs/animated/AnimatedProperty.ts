import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedComputed } from 'src/mini-libs/animated/AnimatedComputed.ts'
import { AnimatedValue } from 'src/mini-libs/animated/AnimatedValue.ts'
import { AnimationFunction } from 'src/mini-libs/animated/animationFunciton.ts'
import Mapper = TypeU.Mapper
import Callback1 = TypeU.Callback1



export type StartAnimationProps<V> = {
  startValue: V,
  startTime?: number | undefined,
  animationFunction?: AnimationFunction<V> | undefined,
}



export interface AnimatedProperty<Source, Value> {
  getValue(): AnimatedValue<Source>
  
  finish(): void
  readonly finished: boolean
  readonly whenFinished: Promise<void>
  
  cancel(): void
  readonly canceled: boolean
  readonly whenCanceled: Promise<void>
  
  get(time?: number): Value
  map<Mapped>(mapper: Mapper<Value, Mapped>): AnimatedComputed<Value, Value, Mapped>
  
  onChange(listener: Callback1<Value>): void
  removeOnChange(listener: Callback1<Value>): void
  
  /*
  onChange2(listener: Callback1<Value>): number
  removeOnChange2(index: number): void
   */
}


