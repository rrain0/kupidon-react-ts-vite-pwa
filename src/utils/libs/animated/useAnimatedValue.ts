import { AnimatedValue } from '@animated/AnimatedValue.ts'
import { useState } from 'react'


export const useAnimatedValue = <V>(initialValue: V) => {
  const [animatedValue] = useState(() => new AnimatedValue(initialValue))
  return animatedValue // stable
}


