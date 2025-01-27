import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedProperty } from 'src/mini-libs/animated/AnimatedProperty.ts'
import Puro = TypeU.Puro


export type AnimatedString = AnimatedProperty<any, string>
export type AnimatedNumber = AnimatedProperty<any, number>
export type AnimatedStringOrNumber = AnimatedString | AnimatedNumber | AnimatedProperty<any, string | number>


export type StyleAnimatedProp = Puro<{
  transform: AnimatedString
  translate: AnimatedString
  rotate: AnimatedString
  scale: AnimatedStringOrNumber
  opacity: AnimatedStringOrNumber
  
  top: AnimatedString
  right: AnimatedString
  bottom: AnimatedString
  left: AnimatedString
  zIndex: AnimatedStringOrNumber
}>


export type ImgAnimatedProps = Puro<{
  src: AnimatedString
}>


