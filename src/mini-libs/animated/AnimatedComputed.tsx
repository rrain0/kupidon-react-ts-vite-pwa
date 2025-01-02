import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedProperty } from 'src/mini-libs/animated/AnimatedProperty.tsx'
import { getTime } from 'src/mini-libs/animated/util.ts'
import Mapper = TypeU.Mapper


export class AnimatedComputed<S, V> implements AnimatedProperty<V> {
  constructor(
    private source: AnimatedProperty<S>,
    private mapper: Mapper<S, V>,
  ) { }
  
  get(time = getTime()): V {
    return this.mapper(this.source.get(time))
  }
  
  map<R>(mapper: Mapper<V, R>) {
    return new AnimatedComputed(this, mapper)
  }
  
}

