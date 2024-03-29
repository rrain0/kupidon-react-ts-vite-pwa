import russiaFlag from '@res/icon/country-flag/russia-flag-icon.png'
import usaFlag from '@res/icon/country-flag/usa-flag-icon.jpg'
import { Lang } from 'src/ui/lang/Lang.ts'
import AppLangType = Lang.AppLangType



export const CountryFlag: Record<AppLangType, string> = {
  'en-US': usaFlag,
  'ru-RU': russiaFlag,
}
