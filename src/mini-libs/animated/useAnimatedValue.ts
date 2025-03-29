import { AnimatedValue } from '@animated/AnimatedValue.ts'
import { useState } from 'react'


export const useAnimatedValue = <V>(initialValue: V) => {
  return useState(() => new AnimatedValue({ initialValue }))[0]
}


