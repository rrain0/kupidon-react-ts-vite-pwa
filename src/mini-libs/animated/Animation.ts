


/**
 * @param time - time elapsed from animation start from zero in ms
 * @param data - custom data saved during animation
 */
export type AnimationFunParams<V> = {
  startValue: V
  time: number
}
export type AnimationFunResult<V> = {
  value: V
  finished?: boolean | undefined
}
export type AnimationFun<V> = (params: AnimationFunParams<V>) => AnimationFunResult<V>



export type AnimationFunParamsWithData<V, D> = AnimationFunParams<V> & {
  data: D
}
export type AnimationFunResultWithData<V, D> = AnimationFunResult<V> & {
  data: D
}
export type AnimationFunWithData<V, D> =
  (params: AnimationFunParamsWithData<V, D>) => AnimationFunResultWithData<V, D>



export type Animation<V, D> = {
  startValue: V
  startTime?: number | undefined
} & (
  D extends undefined
    ? {
      initialData?: undefined
      animationFun: AnimationFun<V>
    }
    : {
      initialData: D
      animationFun: AnimationFunWithData<V, D>
    }
)