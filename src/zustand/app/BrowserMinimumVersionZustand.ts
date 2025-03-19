import { BrowserFeatures, BrowserVersions } from 'src/util/app/useBrowserMinimumVersion.ts'
import { create } from 'zustand'



export type BrowserMinimumVersionZustand = BrowserVersions & BrowserFeatures



export const useBrowserMinimumVersionZustand = create<BrowserMinimumVersionZustand>()(
  (set, get, store) => ({
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
  })
)


