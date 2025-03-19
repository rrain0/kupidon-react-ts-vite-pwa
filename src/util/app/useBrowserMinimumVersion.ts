import { useEffect } from 'react'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { Utils } from 'src/util/common/Utils.ts'
import { useBrowserMinimumVersionZustand } from 'src/zustand/app/BrowserMinimumVersionZustand.ts'
import versionToNumArr = Utils.versionToNumArr




export type BrowserVersions = {
  chromeDesktopVersion: string
  chromeAndroidVersion: string
  safariDesktopVersion: string
  safariIosVersion: string
  edgeDesktopVersion: string
}
export type BrowserFeatures = {
  chromeDesktopFeature: string
  chromeAndroidFeature: string
  safariDesktopFeature: string
  safariIosFeature: string
  edgeDesktopFeature: string
}


export const useBrowserMinimumVersion = (minimumVersions: BrowserVersions & { feature: string }) => {
  const {
    chromeDesktopVersion,
    chromeAndroidVersion,
    safariDesktopVersion,
    safariIosVersion,
    edgeDesktopVersion,
    feature,
  } = minimumVersions
  
  const state = useBrowserMinimumVersionZustand()
  const set = useBrowserMinimumVersionZustand.setState
  
  useEffect(() => {
    if (ArrayU.isGreater(versionToNumArr(chromeDesktopVersion), versionToNumArr(state.chromeDesktopVersion)))
      set({ chromeDesktopVersion, chromeDesktopFeature: feature })
  }, [chromeDesktopVersion, feature])
  
  useEffect(() => {
    if (ArrayU.isGreater(versionToNumArr(chromeAndroidVersion), versionToNumArr(state.chromeAndroidVersion)))
      set({ chromeAndroidVersion, chromeAndroidFeature: feature })
  }, [chromeAndroidVersion, feature])
  
  useEffect(() => {
    if (ArrayU.isGreater(versionToNumArr(safariDesktopVersion), versionToNumArr(state.safariDesktopVersion)))
      set({ safariDesktopVersion, safariDesktopFeature: feature })
  }, [safariDesktopVersion, feature])
  
  useEffect(() => {
    if (ArrayU.isGreater(versionToNumArr(safariIosVersion), versionToNumArr(state.safariIosVersion)))
      set({ safariIosVersion, safariIosFeature: feature })
  }, [safariIosVersion, feature])
  
  useEffect(() => {
    if (ArrayU.isGreater(versionToNumArr(edgeDesktopVersion), versionToNumArr(state.edgeDesktopVersion)))
      set({ edgeDesktopVersion, edgeDesktopFeature: feature })
  }, [edgeDesktopVersion, feature])
}