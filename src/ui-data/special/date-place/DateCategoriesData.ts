import { DatePlaceType } from 'src/ui-data/special/date-place/DatePlaceTypeData.ts'


// TODO Взять интерфейсы из статей и переделать потом

export type DateCategoryType =
  | 'allRowOfPreviews'
  | 'allPageOfRowsOfPreviews'
  | 'allPage'
  
  | 'romanticRowOfPreviews'
  | 'culturalRowOfPreviews'
  | 'activeRowOfPreviews'
  | 'entertainingRowOfPreviews'
  | 'nonstandardRowOfPreviews'
  
  | 'romanticPage'
  | 'culturalPage'
  | 'activePage'
  | 'entertainingPage'
  | 'nonstandardPage'
  
  | 'tableRomantic'
  | 'restaurant'
  | 'cafe'
  | 'coffeeHouse'
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

export type DateCategoryCommonData = {
  placeType: DatePlaceType
}

export type DateCategoryUiData = {
  ui: 'rowOfPreviews'
  headerNext: DateCategoryType
} | {
  ui: 'pageOfRowsOfPreviews'
} | {
  ui: 'page'
}

export type DateCategoryCategoryData = {
  type: 'category'
  next: DateCategoryType[]
} | {
  type: 'type'
}

export type DateCategoryData =
  DateCategoryCommonData & DateCategoryUiData & DateCategoryCategoryData




export const DateCategoriesData: Record<DateCategoryType, DateCategoryData> = {
  allRowOfPreviews: {
    type: 'category',
    next: ['romanticPage', 'culturalPage', 'activePage', 'entertainingPage', 'nonstandardPage'],
    ui: 'rowOfPreviews',
    headerNext: 'allPageOfRowsOfPreviews',
    placeType: 'all',
  },
  allPageOfRowsOfPreviews: {
    type: 'category',
    next: [
      'romanticRowOfPreviews', 'culturalRowOfPreviews', 'activeRowOfPreviews',
      'entertainingRowOfPreviews', 'nonstandardRowOfPreviews',
    ],
    ui: 'pageOfRowsOfPreviews',
    placeType: 'all',
  },
  allPage: {
    type: 'category',
    next: ['romanticPage', 'culturalPage', 'activePage', 'entertainingPage', 'nonstandardPage'],
    ui: 'page',
    placeType: 'all',
  },
  
  
  romanticRowOfPreviews: {
    type: 'category',
    next: ['restaurant', 'cafe', 'coffeeHouse', 'walking'],
    ui: 'rowOfPreviews',
    headerNext: 'romanticPage',
    placeType: 'romantic',
  },
  romanticPage: {
    type: 'category',
    next: ['restaurant', 'cafe', 'coffeeHouse', 'walking'],
    ui: 'page',
    placeType: 'romantic',
  },
  culturalRowOfPreviews: {
    type: 'category',
    next: ['museum', 'gallery', 'theatre', 'cinema'],
    ui: 'rowOfPreviews',
    headerNext: 'culturalPage',
    placeType: 'cultural',
  },
  culturalPage: {
    type: 'category',
    next: ['museum', 'gallery', 'theatre', 'cinema'],
    ui: 'page',
    placeType: 'cultural',
  },
  activeRowOfPreviews: {
    type: 'category',
    next: ['sports', 'extreme', 'outdoorActivities'],
    ui: 'rowOfPreviews',
    headerNext: 'activePage',
    placeType: 'active',
  },
  activePage: {
    type: 'category',
    next: ['sports', 'extreme', 'outdoorActivities'],
    ui: 'page',
    placeType: 'active',
  },
  entertainingRowOfPreviews: {
    type: 'category',
    next: ['excitingEntertainment', 'interactive', 'eveningEntertainment'],
    ui: 'rowOfPreviews',
    headerNext: 'entertainingPage',
    placeType: 'entertaining',
  },
  entertainingPage: {
    type: 'category',
    next: ['excitingEntertainment', 'interactive', 'eveningEntertainment'],
    ui: 'page',
    placeType: 'entertaining',
  },
  nonstandardRowOfPreviews: {
    type: 'category',
    next: ['masterClasses', 'streamCocktails', 'volunteering'],
    ui: 'rowOfPreviews',
    headerNext: 'nonstandardPage',
    placeType: 'nonstandard',
  },
  nonstandardPage: {
    type: 'category',
    next: ['masterClasses', 'streamCocktails', 'volunteering'],
    ui: 'page',
    placeType: 'nonstandard',
  },
  
  
  tableRomantic: { type: 'type', ui: 'page', placeType: 'tableRomantic' },
  restaurant: { type: 'type', ui: 'page', placeType: 'restaurant' },
  cafe: { type: 'type', ui: 'page', placeType: 'cafe' },
  coffeeHouse: { type: 'type', ui: 'page', placeType: 'coffeeHouse' },
  walking: { type: 'type', ui: 'page', placeType: 'walking' },
  
  museum: { type: 'type', ui: 'page',  placeType: 'museum' },
  gallery: { type: 'type', ui: 'page',  placeType: 'gallery' },
  theatre: { type: 'type', ui: 'page',  placeType: 'theatre' },
  cinema: { type: 'type', ui: 'page',  placeType: 'cinema' },
  
  sports: { type: 'type', ui: 'page',  placeType: 'sports' },
  extreme: { type: 'type', ui: 'page',  placeType: 'extreme' },
  outdoorActivities: { type: 'type', ui: 'page',  placeType: 'outdoorActivities' },
  
  excitingEntertainment: { type: 'type', ui: 'page',  placeType: 'excitingEntertainment' },
  interactive: { type: 'type', ui: 'page',  placeType: 'interactive' },
  eveningEntertainment: { type: 'type', ui: 'page',  placeType: 'eveningEntertainment' },
  
  masterClasses: { type: 'type', ui: 'page',  placeType: 'masterClasses' },
  streamCocktails: { type: 'type', ui: 'page',  placeType: 'streamCocktails' },
  volunteering: { type: 'type', ui: 'page',  placeType: 'volunteering' },
}

