import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedComputed } from 'src/mini-libs/animated/AnimatedComputed.ts'
import Mapper = TypeU.Mapper
import Callback1 = TypeU.Callback1



export interface AnimatedProperty<Value> {
  get(): Value
  map<Mapped>(mapper: Mapper<Value, Mapped>): AnimatedComputed<Value, Mapped>
  
  refresh(): void
  
  onChange(listener: Callback1<Value>): void
  removeOnChange(listener: Callback1<Value>): void
}


