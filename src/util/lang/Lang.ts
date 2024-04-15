import { ArrayUtils } from 'src/util/common/ArrayUtils.ts'
import ArrayElement = ArrayUtils.ArrayElement


export namespace Lang {
  
  export const AllSupported = ['en-US', 'ru-RU'] as const
  
  export type Supported = ArrayElement<typeof AllSupported>
  
  export const Default: Supported = 'en-US'
  
  export const Map = {
    'en-US': 'en-US',
    'ru-RU': 'ru-RU',
    'en': 'en-US',
    'ru': 'ru-RU',
  } satisfies Record<string, Lang.Supported>
  
}