import { ArrayUtils } from 'src/util/common/ArrayUtils.ts'
import ArrayElement = ArrayUtils.ArrayElement



// It is defined in public/index.html & src/setup-app.d.ts

type HtmlAppLangsType = AllAppLangsType
const HtmlAllAppLangs = AllAppLangs

type HtmlAppLangEnumType = AppLangEnumType
const HtmlAppLangEnum = AppLangEnum




export namespace Lang {
  
  export type AppLangsType = HtmlAppLangsType
  export const AllAppLangs = HtmlAllAppLangs
  
  export type AppLangEnumType = HtmlAppLangEnumType
  export const AppLangEnum = HtmlAppLangEnum
  
  export type AppLangType = ArrayElement<AppLangsType>
  
  export const AppLangsMap = {
    'en-US': 'en-US',
    'ru-RU': 'ru-RU',
    'en': 'en-US',
    'ru': 'ru-RU',
  } satisfies Record<string, AppLangType>
  
  export const DefaultAppLang = AppLangEnum.eng
  
}