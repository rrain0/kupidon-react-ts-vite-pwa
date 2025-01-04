import { AnimationFunction } from 'src/mini-libs/animated/animationFunciton.ts'


// currentTime in ms
export const getTime = () => (document.timeline.currentTime as number | null) ?? 0


export type AnimationProps<V> = {
  startValue: V,
  startTime?: number | undefined,
  animationFunction?: AnimationFunction<V> | undefined,
}
