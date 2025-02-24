import creative from '@im/date-type/creative-icon-d1e770dbf0ee9ba83777c47a5ff23cdd.webp'
import cultural from '@im/date-type/cultural-icon-643a307e0ecc21f66df171166660090e.webp'
import entertaining from '@im/date-type/entertaining-icon-ea79c8191f6951dc83ed142725712206.webp'
import natural from '@im/date-type/natural-icon-e14a85caf5b9247a00f61b2ce4060c9c.webp'
import romantic from '@im/date-type/romantic-icon-4bd31add75ca9eea70679dc07789c007.webp'
import { ObjectU } from '@util/common/ObjectU.ts'
import { UiText } from 'src/mini-libs/ui-text/UiText.ts'
import { DateType } from 'src/ui-data/special/DateTypeData.ts'
import ObjectKeys = ObjectU.ObjectKeys




export type DateCategory =
  | 'romantic'
  | 'cultural'
  | 'active'
  | 'entertaining'
  | 'nonstandard'



export const DateCategoryData: Record<DateCategory, {
  picture: string,
  dateTypes: DateType[],
  name: UiText,
}> = {
  romantic: {
    picture: romantic,
    dateTypes: ['restaurant', 'cafe', 'coffeeHouse'],
    name: {
      'ru-RU': 'Романтический',
    },
  },
  cultural: {
    picture: cultural,
    dateTypes: ['museum', 'gallery', 'theatre', 'cinema'],
    name: {
      'ru-RU': 'Культурный',
    },
  },
  active: {
    picture: natural,
    dateTypes: [],
    name: {
      'ru-RU': 'Активный',
    },
  },
  entertaining: {
    picture: entertaining,
    dateTypes: [],
    name: {
      'ru-RU': 'Развлекательный',
    },
  },
  nonstandard: {
    picture: creative,
    dateTypes: ['masterClasses'],
    name: {
      'ru-RU': 'Нестандартный',
    },
  },
}


export const allDateCategories: DateCategory[] = ObjectKeys(DateCategoryData)