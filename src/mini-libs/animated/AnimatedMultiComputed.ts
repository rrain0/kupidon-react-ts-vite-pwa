import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedComputed } from 'src/mini-libs/animated/AnimatedComputed.ts'
import { AnimatedProperty } from 'src/mini-libs/animated/AnimatedProperty.ts'
import { getTime } from 'src/mini-libs/animated/util.ts'
import Mapper = TypeU.Mapper
import Callback1 = TypeU.Callback1
import MapperN = TypeU.MapperN



export type AnimatedPropsFromSources<Sources extends any[]> = {
  [Prop in keyof Sources]: Prop extends number ? AnimatedProperty<Sources[Prop]> : Sources[Prop]
}
/*

export class AnimatedMultiComputed<Sources extends any[], Value> implements AnimatedProperty<Value> {
  constructor(
    readonly sources: AnimatedPropsFromSources<Sources>,
    readonly mapper: MapperN<Sources, Value>,
  ) { }
  
  finish() { this.sources.forEach(it => it.finish()) }
  get finished() { return this.sources.every(it => it.finished) }
  get whenFinished() {
    return Promise.all(this.sources.map(it => it.whenFinished)).then(() => undefined)
  }
  
  cancel() { this.sources.forEach(it => it.cancel()) }
  get canceled() { return this.sources.every(it => it.canceled) }
  get whenCanceled() {
    return Promise.all(this.sources.map(it => it.whenCanceled)).then(() => undefined)
  }
  
  get(time = getTime()): Value {
    return this.mapper(...this.sources.map(it => it.get(time)))
  }
  
  readonly update = (...values: Sources) => {
    const v = this.mapper(...values)
    for (const l of this.listeners) l(v)
  }
  
  map<Mapped>(mapper: Mapper<Value, Mapped>) {
    return new AnimatedComputed(this, mapper)
  }
  
  private listeners = new Set<Callback1<Value>>()
  onChange(listener: Callback1<Value>) {
    this.listeners.add(listener)
    if (this.listeners.size === 1) this.sources.forEach(it => it.onChange(this.update))
  }
  removeOnChange(listener: Callback1<Value>) {
    this.listeners.delete(listener)
    if (!this.listeners.size) this.sources.forEach(it => it.removeOnChange(this.update))
  }
  
}
*/

