import { AnimatedValue } from 'src/mini-libs/animated/AnimatedValue.tsx'
import { AnimationFunction } from 'src/mini-libs/animated/animationFunciton.ts'



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
  
  onChange(onChange: (value: Value) => void): void
  removeOnChange(onChange: (value: Value) => void): void
}


