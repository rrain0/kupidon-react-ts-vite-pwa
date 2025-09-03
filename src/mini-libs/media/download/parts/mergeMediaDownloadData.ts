import { TypeU } from '@utils/common/TypeU.ts'
import { MediaDownloadable } from 'src/mini-libs/media/Media.ts'
import isundef = TypeU.isundef
import isdef = TypeU.isdef



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

