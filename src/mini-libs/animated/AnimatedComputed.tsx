import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedProperty } from 'src/mini-libs/animated/AnimatedProperty.tsx'
import { getTime } from 'src/mini-libs/animated/util.ts'
import Mapper = TypeU.Mapper


export class AnimatedComputed<Source, Up, Value> implements AnimatedProperty<Source, Value> {
  constructor(
    private source: AnimatedProperty<Source, Up>,
    private mapper: Mapper<Up, Value>,
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
  
  map<Mapped>(mapper: Mapper<Value, Mapped>) {
    return new AnimatedComputed(this, mapper)
  }
  
}

