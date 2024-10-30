import { DefaultMedia, MediaDownloadable } from 'src/ui-data/models/Media'


export interface MainPhoto extends MediaDownloadable {
  showProgress: boolean
  downloadError: any | undefined
}

export const DefaultMainPhoto: MainPhoto  = {
  ...DefaultMedia,
  showProgress: false,
  needDownload: true,
  download: undefined,
  downloadError: undefined,
}

