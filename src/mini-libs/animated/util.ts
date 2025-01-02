

export const getTime = () => (document.timeline.currentTime as number | null) ?? 0

export type AnimationFunction<V> = (startValue: V, timeElapsed: number) => [value: V, finished: boolean]

export const passAnimationFunction = <V>(startValue: V, timeElapsed: number) => {
  return [startValue, true] as [value: V, finished: boolean]
}

export type AnimationProps<V> = {
  startValue: V,
  startTime?: number | undefined,
  animationFunction?: AnimationFunction<V> | undefined,
}
