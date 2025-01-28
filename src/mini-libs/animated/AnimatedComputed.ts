import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedProperty } from 'src/mini-libs/animated/AnimatedProperty.ts'
import { getTime } from 'src/mini-libs/animated/util.ts'
import Mapper = TypeU.Mapper
import Callback1 = TypeU.Callback1


export class AnimatedComputed<Root, Source, Value> implements AnimatedProperty<Root, Value> {
  constructor(
    readonly source: AnimatedProperty<Root, Source>,
    readonly mapper: Mapper<Source, Value>,
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
  
  /*
  onChange2(listener: Callback1<Value>): number {
    const m = this.mapper
    const f = (sv: Source) => listener(m(sv))
    return this.source.onChange2(f)
  }
  removeOnChange2(index: number) {
    this.source.removeOnChange2(index)
  }
   */
}

