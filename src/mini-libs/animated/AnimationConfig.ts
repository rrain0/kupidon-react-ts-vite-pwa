import { TypeU } from '@util/common/TypeU.ts'
import Callback1 = TypeU.Callback1
import Pu = TypeU.Pu



/**
 * @param time - time elapsed from animation start from zero in ms
 * @param data - custom data saved during animation
 */
export type AnimationFunParams<V, D = undefined> = {
  startValue: V
  time: number
} & (D extends undefined ? { data?: D } : { data: D })

export type AnimationFunResult<V, D = undefined> = {
  value: V
  finished?: boolean | undefined
} & (D extends undefined ? { data?: D } : { data: D })

export type AnimationFun<V, D = undefined> = (params: AnimationFunParams<V, D>) => AnimationFunResult<V, D>




export type AnimationConfigOnUpdateParams<V> = {
  value: V
  finished?: boolean | undefined
}

export type AnimationConfig<V, D = undefined> = Pu<{
  startValue: V
  startTime: number
}> & (D extends undefined ? { initialData?: D } : { initialData: D }) & {
  animationFun: AnimationFun<V, D>
  
  onUpdate?: Callback1<AnimationConfigOnUpdateParams<V>> | undefined
}