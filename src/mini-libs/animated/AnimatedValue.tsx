import { ArrayU } from '@util/common/ArrayU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Callback1 = TypeU.Callback1
import Mapper = TypeU.Mapper


export class AnimatedValue<V> {
  constructor(private value: V) { }
  
  private listeners: Callback1<V>[] = []
  
  get() { return this.value }
  
  set(value: V) {
    this.value = value
    this.notify()
  }
  
  onChange(listener: Callback1<V>) {
    this.listeners.push(listener)
  }
  
  removeOnChange(listener: Callback1<V>) {
    ArrayU.remove(this.listeners, listener)
  }
  
  removeAllOnChange() {
    ArrayU.clear(this.listeners)
  }
  
  private notify() {
    this.listeners.forEach(it => it(this.value))
  }
  
  map<R>(mapper: Mapper<V, R>) {
    const result = new AnimatedValue(mapper(this.value))
    const listener = (v: V) => result.set(mapper(v))
    // TODO - need to remove old listeners
    this.onChange(listener)
    return result
  }
  
}

