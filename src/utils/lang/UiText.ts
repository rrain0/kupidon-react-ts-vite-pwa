import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { Lang } from 'src/utils/lang/Lang'
import ArrayElement = ArrayUtils.ArrayElement
import AppLangType = Lang.AppLangType





export type UiText<V extends string> = {
  value: V
  lang: AppLangType
  text: string
}
export type UiTemplate<V extends string, Args extends any[]> = {
  value: V
  lang: AppLangType
  text: (...args: Args)=>string
}



export type UiValue<V extends string, Args extends any[]>
  = UiText<V> | UiTemplate<V,Args>



export type UiTextValues<Keys extends string = any> = Record<Keys, UiText<any>[]>
export type UiValues<Keys extends string = any> = Record<Keys, UiValue<any,any>[]>



export type PickedUiValues<V extends UiValues>
  = { [Prop in keyof V]: ArrayElement<V[Prop]> }



export const UndefinedUiText: UiText<'undefined'> = {
  value: 'undefined',
  lang: 'en-US',
  text: 'undefined',
}
export const UndefinedUiTemplate: UiTemplate<'undefined',any[]> = {
  value: 'undefined',
  lang: 'en-US',
  text: ()=>'undefined',
}







{
  // usage example:
  const theme = [
    {
      value: 'lightTheme',
      lang: 'en-US',
      text: 'Light theme',
    },{
      value: 'lightTheme',
      lang: 'ru-RU',
      text: 'Светлая тема',
    }
  ] satisfies UiText<'lightTheme'>[]
}


