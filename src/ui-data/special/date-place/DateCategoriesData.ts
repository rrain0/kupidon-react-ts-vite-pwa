import { DatePlaceType } from 'src/ui-data/special/date-place/DatePlaceTypeData.ts'




export type DateCategoryType =
  | 'allPreviewRow'
  | 'allPageOfPreviews'
  | 'allPage'
  
  | 'romanticPreviewRow'
  | 'culturalPreviewRow'
  | 'activePreviewRow'
  | 'entertainingPreviewRow'
  | 'nonstandardPreviewRow'
  
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
  ui: 'previewRow'
  headerNext: DateCategoryType
} | {
  ui: 'pageOfPreviews'
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
  allPreviewRow: {
    type: 'category',
    next: ['romanticPage', 'culturalPage', 'activePage', 'entertainingPage', 'nonstandardPage'],
    ui: 'previewRow',
    headerNext: 'allPageOfPreviews',
    placeType: 'all',
  },
  allPageOfPreviews: {
    type: 'category',
    next: [
      'romanticPreviewRow', 'culturalPreviewRow', 'activePreviewRow',
      'entertainingPreviewRow', 'nonstandardPreviewRow',
    ],
    ui: 'pageOfPreviews',
    placeType: 'all',
  },
  allPage: {
    type: 'category',
    next: ['romanticPage', 'culturalPage', 'activePage', 'entertainingPage', 'nonstandardPage'],
    ui: 'page',
    placeType: 'all',
  },
  
  
  romanticPreviewRow: {
    type: 'category',
    next: ['restaurant', 'cafe', 'coffeeHouse', 'walking'],
    ui: 'previewRow',
    headerNext: 'romanticPage',
    placeType: 'romantic',
  },
  romanticPage: {
    type: 'category',
    next: ['restaurant', 'cafe', 'coffeeHouse', 'walking'],
    ui: 'page',
    placeType: 'romantic',
  },
  culturalPreviewRow: {
    type: 'category',
    next: ['museum', 'gallery', 'theatre', 'cinema'],
    ui: 'previewRow',
    headerNext: 'culturalPage',
    placeType: 'cultural',
  },
  culturalPage: {
    type: 'category',
    next: ['museum', 'gallery', 'theatre', 'cinema'],
    ui: 'page',
    placeType: 'cultural',
  },
  activePreviewRow: {
    type: 'category',
    next: ['sports', 'extreme', 'outdoorActivities'],
    ui: 'previewRow',
    headerNext: 'activePage',
    placeType: 'active',
  },
  activePage: {
    type: 'category',
    next: ['sports', 'extreme', 'outdoorActivities'],
    ui: 'page',
    placeType: 'active',
  },
  entertainingPreviewRow: {
    type: 'category',
    next: ['excitingEntertainment', 'interactive', 'eveningEntertainment'],
    ui: 'previewRow',
    headerNext: 'entertainingPage',
    placeType: 'entertaining',
  },
  entertainingPage: {
    type: 'category',
    next: ['excitingEntertainment', 'interactive', 'eveningEntertainment'],
    ui: 'page',
    placeType: 'entertaining',
  },
  nonstandardPreviewRow: {
    type: 'category',
    next: ['masterClasses', 'streamCocktails', 'volunteering'],
    ui: 'previewRow',
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

