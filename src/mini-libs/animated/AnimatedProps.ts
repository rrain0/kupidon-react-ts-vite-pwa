import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedProperty } from 'src/mini-libs/animated/AnimatedProperty.ts'
import Puro = TypeU.Puro


export type AnimatedAny = AnimatedProperty<any>
export type AnimatedString = AnimatedProperty<string>
export type AnimatedNumber = AnimatedProperty<number>
export type AnimatedStringOrNumber = AnimatedString | AnimatedNumber | AnimatedProperty<string | number>


export type AnimatedElemStyle = Puro<{
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


export type AnimatedImgAttrs = Puro<{
  src: AnimatedString
}>


export type AnimatedComponentState<S extends Record<string, any> = Record<string, any>> = {
  [Prop in keyof S]: AnimatedProperty<S[Prop]>
}


