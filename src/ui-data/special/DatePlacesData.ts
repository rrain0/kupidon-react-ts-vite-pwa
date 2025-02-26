import { MockDatePlaces } from 'src/_mock-data/date-places/MockDatePlaces.ts'
import { UiText, UiTextValuesArr } from 'src/mini-libs/ui-text/UiText.ts'
import { DateType } from 'src/ui-data/special/DateTypeData.ts'



export type ContactType = 'phone' | 'telegram' | 'whatsapp' | 'email'

export type DatePlace = {
  id: string
  type: DateType[]
  name: UiText
  picture: string
  location: UiText
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



export const DatePlacesData: DatePlace[] = MockDatePlaces.places

