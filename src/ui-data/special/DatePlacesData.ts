import { MockDatePlaces } from 'src/_mock-data/date-places/MockDatePlaces.ts'
import { UiText, UiTextValuesArr } from 'src/mini-libs/ui-text/UiText.ts'
import { DatePlaceType } from 'src/ui-data/special/DatePlaceTypeData.ts'



export type ContactType =
  | 'phone'
  | 'telegram'
  | 'whatsapp'
  | 'email'



export type DatePlace = {
  id: string
  type: readonly DatePlaceType[]
  name: UiText
  picture: string
  location: {
    name: UiText,
    coords: string,
  }
  isNear: boolean
  shortDescription: UiText
  description: UiText
  features: UiTextValuesArr
  kupidonBonuses: UiTextValuesArr
  contacts: {
    type: ContactType
    value: string
  }[]
}



export const DatePlacesData: DatePlace[] = MockDatePlaces

