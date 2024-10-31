import { DefaultMedia, MediaDownloadable } from 'src/ui-data/models/Media'


export interface MainPhoto extends MediaDownloadable { }

export const DefaultMainPhoto: MainPhoto  = {
  ...DefaultMedia,
  needDownload: true,
  download: undefined,
  downloadError: undefined,
}

