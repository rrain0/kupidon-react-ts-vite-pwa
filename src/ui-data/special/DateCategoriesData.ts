import { DatePlaceType } from 'src/ui-data/special/DatePlaceTypeData.ts'




export type DateCategoryType =
  | 'allPreview'
  | 'allPageOfPreviews'
  | 'allPage'
  
  | 'romanticPreview'
  | 'culturalPreview'
  | 'activePreview'
  | 'entertainingPreview'
  | 'nonstandardPreview'
  
  | 'romanticPage'
  | 'culturalPage'
  | 'activePage'
  | 'entertainingPage'
  | 'nonstandardPage'
  
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
  allPreview: {
    type: 'category',
    next: ['romanticPage', 'culturalPage', 'activePage', 'entertainingPage', 'nonstandardPage'],
    ui: 'previewRow',
    headerNext: 'allPageOfPreviews',
    placeType: 'all',
  },
  allPageOfPreviews: {
    type: 'category',
    next: [
      'romanticPreview', 'culturalPreview', 'activePreview',
      'entertainingPreview', 'nonstandardPreview',
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
  
  
  romanticPreview: {
    type: 'category',
    next: ['tableRomantic', 'walking'],
    ui: 'previewRow',
    headerNext: 'romanticPage',
    placeType: 'romantic',
  },
  culturalPreview: {
    type: 'category',
    next: ['museum', 'gallery', 'theatre', 'cinema'],
    ui: 'previewRow',
    headerNext: 'culturalPage',
    placeType: 'cultural',
  },
  activePreview: {
    type: 'category',
    next: ['sports', 'extreme', 'outdoorActivities'],
    ui: 'previewRow',
    headerNext: 'activePage',
    placeType: 'active',
  },
  entertainingPreview: {
    type: 'category',
    next: ['excitingEntertainment', 'interactive', 'eveningEntertainment'],
    ui: 'previewRow',
    headerNext: 'entertainingPage',
    placeType: 'entertaining',
  },
  nonstandardPreview: {
    type: 'category',
    next: ['masterClasses', 'streamCocktails', 'volunteering'],
    ui: 'previewRow',
    headerNext: 'nonstandardPage',
    placeType: 'nonstandard',
  },
  
  romanticPage: {
    type: 'category',
    next: ['tableRomantic', 'walking'],
    ui: 'page',
    placeType: 'romantic',
  },
  culturalPage: {
    type: 'category',
    next: ['museum', 'gallery', 'theatre', 'cinema'],
    ui: 'page',
    placeType: 'cultural',
  },
  activePage: {
    type: 'category',
    next: ['sports', 'extreme', 'outdoorActivities'],
    ui: 'page',
    placeType: 'active',
  },
  entertainingPage: {
    type: 'category',
    next: ['excitingEntertainment', 'interactive', 'eveningEntertainment'],
    ui: 'page',
    placeType: 'entertaining',
  },
  nonstandardPage: {
    type: 'category',
    next: ['masterClasses', 'streamCocktails', 'volunteering'],
    ui: 'page',
    placeType: 'nonstandard',
  },
  
  
  tableRomantic: { type: 'type', ui: 'page', placeType: 'tableRomantic' },
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

