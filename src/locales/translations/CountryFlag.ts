import russiaFlag from '@ic/country-flag/russia-flag-icon.png'
import usaFlag from '@ic/country-flag/usa-flag-icon.jpg'
import { UiValue } from '@libs/ui-text/UiText.ts'



export const CountryFlag = {
  'en-US': usaFlag,
  'ru-RU': russiaFlag,
} satisfies UiValue<any>
