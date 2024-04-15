import { Lang } from 'src/util/lang/Lang.ts'



export type UiText = {
  [lang: Lang.Supported]: string
}
export type UiTemplate<Args extends any[]> = {
  [lang: Lang.Supported]: (...args: Args)=>string
}



export type UiValue<Args extends any[]> = UiText | UiTemplate<Args>



export type UiTextValues<Keys extends string = any> = Record<Keys, UiText>
export type UiValues<Keys extends string = any> = Record<Keys, UiValue<any>>




export type PickedUiValues<V extends UiValues>
  = { [Prop in keyof V]: V[Prop][keyof V[Prop]] }