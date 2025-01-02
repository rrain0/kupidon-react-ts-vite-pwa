import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import { AnimatedValue } from '@animated/AnimatedValue.tsx'


export const useAnimatedValue = <V>(initialValue: V) => {
  const [getAnimatedValue, setAnimatedValue] = useRefGetSet(new AnimatedValue({ startValue: initialValue }))
  //getAnimatedValue().removeAllOnChange()
  return getAnimatedValue()
}


