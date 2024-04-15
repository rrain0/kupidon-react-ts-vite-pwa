import { ArrayUtils } from '@util/common/ArrayUtils.ts'
import { Utils } from '@util/common/Utils.ts'
import React, { useMemo } from 'react'
import * as device from 'react-device-detect'
import { useRecoilValue } from 'recoil'
import { BrowserMinimumVersionRecoil } from 'src/recoil/state/BrowserMinimumVersionRecoil.ts'
import versionToNumArr = Utils.versionToNumArr



export type CheckBrowserMinimumVersionProps = {
  children: React.ReactNode
}
const CheckBrowserMinimumVersion =
React.memo(
({ children }: CheckBrowserMinimumVersionProps)=>{
  const minimumVersions = useRecoilValue(BrowserMinimumVersionRecoil)
  
  const deviceFullVersion = useMemo(
    ()=>versionToNumArr(device.fullBrowserVersion),
    [device.fullBrowserVersion]
  )
  
  /* console.log({
    deviceFullVersion,
    edgeDesktopVersion: versionToNumberArray(minimumVersions.edgeDesktopVersion),
  }) */
  
  
  if (device.isChrome && device.isDesktop) {
    if (ArrayUtils.isLower(deviceFullVersion, versionToNumArr(minimumVersions.chromeDesktopVersion)))
      return <ErrorMessage
        browserName="Chrome Desktop"
        minimumVersion={minimumVersions.chromeDesktopVersion}
        feature={minimumVersions.chromeDesktopFeature}
      />
  }
  if (device.isChrome && device.isAndroid) {
    if (ArrayUtils.isLower(deviceFullVersion, versionToNumArr(minimumVersions.chromeAndroidVersion)))
      return <ErrorMessage
        browserName="Chrome Android"
        minimumVersion={minimumVersions.chromeAndroidVersion}
        feature={minimumVersions.chromeAndroidFeature}
      />
  }
  if (device.isSafari && device.isDesktop) {
    if (ArrayUtils.isLower(deviceFullVersion, versionToNumArr(minimumVersions.safariDesktopVersion)))
      return <ErrorMessage
        browserName="Safari Desktop"
        minimumVersion={minimumVersions.safariDesktopVersion}
        feature={minimumVersions.safariDesktopFeature}
      />
  }
  if (device.isSafari && device.isIOS) {
    if (ArrayUtils.isLower(deviceFullVersion, versionToNumArr(minimumVersions.safariIosVersion)))
      return <ErrorMessage
        browserName="Safari iOS"
        minimumVersion={minimumVersions.safariIosVersion}
        feature={minimumVersions.safariIosFeature}
      />
  }
  if (device.isEdge && device.isDesktop) {
    if (ArrayUtils.isLower(deviceFullVersion, versionToNumArr(minimumVersions.edgeDesktopVersion)))
      return <ErrorMessage
        browserName="Edge Desktop"
        minimumVersion={minimumVersions.edgeDesktopVersion}
        feature={minimumVersions.edgeDesktopFeature}
      />
  }
  
  return <>{ children }</>
})
export default CheckBrowserMinimumVersion



type ErrorMessageProps = {
  browserName: string
  minimumVersion: string
  feature: string
}
const ErrorMessage = React.memo(
(props: ErrorMessageProps)=><div>
  <h3>Required minimum version of {props.browserName} is {props.minimumVersion}.</h3>
  <div>Your browser does <b>not support</b> feature: <b>{props.feature}</b>.</div>
  <div>Please update your browser.</div>
</div>
)


