


export namespace Lang {
  
  export type SupportedLangs = 'en-US'|'ru-RU'
  
  export const Default: SupportedLangs = 'en-US'
  
  export const LangsMap = {
    'en-US': 'en-US',
    'ru-RU': 'ru-RU',
    'en': 'en-US',
    'ru': 'ru-RU',
  } satisfies Record<string, SupportedLangs>
  
}