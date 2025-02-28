import { DatePlaceType } from 'src/ui-data/special/DatePlaceTypeData.ts'



export type DateCategoryType =
  | 'all1'
  | 'romantic2'
  | 'cultural2'
  | 'active2'
  | 'entertaining2'
  | 'nonstandard2'

export type NextCategoriesOrTypes = {
  nextCategories: DateCategoryType[]
  nextTypes?: undefined
} | {
  nextCategories?: undefined
  nextTypes: DatePlaceType[]
}

export type DateCategoryData = {
  type: DatePlaceType
  //display: 'row' | 'page'
} & NextCategoriesOrTypes


export const DateCategoriesData: Record<DateCategoryType, DateCategoryData> = {
  all1: {
    type: 'all',
    nextCategories: ['romantic2', 'cultural2', 'active2', 'entertaining2', 'nonstandard2'],
  },
  
  
  romantic2: {
    type: 'romantic',
    nextTypes: ['tableRomantic', 'walking'],
  },
  cultural2: {
    type: 'cultural',
    nextTypes: ['museum', 'gallery', 'theatre', 'cinema'],
  },
  active2: {
    type: 'active',
    nextTypes: ['sports', 'extreme', 'outdoorActivities'],
  },
  entertaining2: {
    type: 'entertaining',
    nextTypes: ['excitingEntertainment', 'interactive', 'eveningEntertainment'],
  },
  nonstandard2: {
    type: 'nonstandard',
    nextTypes: ['masterClasses', 'streamCocktails', 'volunteering'],
  },
}
