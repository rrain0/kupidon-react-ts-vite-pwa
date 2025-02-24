import { MockDatePlaces } from 'src/_mock-data/date-places/MockDatePlaces.ts'
import { UiText, UiTextValuesArr } from 'src/mini-libs/ui-text/UiText.ts'
import { DateType } from 'src/ui-data/special/DateTypeData.ts'



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
    type: 'phone' | 'telegram' | 'whatsapp' | 'email',
    value: string
  }[]
}



export const DatePlacesData: DatePlace[] = MockDatePlaces.places

