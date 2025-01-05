import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedProperty } from 'src/mini-libs/animated/AnimatedProperty.tsx'
import { getTime } from 'src/mini-libs/animated/util.ts'
import Mapper = TypeU.Mapper
import Callback1 = TypeU.Callback1


export class AnimatedComputed<Root, Source, Value> implements AnimatedProperty<Root, Value> {
  constructor(
    public source: AnimatedProperty<Root, Source>,
    public mapper: Mapper<Source, Value>,
  ) { }
  
  getValue() { return this.source.getValue() }
  
  finish() { this.source.finish() }
  get finished() { return this.source.finished }
  get whenFinished() { return this.source.whenFinished }
  
  cancel() { this.source.finish() }
  get canceled() { return this.source.finished }
  get whenCanceled() { return this.source.whenFinished }
  
  get(time = getTime()): Value {
    return this.mapper(this.source.get(time))
  }
  
  update = (value: Source) => {
    const v = this.mapper(value)
    this.listeners.forEach(it => it(v))
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

