import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import { AnimatedValue } from 'src/mini-libs/animated/AnimatedValue.tsx'


export const useAnimatedValue = <V>(initialValue: V) => {
  const [getAnimatedValue, setAnimatedValue] = useRefGetSet(new AnimatedValue(initialValue))
  getAnimatedValue().removeAllOnChange()
  return getAnimatedValue()
}


