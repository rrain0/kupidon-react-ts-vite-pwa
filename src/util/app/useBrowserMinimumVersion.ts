import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import {
  BrowserMinimumVersionRecoil,
} from 'src/recoil/state/BrowserMinimumVersionRecoil.ts'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { ObjectU } from 'src/util/common/ObjectU.ts'
import { Utils } from 'src/util/common/Utils.ts'
import destructCopyBy = ObjectU.destructCopyBy
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


export const useBrowserMinimumVersion = (minimumVersions: BrowserVersions & { feature: string })=>{
  const {
    chromeDesktopVersion,
    chromeAndroidVersion,
    safariDesktopVersion,
    safariIosVersion,
    edgeDesktopVersion,
    feature,
  } = minimumVersions
  
  const [state, set] = useRecoilState(BrowserMinimumVersionRecoil)
  
  useEffect(()=>{
    if (ArrayU.isGreater(versionToNumArr(chromeDesktopVersion), versionToNumArr(state.chromeDesktopVersion)))
      set(destructCopyBy({ chromeDesktopVersion, chromeDesktopFeature: feature }))
  }, [chromeDesktopVersion, feature])
  
  useEffect(()=>{
    if (ArrayU.isGreater(versionToNumArr(chromeAndroidVersion), versionToNumArr(state.chromeAndroidVersion)))
      set(destructCopyBy({ chromeAndroidVersion, chromeAndroidFeature: feature }))
  }, [chromeAndroidVersion, feature])
  
  useEffect(()=>{
    if (ArrayU.isGreater(versionToNumArr(safariDesktopVersion), versionToNumArr(state.safariDesktopVersion)))
      set(destructCopyBy({ safariDesktopVersion, safariDesktopFeature: feature }))
  }, [safariDesktopVersion, feature])
  
  useEffect(()=>{
    if (ArrayU.isGreater(versionToNumArr(safariIosVersion), versionToNumArr(state.safariIosVersion)))
      set(destructCopyBy({ safariIosVersion, safariIosFeature: feature }))
  }, [safariIosVersion, feature])
  
  useEffect(()=>{
    if (ArrayU.isGreater(versionToNumArr(edgeDesktopVersion), versionToNumArr(state.edgeDesktopVersion)))
      set(destructCopyBy({ edgeDesktopVersion, edgeDesktopFeature: feature }))
  }, [edgeDesktopVersion, feature])
}