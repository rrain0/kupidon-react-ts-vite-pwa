import { MockDatePlaces } from 'src/_mock-data/date-places/MockDatePlaces.ts'
import { UiText, UiTextValuesArr } from '@mini-libs/ui-text/UiText.ts'
import { DatePlaceType } from 'src/configs/date-place/DatePlaceTypeData.ts'
import { Contact } from 'src/components/widgets/ContactButton/Contact.ts'



export type DatePlace = {
  id: string
  types: DatePlaceType[]
  name: UiText
  picture: string
  video?: string | undefined
  uiAddress: UiText
  locationMap: { lat: number, lon: number, q: string }
  locationPlaces: Contact[]
  isNear: boolean
  shortDescription: UiText
  description: UiText
  features: UiTextValuesArr
  kupidonBonuses: UiTextValuesArr
  contacts: Contact[]
}



export const DatePlacesData: DatePlace[] = MockDatePlaces

