import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedProperty } from 'src/mini-libs/animated/AnimatedProperty.ts'
import Mapper = TypeU.Mapper
import Callback1 = TypeU.Callback1



export class AnimatedComputed<Source, Value> implements AnimatedProperty<Value> {
  
  private cachedValue!: Value
  
  constructor(
    readonly source: AnimatedProperty<Source>,
    readonly mapper: Mapper<Source, Value>,
  ) {
    this.fetchUpdate()
  }
  
  get(): Value { return this.cachedValue }
  
  map<Mapped>(mapper: Mapper<Value, Mapped>) {
    return new AnimatedComputed<Value, Mapped>(this, mapper)
  }
  
  
  fetchUpdate() {
    this.cachedValue = this.mapper(this.source.get())
  }
  
  readonly update = (value: Source) => {
    this.cachedValue = this.mapper(value)
  }
  
  refresh() {
    for (const l of this.listeners) l(this.get())
  }
  
  readonly updateAndRefresh = (value: Source) => {
    this.update(value)
    this.refresh()
  }
  
  
  private listeners = new Set<Callback1<Value>>()
  
  onChange(listener: Callback1<Value>) {
    this.listeners.add(listener)
    if (this.listeners.size === 1) this.source.onChange(this.updateAndRefresh)
  }
  
  removeOnChange(listener: Callback1<Value>) {
    this.listeners.delete(listener)
    if (!this.listeners.size) this.source.removeOnChange(this.updateAndRefresh)
  }
  
}

