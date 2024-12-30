
//console.log('apply-lang-to-html - start setup')

/** @type {(matchedLangs: NonEmptyArr<Lang.Supported>)=>void} */
const applyLangToHtml = (matchedLangs) => {
  
  const defaultLang = 'en-US'
  /** @type {UiText} */
  const AppTitles = {
    'en-US': 'Kupidon - date app',
    'ru-RU': 'Купидон - приложение для свиданий',
  }
  /** @type {UiText} */
  const AppDescriptions = {
    'en-US': 'Kupidon - date app',
    'ru-RU': 'Купидон - приложение для свиданий',
  }
  
  /**
   * @type {{
   *  nodeEnv: 'development'|'production',
   *  publicUrl: string,
   *  description: string,
   *  lang: string,
   *  title: string
   * }}
   */
  const htmlProps = {
    // eslint-disable-next-line no-undef
    nodeEnv: MODE === 'production' ? 'production' : 'development',
    // eslint-disable-next-line no-undef
    publicUrl: BASE_URL,
    lang: defaultLang,
    title: AppTitles[defaultLang],
    description: AppDescriptions[defaultLang],
  }
  
  /** @type {<V extends UiValue<any>>(uiValue: V, langs: string[]) => V[keyof V]} */
  const pickUiValue =
    (uiValue, langs) => {
      // Some settings have implementation only in one language, e.g., language name.
      return Object.entries(uiValue)
        .toSorted(([a], [b]) => {
          let aIdx = langs.findIndex(it => it === a)
          let bIdx = langs.findIndex(it => it === b)
          if (aIdx === -1) aIdx = langs.length
          if (bIdx === -1) bIdx = langs.length
          return aIdx - bIdx
        })
        [0][1]
    }
  
  htmlProps.lang = matchedLangs[0]
  
  const textPrefix = htmlProps.nodeEnv === 'development' ? 'Dev ' : ''
  htmlProps.title = textPrefix + pickUiValue(AppTitles, matchedLangs)
  htmlProps.description = textPrefix + pickUiValue(AppDescriptions, matchedLangs)
  
  const html = document.documentElement
  html.lang = htmlProps.lang
  
  document.title = htmlProps.title
  
  const htmlDescription = document.querySelector('html head meta[name=description]')
  htmlDescription.content = htmlProps.description
  
  const manifestSearchParams = new URLSearchParams({
    nodeEnv: htmlProps.nodeEnv,
    lang: htmlProps.lang,
  }).toString()
  let manifestUrl = htmlProps.publicUrl + 'manifest.json'
  if (manifestSearchParams) manifestUrl += '?' + manifestSearchParams
  
  const linkManifest = document.querySelector('html>head>link[rel=manifest]')
  linkManifest.href = manifestUrl
}
//console.log('apply-lang-to-html - end setup')
