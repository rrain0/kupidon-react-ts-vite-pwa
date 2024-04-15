import { BrowserFeatures, BrowserVersions } from '@util/react/useBrowserMinimumVersion.ts'
import { atom } from 'recoil'




const Default: BrowserVersions & BrowserFeatures = {
  chromeDesktopVersion: '0',
  chromeAndroidVersion: '0',
  safariDesktopVersion: '0',
  safariIosVersion: '0',
  edgeDesktopVersion: '0',
  
  chromeDesktopFeature: '',
  chromeAndroidFeature: '',
  safariDesktopFeature: '',
  safariIosFeature: '',
  edgeDesktopFeature: '',
}
export const BrowserMinimumVersionRecoil = atom<BrowserVersions & BrowserFeatures>({
  key: 'browserMinimumVersion',
  default: Default,
})