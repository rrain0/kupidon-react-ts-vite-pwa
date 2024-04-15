import russiaFlag from '@ic/country-flag/russia-flag-icon.png'
import usaFlag from '@ic/country-flag/usa-flag-icon.jpg'
import { Lang } from '@util/lang/Lang.ts'
import AppLangType = Lang.AppLangType



export const CountryFlag: Record<AppLangType, string> = {
  'en-US': usaFlag,
  'ru-RU': russiaFlag,
}
