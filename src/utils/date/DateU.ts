import { formatDuration, intervalToDuration, Locale } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import { Lang } from 'src/utils/app/lang/Lang'

/*
parse: https://date-fns.org/v2.0.0-alpha.6/docs/parse

example get age:
formatDuration(
  intervalToDuration({
    start: parseISO('1997-11-22T02:00:00'),
    end: new Date(),
  }),
  {
    format: ['years'],
    locale: enUS,
  }
))

*/


export namespace DateU {
  
  const appLangToDateFnsLocale: Record<Lang.Supported, Locale> = {
    'en-US': enUS,
    'ru-RU': ru,
  }
  
  
  export const getCurrentTimeZoneName = () => Intl.DateTimeFormat().resolvedOptions().timeZone
  
  
  /**
   * @param birthDate {string} date in format like '2000-08-23'
   * @returns {string} e.g. '23'
   * */
  export const age = (birthDate: string): number | undefined => {
    return intervalToDuration({
      start: new Date(birthDate),
      end: new Date(),
    }).years
  }
  
  /**
   * @param birthDate date in format like '2000-08-23'
   * @returns '23 years', '23 года'
   * */
  export const ageYears = (birthDate: string, appLang: Lang.Supported) => {
    return formatDuration(
      intervalToDuration({
        start: new Date(birthDate),
        end: new Date(),
      }),
      {
        format: ['years'],
        locale: appLangToDateFnsLocale[appLang],
      }
    )
  }
  
  
  /**
   * @param birthDate date in format like '2000-08-23'
   * @returns '23 years 11 months 30 days', '23 года 11 месяцев 30 дней'
   * */
  export const yearsMonthsDaysFromBirthDate = (birthDate: string, appLang: Lang.Supported) => {
    return formatDuration(
      intervalToDuration({
        start: new Date(birthDate),
        end: new Date(),
      }),
      {
        format: ['years', 'months', 'days'],
        locale: appLangToDateFnsLocale[appLang],
      }
    )
  }
  
}
