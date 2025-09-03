
import { MediaDownloadable } from '@libs/media/Media.ts'
import { isundef } from 'src/utils/base/TypeUtils.ts'
import { isdef } from 'src/utils/base/TypeUtils.ts'



export const mergeMediaDownloadData = <T extends MediaDownloadable | undefined>(
  media: T, savedMedia: MediaDownloadable | undefined
): T => {
  if (media && savedMedia) {
    const {
      remoteUrl, isReady, dataUrl, download, showDownloadProgress, downloadError,
    } = savedMedia
    
    if (media.remoteUrl === remoteUrl) {
      if (!media.isReady && isReady) {
        media = {
          ...media, isReady, dataUrl, needDownload: false, needRetryDownload: false,
        }
      }
      else if (!media.download && download) {
        media = {
          ...media, download, showDownloadProgress, needDownload: false, needRetryDownload: false,
        }
      }
      else if (!media.downloadError && downloadError) {
        media = { ...media, downloadError }
      }
    }
    
    if (isundef(media.showDownloadProgress) && isdef(savedMedia.showDownloadProgress)) {
      media = { ...media, showDownloadProgress: savedMedia.showDownloadProgress }
    }
  }
  return media
}

