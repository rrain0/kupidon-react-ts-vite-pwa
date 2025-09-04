
import { AnimatedComputed } from '@libs/animated/AnimatedComputed.ts'
import { Mapper } from 'src/utils/base/math/typeUtils.ts'
import { Callback1 } from 'src/utils/base/math/typeUtils.ts'



export interface AnimatedProperty<Value> {
  get(): Value
  map<Mapped>(mapper: Mapper<Value, Mapped>): AnimatedComputed<Value, Mapped>
  
  refresh(): void
  
  onChange(listener: Callback1<Value>): void
  removeOnChange(listener: Callback1<Value>): void
}



export type AnimatedPropertyUndefinedable<Value> =
  | AnimatedProperty<Value>
  | (Value extends undefined ? undefined : never)



export type AnimatedPropertyToValue<AP extends AnimatedProperty<any> | undefined> =
  | (AP extends AnimatedProperty<infer Value> ? Value : never)
  | (AP extends undefined ? undefined : never)



export type AnimatedPropsToValues<
  AnimProps extends readonly (AnimatedProperty<any> | undefined)[],
  OutTuple extends readonly any[] = [],
> = (
  AnimProps extends readonly [infer Curr, ...infer Rest extends readonly any[]]
    ? AnimatedPropsToValues<Rest, [...OutTuple, (
      | (Curr extends undefined ? undefined : never)
      | (Curr extends AnimatedProperty<infer Value> ? Value : never)
    )]>
    : OutTuple
)



export type AnimatedPropsFromValues<
  Sources extends readonly any[],
  OutTuple extends readonly (AnimatedProperty<any> | undefined)[] = [],
> = Sources extends readonly [infer Curr, ...infer Rest extends readonly any[]]
  ? AnimatedPropsFromValues<Rest, [...OutTuple, (
      AnimatedProperty<Curr> | (Curr extends undefined ? undefined : never)
  )]>
  : OutTuple
