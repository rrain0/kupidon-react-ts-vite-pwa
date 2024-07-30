import { ArrayU } from 'src/util/common/ArrayU.ts'
import ArrayElement = ArrayU.ArrayElement




export namespace Lang {
  
  export const AllSupported = ['en-US', 'ru-RU'] as const
  
  export type Supported = ArrayElement<typeof AllSupported>
  
  export const Default: Supported = 'en-US'
  
  export const langToFullLang = {
    'en-US': 'en-US',
    'ru-RU': 'ru-RU',
    'en': 'en-US',
    'ru': 'ru-RU',
  } satisfies Record<string, Lang.Supported>
  
  
  
  export const getMatchedAppLangs = (systemLangs: string[]): Lang.Supported[] => {
    let matchedLangs = systemLangs
      .map(it => Lang.langToFullLang[it] ?? Lang.langToFullLang[it.substring(0, 2)] ?? it)
      .filter(it => Lang.AllSupported.includes(it)) as Lang.Supported[]
    matchedLangs = ArrayU.distinct(matchedLangs)
    return matchedLangs
  }
  
  
}
