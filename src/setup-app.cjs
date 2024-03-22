console.log('setup app script: start setup')


/** @type {readonly ['en-US','ru-RU']} */
const AllAppLangs = ['en-US','ru-RU']
/**
 * @type {{
 *   readonly eng: 'en-US',
 *   readonly us: 'ru-RU',
 * }}
 * */
const AppLangEnum = /** @type {const} */ ({
  eng: 'en-US',
  rus: 'ru-RU',
})



/** @type {(langs: AllAppLangs | string[])=>void} */
const setHtmlTags = (langs)=>{
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
    nodeEnv: MODE==='production' ? 'production' : 'development',
    publicUrl: BASE_URL,
    lang: "en-US",
    title: "Kupidon",
    description: "Kupidon date app",
  }
  if (AllAppLangs.includes(langs?.[0])) {
    htmlProps.lang = langs[0]
    
    const textPrefix = htmlProps.nodeEnv==='development' ? 'Dev ' : ''
    
    /** @type {UiText<'kupidon'>[]} */
    const AppTitles = [
      {
        value: 'kupidon',
        lang: 'en-US',
        text: 'Kupidon',
      },{
        value: 'kupidon',
        lang: 'ru-RU',
        text: 'Купидон',
      },
    ]
    /** @type {UiText<'kupidonDescription'>[]} */
    const AppDescriptions = [
      {
        value: 'kupidonDescription',
        lang: 'en-US',
        text: 'Kupidon date app',
      },{
        value: 'kupidonDescription',
        lang: 'ru-RU',
        text: 'Купидон - приложение для свидания',
      },
    ]
    
    /** @type {<T>(uiTextValues: readonly UiText<T>[], langs: string[])=>UiText<T>}*/
    const prepareUiText = (uiTextValues, langs)=>{
      const used = new Set()
      return [...uiTextValues]
        .sort((a,b)=>{
          if (a.value===b.value) {
            let langIdxA = langs.findIndex(it=>it===a.lang)
            let langIdxB = langs.findIndex(it=>it===b.lang)
            if (langIdxA===-1) langIdxA = langs.length
            if (langIdxB===-1) langIdxB = langs.length
            return langIdxA - langIdxB
          }
          return 0
        })
        .filter(it=>{
          if (used.has(it.value)) return false
          used.add(it.value)
          return true
        })
        [0]
    }
    
    htmlProps.title = textPrefix + prepareUiText(AppTitles,langs).text
    htmlProps.description = textPrefix + prepareUiText(AppDescriptions,langs).text
  }
  
  const html = document.documentElement
  html.lang = htmlProps.lang
  
  document.title = htmlProps.title
  
  const htmlDescription = document.querySelector('html head meta[name=description]')
  htmlDescription.content = htmlProps.description
  
  const manifestSearchParams = new URLSearchParams({
    nodeEnv: htmlProps.nodeEnv,
    lang: htmlProps.lang,
  }).toString()
  let manifestUrl = htmlProps.publicUrl + "manifest.json"
  if (manifestSearchParams) manifestUrl += '?' + manifestSearchParams
  
  const linkManifest = document.querySelector('html>head>link[rel=manifest]')
  linkManifest.href = manifestUrl
}






const langSettingsName = 'langSettings'
{
  const langSettings = JSON.parse(localStorage.getItem(langSettingsName))
  if (langSettings?.setting==='manual' && langSettings.manualSetting){
    setHtmlTags(langSettings.manualSetting)
  } else {
    
    /** @type {()=>string[]} */
    const getLangs = ()=>{
      let browserLangs = navigator.languages
      if ((!browserLangs || !browserLangs.length) && navigator.language)
        browserLangs = [navigator.language]
      if (!browserLangs || !browserLangs.length) browserLangs = undefined
      browserLangs = browserLangs?.map(it=>{
        if (it.startsWith('en')) return 'en-US'
        if (it.startsWith('ru')) return 'ru-RU'
        return it
      })
      return browserLangs
    }
    
    let langs = getLangs().filter(it=>AllAppLangs.includes(it))
    langs = [...langs,'en-US']
    
    setHtmlTags(langs)
  }
}








/*
https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Trigger_install_prompt
BeforeInstallEvent отправляется браузером, если он определил, что сайт можно установить как PWA.
При первой отправке эвента, браузер показывает свой UI с предолжением установки (его отключаем ev.preventDefault()).
Запрос на установку из эвента можно вызвать только 1 раз, дальше нужен новый эвент.
При отклонении запроса на установку, браузер сразу же отправляет новый эвент.
*/


/**
 * @typedef {
 * {
 *   outcome: 'dismissed',
 *   platform: '',
 * } | {
 *   outcome: 'accepted',
 *   platform: 'web'
 * }
 * } InstallationUserChoice
 */
/**
 * @typedef {{
 *   readonly platforms: string[],
 *   readonly userChoice: Promise<InstallationUserChoice>,
 *   prompt(): Promise<InstallationUserChoice>,
 * }} BeforeInstallPromptEvent
 * @extends Event
 */


/** @type {BeforeInstallPromptEvent | undefined} */
let beforeInstallPromptEvent
/** @type {((ev: BeforeInstallPromptEvent|undefined)=>void) | undefined} */
let onBeforeInstallPromptEvent
/** @type {(ev: BeforeInstallPromptEvent|undefined)=>void} */
const setBeforeInstallPromptEvent = ev=>{
  beforeInstallPromptEvent = ev
  onBeforeInstallPromptEvent?.(beforeInstallPromptEvent)
}
/** @type {()=>Promise<InstallationUserChoice|undefined>} */
const promptInstall = ()=>{
  const ev = beforeInstallPromptEvent
  setBeforeInstallPromptEvent(undefined)
  return ev?.prompt()
}
window.addEventListener('beforeinstallprompt', async ev=>{
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getInstalledRelatedApps
  const relatedApps = await navigator.getInstalledRelatedApps?.() // => { id, platform, url, version }[]
  // Search for a specific installed platform-specific app
  ev.preventDefault()
  //console.log('relatedApps',relatedApps)
  if (!relatedApps?.length) setBeforeInstallPromptEvent(ev)
})
window.addEventListener('appinstalled', ev=>{
  setBeforeInstallPromptEvent(undefined)
})




console.log('setup app script: end setup')