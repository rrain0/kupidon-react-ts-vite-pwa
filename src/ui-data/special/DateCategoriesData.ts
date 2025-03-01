import { DatePlaceType } from 'src/ui-data/special/DatePlaceTypeData.ts'



export type DateCategoryType =
  | 'all1'
  | 'romantic2'
  | 'cultural2'
  | 'active2'
  | 'entertaining2'
  | 'nonstandard2'
  
  | 'tableRomantic'
  | 'walking'
  
  | 'museum'
  | 'gallery'
  | 'theatre'
  | 'cinema'
  
  | 'sports'
  | 'extreme'
  | 'outdoorActivities'
  
  | 'excitingEntertainment'
  | 'interactive'
  | 'eveningEntertainment'
  
  | 'masterClasses'
  | 'streamCocktails'
  | 'volunteering'





export type DateCategoryData = {
  type: 'category'
  placeType: DatePlaceType
  next: DateCategoryType[]
} | {
  type: 'type'
  placeType: DatePlaceType
}




export const DateCategoriesData: Record<DateCategoryType, DateCategoryData> = {
  all1: {
    type: 'category',
    placeType: 'all',
    next: ['romantic2', 'cultural2', 'active2', 'entertaining2', 'nonstandard2'],
  },
  
  
  romantic2: {
    type: 'category',
    placeType: 'romantic',
    next: ['tableRomantic', 'walking'],
  },
  cultural2: {
    type: 'category',
    placeType: 'cultural',
    next: ['museum', 'gallery', 'theatre', 'cinema'],
  },
  active2: {
    type: 'category',
    placeType: 'active',
    next: ['sports', 'extreme', 'outdoorActivities'],
  },
  entertaining2: {
    type: 'category',
    placeType: 'entertaining',
    next: ['excitingEntertainment', 'interactive', 'eveningEntertainment'],
  },
  nonstandard2: {
    type: 'category',
    placeType: 'nonstandard',
    next: ['masterClasses', 'streamCocktails', 'volunteering'],
  },
  
  
  tableRomantic: { type: 'type', placeType: 'tableRomantic' },
  walking: { type: 'type', placeType: 'walking' },
  
  museum: { type: 'type', placeType: 'museum' },
  gallery: { type: 'type', placeType: 'gallery' },
  theatre: { type: 'type', placeType: 'theatre' },
  cinema: { type: 'type', placeType: 'cinema' },
  
  sports: { type: 'type', placeType: 'sports' },
  extreme: { type: 'type', placeType: 'extreme' },
  outdoorActivities: { type: 'type', placeType: 'outdoorActivities' },
  
  excitingEntertainment: { type: 'type', placeType: 'excitingEntertainment' },
  interactive: { type: 'type', placeType: 'interactive' },
  eveningEntertainment: { type: 'type', placeType: 'eveningEntertainment' },
  
  masterClasses: { type: 'type', placeType: 'masterClasses' },
  streamCocktails: { type: 'type', placeType: 'streamCocktails' },
  volunteering: { type: 'type', placeType: 'volunteering' },
}

