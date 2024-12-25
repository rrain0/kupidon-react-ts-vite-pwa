



//console.log('app-installation-check - start setup')

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
const setBeforeInstallPromptEvent = ev => {
  beforeInstallPromptEvent = ev
  onBeforeInstallPromptEvent?.(beforeInstallPromptEvent)
}
/** @type {()=>Promise<InstallationUserChoice|undefined>} */
const promptInstall = () => {
  const ev = beforeInstallPromptEvent
  setBeforeInstallPromptEvent(undefined)
  return ev?.prompt()
}
window.addEventListener('beforeinstallprompt', async ev => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getInstalledRelatedApps
  const relatedApps = await navigator.getInstalledRelatedApps?.() // => { id, platform, url, version }[]
  // Search for a specific installed platform-specific app
  ev.preventDefault()
  //console.log('relatedApps',relatedApps)
  if (!relatedApps?.length) setBeforeInstallPromptEvent(ev)
})
window.addEventListener('appinstalled', ev => {
  setBeforeInstallPromptEvent(undefined)
})



//console.log('app-installation-check - end setup')
