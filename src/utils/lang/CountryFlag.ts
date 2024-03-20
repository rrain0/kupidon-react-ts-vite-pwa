import russiaFlag from 'src/res/icon/country-flag/russia-flag-icon.png'
import usaFlag from 'src/res/icon/country-flag/usa-flag-icon.jpg'
import { Lang } from 'src/utils/lang/Lang'
import AppLangType = Lang.AppLangType



export const CountryFlag: Record<AppLangType, string> = {
  'en-US': usaFlag,
  'ru-RU': russiaFlag,
}
