import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedProperty } from 'src/mini-libs/animated/AnimatedProperty.ts'
import { getTime } from 'src/mini-libs/animated/util.ts'
import Mapper = TypeU.Mapper
import Callback1 = TypeU.Callback1



export class AnimatedComputed<Source, Value> implements AnimatedProperty<Value> {
  constructor(
    readonly source: AnimatedProperty<Source>,
    readonly mapper: Mapper<Source, Value>,
  ) { }
  
  finish() { this.source.finish() }
  get finished() { return this.source.finished }
  get whenFinished() { return this.source.whenFinished }
  
  cancel() { this.source.cancel() }
  get canceled() { return this.source.canceled }
  get whenCanceled() { return this.source.whenCanceled }
  
  get(time = getTime()): Value {
    return this.mapper(this.source.get(time))
  }
  
  readonly update = (value: Source) => {
    const v = this.mapper(value)
    for (const l of this.listeners) l(v)
  }
  
  map<Mapped>(mapper: Mapper<Value, Mapped>) {
    return new AnimatedComputed(this, mapper)
  }
  
  private listeners = new Set<Callback1<Value>>()
  onChange(listener: Callback1<Value>) {
    this.listeners.add(listener)
    if (this.listeners.size === 1) this.source.onChange(this.update)
  }
  removeOnChange(listener: Callback1<Value>) {
    this.listeners.delete(listener)
    if (!this.listeners.size) this.source.removeOnChange(this.update)
  }
  
}

