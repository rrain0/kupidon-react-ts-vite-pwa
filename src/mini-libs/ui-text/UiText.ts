import { Lang } from 'src/util/lang/Lang.ts'


export type UiText<L extends Lang.Supported = Lang.Supported> = {
  [Lang in L]?: string
}
export type UiTemplate<L extends Lang.Supported = Lang.Supported, Args extends any[] = any[]> = {
  [Lang in L]?: (...args: Args)=>string
}


export function asUiText(text: string): UiText<'en-US'> {
  return { 'en-US': text }
}


export type UiValue<L extends Lang.Supported = Lang.Supported, Args extends any[] = any[]>
  = UiText | UiTemplate<L, Args>



export type UiTextValues<Keys extends string = any> = Record<Keys, UiText>
export type UiValues<Keys extends string = any> = Record<Keys, UiValue>




export type PickedUiValues<V extends UiValues>
  = { [Prop in keyof V]: V[Prop][keyof V[Prop]] }
