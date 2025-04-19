import { MediaDownloadable, newDefaultRemoteMedia } from 'src/ui-data/models/Media'



export interface MainPhoto extends MediaDownloadable { }

export const newDefaultMainPhoto = (): MainPhoto => ({
  ...newDefaultRemoteMedia(),
})

