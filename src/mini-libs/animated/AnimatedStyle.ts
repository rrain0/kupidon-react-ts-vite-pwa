import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedValue } from 'src/mini-libs/animated/AnimatedValue.tsx'
import Puro = TypeU.Puro


export type AnimatedString = AnimatedValue<string>
export type AnimatedNumber = AnimatedValue<number>
export type AnimatedStringOrNumber = AnimatedString | AnimatedNumber | AnimatedValue<string | number>


export type AnimatedStyle = Puro<{
  zIndex: AnimatedStringOrNumber
  transform: AnimatedValue<string>
  scale: AnimatedStringOrNumber
  opacity: AnimatedStringOrNumber
}>
