import { MediaDownloadable, newDefaultMedia } from 'src/ui-data/models/Media'


export interface MainPhoto extends MediaDownloadable { }

export const newDefaultMainPhoto = (): MainPhoto => ({
  ...newDefaultMedia(),
  needDownload: true,
  showDownload: false,
  download: undefined,
  downloadError: undefined,
})

