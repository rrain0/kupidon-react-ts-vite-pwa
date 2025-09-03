import { MockPoster } from 'src/_mock-data/poster/MockPoster.ts'


export type PosterItem = {
  date: string
  location: string
  price: string
  description: string
  previewImg: string
}

export const PosterData: PosterItem[] = MockPoster


