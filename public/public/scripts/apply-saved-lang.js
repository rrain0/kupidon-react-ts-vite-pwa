
//console.log('apply-saved-lang - start setup')

const langSettingsLocalStorageName = 'langSettings'
{
  const Lang = {
    /** @type {Lang.Supported[]} */
    AllSupported: ['en-US', 'ru-RU'],
    Default: 'en-US',
    Map: {
      'en-US': 'en-US',
      'ru-RU': 'ru-RU',
      'en': 'en-US',
      'ru': 'ru-RU',
    },
  }
  
  /** @type {(systemLangs: string[]) => Lang.Supported[]} */
  const getMatchedLangs = (systemLangs) => {
    let matchedSystemLangs = systemLangs
      .map(it => {
        let mapped = Lang.Map[it]
        if (mapped) return mapped
        mapped = Lang.Map[it.substring(0, 2)]
        if (mapped) return mapped
        return it
      })
      .filter(it => Lang.AllSupported.includes(it))
    return matchedSystemLangs
  }
  
  ;(() => {
    const langSettings = JSON.parse(localStorage.getItem(langSettingsLocalStorageName))
      ?? {
        setting: 'system',
        manualSetting: undefined,
      }
    const matchedSystemLangs = getMatchedLangs(navigator.languages)
    
    if (langSettings.setting === 'system') {
      if (matchedSystemLangs?.length) {
        // eslint-disable-next-line no-undef
        applyLangToHtml([...matchedSystemLangs, Lang.Default])
      }
      // eslint-disable-next-line no-undef
      else applyLangToHtml([Lang.Default])
    }
    else if (langSettings.setting === 'manual') {
      // eslint-disable-next-line no-undef
      if (langSettings.manualSetting) applyLangToHtml([...langSettings.manualSetting, Lang.Default])
      // eslint-disable-next-line no-undef
      else applyLangToHtml([Lang.Default])
    }
  })()
}
//console.log('apply-saved-lang - end setup')
