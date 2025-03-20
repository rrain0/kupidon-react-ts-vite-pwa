import { Lang } from 'src/util/lang/Lang.ts'



export type UiTemplate<L extends Lang.Supported = Lang.Supported, Args extends any[] = any[]> = {
  [Lang in L]?: (...args: Args) => string
}
// Some translations have implementation only in one language, e.g., language name.
export type UiText<L extends Lang.Supported = Lang.Supported> = {
  [Lang in L]?: string
}
export type UiValue<L extends Lang.Supported = Lang.Supported, Args extends any[] = any[]>
  = UiText | UiTemplate<L, Args>



export function asUiText(text: string): UiText<'en-US'> {
  return { 'en-US': text }
}
export const emptyUiText = asUiText('')



export type UiTextValues<Keys extends string = any> = Record<Keys, UiText>
export type UiValues<Keys extends string = any> = Record<Keys, UiValue>
export type UiTextValuesArr = UiText[]
export type UiValuesArr = UiValue[]




export type PickedUiValues<V extends UiValues> = {
  [Prop in keyof V]: V[Prop][keyof V[Prop]]
}
export type PickedUiValuesArr<V extends UiValuesArr> = {
  [Index in keyof V]: Index extends number
    ? V[Index][keyof V[Index]]
    : V[Index]
}
