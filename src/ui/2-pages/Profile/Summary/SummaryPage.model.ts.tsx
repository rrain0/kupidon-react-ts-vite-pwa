import { DefaultMedia, MediaDownloadable } from 'src/ui-data/models/Media'


export interface ProfilePhoto extends MediaDownloadable {
  downloadError: string | undefined
}

export const DefaultProfilePhoto: ProfilePhoto  = {
  ...DefaultMedia,
  download: undefined,
  downloadError: undefined,
}

