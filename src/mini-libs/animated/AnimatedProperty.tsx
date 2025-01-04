import { AnimatedValue } from 'src/mini-libs/animated/AnimatedValue.tsx'


export interface AnimatedProperty<Source, Value> {
  getValue(): AnimatedValue<Source>
  
  finish(): void
  readonly finished: boolean
  readonly whenFinished: Promise<void>
  
  cancel(): void
  readonly canceled: boolean
  readonly whenCanceled: Promise<void>
  
  get(time?: number): Value
}


