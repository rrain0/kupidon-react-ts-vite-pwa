import { DatePlaceType } from 'src/ui-data/special/DatePlaceTypeData.ts'




export const DateCategoryData = {
  all: {
    next: ['romantic', 'cultural', 'active', 'entertaining', 'nonstandard'],
  },
  
  
  romantic: {
    next: ['tableRomantic', 'walking'],
  },
  cultural: {
    next: ['museum', 'gallery', 'theatre', 'cinema'],
  },
  active: {
    next: ['sports', 'extreme', 'outdoorActivities'],
  },
  entertaining: {
    next: ['excitingEntertainment', 'interactive', 'eveningEntertainment'],
  },
  nonstandard: {
    next: ['masterClasses', 'streamCocktails', 'volunteering'],
  },
} satisfies Partial<Record<DatePlaceType, {
  next: DatePlaceType[]
}>>
