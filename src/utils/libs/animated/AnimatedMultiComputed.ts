import { TypeU } from 'src/utils/base/TypeU.ts'
import { AnimatedComputed } from '@libs/animated/AnimatedComputed.ts'
import {
  AnimatedProperty, AnimatedPropsFromValues, AnimatedPropsToValues,
} from '@libs/animated/AnimatedProperty.ts'
import Mapper = TypeU.Mapper
import Callback1 = TypeU.Callback1
import MapperN = TypeU.MapperN







// TODO Animated - if multiple sources change, then there will be multiple updates.
//  Need to wait until all values are fresh then update at once.

export class AnimatedMultiComputed<const Sources extends any[], const Value> 
implements AnimatedProperty<Value> {
  
  private cachedValue!: Value
  
  constructor(
    readonly sources: AnimatedPropsFromValues<Sources>,
    readonly mapper: MapperN<Sources, Value>,
  ) {
    this.fetchUpdate()
  }
  
  get(): Value { return this.cachedValue }
  
  map<Mapped>(mapper: Mapper<Value, Mapped>): AnimatedComputed<Value, Mapped> {
    return new AnimatedComputed<Value, Mapped>(this, mapper)
  }
  
  
  fetchUpdate() {
    this.cachedValue = this.mapper(
      ...this.sources.map((s: undefined | AnimatedProperty<any>) => s?.get()) as Sources
    )
  }
  
  readonly update = (values: Sources) => {
    this.cachedValue = this.mapper(...values)
  }
  
  refresh() {
    for (const l of this.listeners) l(this.get())
  }
  
  readonly updateAndRefresh = (values: Sources) => {
    this.update(values)
    this.refresh()
  }
  
  readonly updateAndRefreshMulti = () => {
    this.fetchUpdate()
    this.refresh()
  }
  
  
  private listeners = new Set<Callback1<Value>>()
  
  onChange(listener: Callback1<Value>) {
    this.listeners.add(listener)
    if (this.listeners.size === 1) {
      this.sources.forEach(
        (s: undefined | AnimatedProperty<any>) => s?.onChange(this.updateAndRefreshMulti)
      )
    }
  }
  
  removeOnChange(listener: Callback1<Value>) {
    this.listeners.delete(listener)
    if (!this.listeners.size) {
      this.sources.forEach(
        (s: undefined | AnimatedProperty<any>) => s?.removeOnChange(this.updateAndRefreshMulti)
      )
    }
  }
  
}





export const animatedMapMulti = <
  const AnimProps extends (AnimatedProperty<any> | undefined)[],
  Value,
>(
  animatedProps: AnimProps,
  mapper: MapperN<AnimatedPropsToValues<AnimProps>, Value>,
) => {
  return new AnimatedMultiComputed<AnimatedPropsToValues<AnimProps>, Value>(
    // @ts-expect-error
    animatedProps,
    mapper,
  )
}

