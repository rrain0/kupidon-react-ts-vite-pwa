import { Lang } from 'src/recoil/state/LangRecoil'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import NonEmptyArr = ArrayUtils.NonEmptyArr



declare global {
  
  const setHtmlTags: (langs: NonEmptyArr<Lang>)=>void
  
  
  
  type InstallationUserChoice = {
    outcome: 'dismissed'
    platform: ''
  } | {
    outcome: 'accepted'
    platform: 'web'
  }
  
  // https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
  class BeforeInstallPromptEvent extends Event {
    
    // Returns an array of string items containing the platforms on which the event was dispatched.
    // This is provided for user agents that want to present a choice of versions
    // to the user such as, for example, "web" or "play" which would allow the user
    // to choose between a web version or an Android version.
    readonly platforms: string[]
    
    // Returns a Promise that resolves to an object describing the user's choice when
    // they were prompted to install the app.
    readonly userChoice: Promise<InstallationUserChoice>
    
    // Show a prompt asking the user if they want to install the app. This method returns a
    // Promise that resolves to an object describing the user's choice
    // when they were prompted to install the app.
    prompt(): Promise<InstallationUserChoice>
    
  }
  
  
  
  type AllAppLangsType = ['en-US','ru-RU']
  const AllAppLangs: AllAppLangsType
  type AppLangEnumType = {
    readonly eng: 'en-US',
    readonly rus: 'ru-RU',
  }
  const AppLangEnum: AppLangEnumType
  
  
  
  const langSettingsName: string
  let beforeInstallPromptEvent: BeforeInstallPromptEvent | undefined
  let onBeforeInstallPromptEvent: ((ev: BeforeInstallPromptEvent|undefined)=>void) | undefined
  const setBeforeInstallPromptEvent: (ev: BeforeInstallPromptEvent|undefined)=>void
  const promptInstall: ()=>Promise<InstallationUserChoice|undefined>
  
  
}