import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedProperty } from '@animated/AnimatedProperty.tsx'
import Puro = TypeU.Puro


export type AnimatedString = AnimatedProperty<string>
export type AnimatedNumber = AnimatedProperty<number>
export type AnimatedStringOrNumber = AnimatedString | AnimatedNumber | AnimatedProperty<string | number>


export type AnimatedStyle = Puro<{
  zIndex: AnimatedStringOrNumber
  transform: AnimatedProperty<string>
  scale: AnimatedStringOrNumber
  opacity: AnimatedStringOrNumber
}>
