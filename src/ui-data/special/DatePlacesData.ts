import { MockDatePlaces } from 'src/_mock-data/date-places/MockDatePlaces.ts'
import { UiTextValues } from 'src/mini-libs/ui-text/UiText.ts'
import { DateType } from 'src/ui-data/special/DateTypeData.ts'



export type DatePlace = {
  id: string
  type: DateType[]
  picture: string
  features: string[]
  isNear: boolean
  phone: string
  email: string
  uiText: UiTextValues<'name' | 'shortDescription' | 'location' | 'description'>
}



export const DatePlacesData: DatePlace[] = MockDatePlaces.places

