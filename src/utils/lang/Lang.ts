import { ArrayUtils } from 'src/utils/common/ArrayUtils'
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
  
  export const DefaultAppLang = AppLangEnum.eng
  
}