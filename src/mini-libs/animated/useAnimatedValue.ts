import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import { AnimatedValue } from '@animated/AnimatedValue.ts'


export const useAnimatedValue = <V>(initialValue: V) => {
  const [getAnimatedValue] = useRefGetSet(new AnimatedValue({ startValue: initialValue }))
  return getAnimatedValue()
}


