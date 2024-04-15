import { Lang } from 'src/util/lang/Lang.ts'


export type UiText<L extends Lang.Supported = Lang.Supported> = {
  [L in Lang.Supported]?: string
}
export type UiTemplate<L extends Lang.Supported = Lang.Supported, Args extends any[] = any[]> = {
  [L in Lang.Supported]?: (...args: Args)=>string
}



export type UiValue<L extends Lang.Supported = Lang.Supported, Args extends any[] = any[]>
  = UiText | UiTemplate<L, Args>



export type UiTextValues<Keys extends string = any> = Record<Keys, UiText>
export type UiValues<Keys extends string = any> = Record<Keys, UiValue>




export type PickedUiValues<V extends UiValues>
  = { [Prop in keyof V]: V[Prop][keyof V[Prop]] }