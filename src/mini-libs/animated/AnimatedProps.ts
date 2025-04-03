import { TypeU } from '@util/common/TypeU.ts'
import { AnimatedProperty } from 'src/mini-libs/animated/AnimatedProperty.ts'
import Pu = TypeU.Pu


export type AnimatedAny = AnimatedProperty<any>
export type AnimatedString = AnimatedProperty<string>
export type AnimatedNumber = AnimatedProperty<number>
export type AnimatedStringOrNumber = AnimatedString | AnimatedNumber | AnimatedProperty<string | number>



export type AnimatedElemStyleExplicit = Pu<{
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
export type AnimatedElemStyleRest = Pu<{
  [Prop in Exclude<keyof CSSStyleDeclaration, keyof AnimatedElemStyleExplicit>]: AnimatedString
}>
export type AnimatedElemStyle = AnimatedElemStyleExplicit & AnimatedElemStyleRest



export type AnimatedImgAttrs = Pu<{
  src: AnimatedString
}>



export type AnimatedComponentState<S extends Record<string, any> = Record<string, any>> = {
  [Prop in keyof S]: AnimatedProperty<S[Prop]>
}


