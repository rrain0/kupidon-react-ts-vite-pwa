/**
 * @param timeElapsed - ms
 */
export type AnimationFunction<V> = (startValue: V, timeElapsed: number) => [value: V, finished: boolean]

export const passAnimationFunction = <V>(startValue: V, timeElapsed: number) => {
  return [startValue, true] as [value: V, finished: boolean]
}



