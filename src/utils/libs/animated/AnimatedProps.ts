
import {
  AnimatedProperty,
  AnimatedPropertyUndefinedable,
} from '@libs/animated/AnimatedProperty.ts'
import { Pu } from 'src/utils/base/math/typeUtils.ts'



export type AnimatedString = AnimatedProperty<string>
export type AnimatedNumber = AnimatedProperty<number>
export type AnimatedUndef = AnimatedProperty<undefined>

export type AnimatedStringOrUndef =
  AnimatedString | AnimatedUndef | AnimatedProperty<string | undefined>
export type AnimatedNumberOrUndef =
  AnimatedNumber | AnimatedUndef | AnimatedProperty<number | undefined>

export type AnimatedStringOrNumberOrUndef =
  | AnimatedStringOrUndef
  | AnimatedNumberOrUndef
  | AnimatedProperty<string | number>
  | AnimatedProperty<string | number | undefined>



export type AnimatedElemStyleExplicit = Pu<{
  transform: AnimatedStringOrUndef
  translate: AnimatedStringOrUndef
  rotate: AnimatedStringOrUndef
  scale: AnimatedStringOrNumberOrUndef
  opacity: AnimatedStringOrNumberOrUndef
  
  top: AnimatedStringOrUndef
  right: AnimatedStringOrUndef
  bottom: AnimatedStringOrUndef
  left: AnimatedStringOrUndef
  zIndex: AnimatedStringOrNumberOrUndef
}>
export type AnimatedElemStyleRest = Pu<{
  [Prop in Exclude<keyof CSSStyleDeclaration, keyof AnimatedElemStyleExplicit>]: AnimatedStringOrUndef
}>
export type AnimatedElemStyle = AnimatedElemStyleExplicit & AnimatedElemStyleRest


// TODO Animated - try AnimatedElemStyleBatch


export type AnimatedElemAttrs = Record<string, AnimatedStringOrUndef>



export type AnimatedComponentState<S extends Record<string, any> = Record<string, any>> = {
  [Prop in keyof S]: AnimatedPropertyUndefinedable<S[Prop]>
}


