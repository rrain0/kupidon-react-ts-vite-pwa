import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedProperty } from '@animated/AnimatedProperty.tsx'
import Puro = TypeU.Puro


export type AnimatedString = AnimatedProperty<any, string>
export type AnimatedNumber = AnimatedProperty<any, number>
export type AnimatedStringOrNumber = AnimatedString | AnimatedNumber | AnimatedProperty<any, string | number>


export type StyleAnimatedProp = Puro<{
  zIndex: AnimatedStringOrNumber
  transform: AnimatedProperty<any, string>
  scale: AnimatedStringOrNumber
  opacity: AnimatedStringOrNumber
}>


export type ImgAnimatedProps = Puro<{
  src: AnimatedString
}>


