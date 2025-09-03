import { DateArticleType } from 'src/configs/date-article/DateArticleTypesData.ts'



export type DateArticleCategoryItem = { type: 'category', itemCategory: DateArticleCategoryName }
export type DateArticleTypeItem = { type: 'type', itemType: DateArticleType }
export type DateArticleItemItem = { type: 'item', itemId: string }
export type DateArticleItem =
  | DateArticleCategoryItem
  | DateArticleTypeItem
  | DateArticleItemItem

export type DateArticleMultiTypeItem = { type: 'itemsOfType', itemsType: DateArticleType }
export type DateArticleMultiItem = DateArticleItem | DateArticleMultiTypeItem

type Type = { itemType: DateArticleType }
type UiRow = { ui: 'row', headerItem: DateArticleItem, listOfItems: DateArticleMultiItem[] }
type UiPage = { ui: 'page', listOfItems: DateArticleMultiItem[] }
type Ui = UiRow | UiPage

export type DateArticleCategoryData = Type & Ui




export type DateArticleCategoryName =
  | 'allRow'
  | 'allPage'
  
  | 'gettingToKnowRow'
  | 'gettingToKnowPage'
  | 'dateRow'
  | 'datePage'
  | 'aboutRelationshipsRow'
  | 'aboutRelationshipsPage'
  | 'psychologyOfRelationshipsRow'
  | 'psychologyOfRelationshipsPage'
  | 'sexualityAndIntimateRelationshipsRow'
  | 'sexualityAndIntimateRelationshipsPage'
  | 'successStoriesRow'
  | 'successStoriesPage'
  
  | 'profileCreationAdvicesRow'
  | 'profileCreationAdvicesPage'
  | 'firstContactRow'
  | 'firstContactPage'
  | 'onlineDatingEtiquetteRow'
  | 'onlineDatingEtiquettePage'
  
  | 'preparingForTheFirstDateRow'
  | 'preparingForTheFirstDatePage'
  | 'haveFirstDateRow'
  | 'haveFirstDatePage'
  | 'isFirstDateSuccessfulRow'
  | 'isFirstDateSuccessfulPage'
  
  | 'keepingRomanceAliveRow'
  | 'keepingRomanceAlivePage'
  | 'communicationInRelationshipsRow'
  | 'communicationInRelationshipsPage'
  | 'sharedHobbiesRow'
  | 'sharedHobbiesPage'
  
  | 'psychologicalAspectsOfDatingRow'
  | 'psychologicalAspectsOfDatingPage'
  | 'emotionalSupportRow'
  | 'emotionalSupportPage'
  | 'personalGrowthRow'
  | 'personalGrowthPage'
  
  | 'gettingToKnowIntimatePreferencesRow'
  | 'gettingToKnowIntimatePreferencesPage'
  | 'healthyIntimateRelationshipsRow'
  | 'healthyIntimateRelationshipsPage'
  | 'solvingIntimateProblemsRow'
  | 'solvingIntimateProblemsPage'
  
  | 'realStoriesRow'
  | 'realStoriesPage'
  | 'userExperienceRow'
  | 'userExperiencePage'
  | 'interviewsWithExpertsRow'
  | 'interviewsWithExpertsPage'

export const DateArticleCategoriesData: Record<DateArticleCategoryName, DateArticleCategoryData> = {
  allRow: {
    itemType: 'all',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'allPage' },
    listOfItems: [
      { type: 'category', itemCategory: 'gettingToKnowPage' },
      { type: 'category', itemCategory: 'datePage' },
      { type: 'category', itemCategory: 'aboutRelationshipsPage' },
      { type: 'category', itemCategory: 'psychologyOfRelationshipsPage' },
      { type: 'category', itemCategory: 'sexualityAndIntimateRelationshipsPage' },
      { type: 'category', itemCategory: 'successStoriesPage' },
    ],
  },
  allPage: {
    itemType: 'all',
    ui: 'page',
    listOfItems: [
      { type: 'category', itemCategory: 'gettingToKnowRow' },
      { type: 'category', itemCategory: 'dateRow' },
      { type: 'category', itemCategory: 'aboutRelationshipsRow' },
      { type: 'category', itemCategory: 'psychologyOfRelationshipsRow' },
      { type: 'category', itemCategory: 'sexualityAndIntimateRelationshipsRow' },
      { type: 'category', itemCategory: 'successStoriesRow' },
    ],
  },
  
  
  gettingToKnowRow: {
    itemType: 'gettingToKnow',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'gettingToKnowPage' },
    listOfItems: [
      { type: 'category', itemCategory: 'profileCreationAdvicesPage' },
      { type: 'category', itemCategory: 'firstContactPage' },
      { type: 'category', itemCategory: 'onlineDatingEtiquettePage' },
    ],
  },
  gettingToKnowPage: {
    itemType: 'gettingToKnow',
    ui: 'page',
    listOfItems: [
      { type: 'category', itemCategory: 'profileCreationAdvicesRow' },
      { type: 'category', itemCategory: 'firstContactRow' },
      { type: 'category', itemCategory: 'onlineDatingEtiquetteRow' },
    ],
  },
  dateRow: {
    itemType: 'date',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'datePage' },
    listOfItems: [
      { type: 'category', itemCategory: 'preparingForTheFirstDatePage' },
      { type: 'category', itemCategory: 'haveFirstDatePage' },
      { type: 'category', itemCategory: 'isFirstDateSuccessfulPage' },
    ],
  },
  datePage: {
    itemType: 'date',
    ui: 'page',
    listOfItems: [
      { type: 'category', itemCategory: 'preparingForTheFirstDateRow' },
      { type: 'category', itemCategory: 'haveFirstDateRow' },
      { type: 'category', itemCategory: 'isFirstDateSuccessfulRow' },
    ],
  },
  aboutRelationshipsRow: {
    itemType: 'aboutRelationships',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'aboutRelationshipsPage' },
    listOfItems: [
      { type: 'category', itemCategory: 'keepingRomanceAlivePage' },
      { type: 'category', itemCategory: 'communicationInRelationshipsPage' },
      { type: 'category', itemCategory: 'sharedHobbiesPage' },
    ],
  },
  aboutRelationshipsPage: {
    itemType: 'aboutRelationships',
    ui: 'page',
    listOfItems: [
      { type: 'category', itemCategory: 'keepingRomanceAliveRow' },
      { type: 'category', itemCategory: 'communicationInRelationshipsRow' },
      { type: 'category', itemCategory: 'sharedHobbiesRow' },
    ],
  },
  psychologyOfRelationshipsRow: {
    itemType: 'psychologyOfRelationships',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'psychologyOfRelationshipsPage' },
    listOfItems: [
      { type: 'category', itemCategory: 'psychologicalAspectsOfDatingPage' },
      { type: 'category', itemCategory: 'emotionalSupportPage' },
      { type: 'category', itemCategory: 'personalGrowthPage' },
    ],
  },
  psychologyOfRelationshipsPage: {
    itemType: 'psychologyOfRelationships',
    ui: 'page',
    listOfItems: [
      { type: 'category', itemCategory: 'psychologicalAspectsOfDatingRow' },
      { type: 'category', itemCategory: 'emotionalSupportRow' },
      { type: 'category', itemCategory: 'personalGrowthRow' },
    ],
  },
  sexualityAndIntimateRelationshipsRow: {
    itemType: 'sexualityAndIntimateRelationships',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'sexualityAndIntimateRelationshipsPage' },
    listOfItems: [
      { type: 'category', itemCategory: 'gettingToKnowIntimatePreferencesPage' },
      { type: 'category', itemCategory: 'healthyIntimateRelationshipsPage' },
      { type: 'category', itemCategory: 'solvingIntimateProblemsPage' },
    ],
  },
  sexualityAndIntimateRelationshipsPage: {
    itemType: 'sexualityAndIntimateRelationships',
    ui: 'page',
    listOfItems: [
      { type: 'category', itemCategory: 'gettingToKnowIntimatePreferencesRow' },
      { type: 'category', itemCategory: 'healthyIntimateRelationshipsRow' },
      { type: 'category', itemCategory: 'solvingIntimateProblemsRow' },
    ],
  },
  successStoriesRow: {
    itemType: 'successStories',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'successStoriesPage' },
    listOfItems: [
      { type: 'category', itemCategory: 'realStoriesPage' },
      { type: 'category', itemCategory: 'userExperiencePage' },
      { type: 'category', itemCategory: 'interviewsWithExpertsPage' },
    ],
  },
  successStoriesPage: {
    itemType: 'successStories',
    ui: 'page',
    listOfItems: [
      { type: 'category', itemCategory: 'realStoriesRow' },
      { type: 'category', itemCategory: 'userExperienceRow' },
      { type: 'category', itemCategory: 'interviewsWithExpertsRow' },
    ],
  },
  
  
  
  profileCreationAdvicesRow: {
    itemType: 'profileCreationAdvices',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'profileCreationAdvicesPage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'profileCreationAdvices' },
    ],
  },
  profileCreationAdvicesPage: {
    itemType: 'profileCreationAdvices',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'profileCreationAdvices' },
    ],
  },
  firstContactRow: {
    itemType: 'firstContact',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'firstContactPage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'firstContact' },
    ],
  },
  firstContactPage: {
    itemType: 'firstContact',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'firstContact' },
    ],
  },
  onlineDatingEtiquetteRow: {
    itemType: 'onlineDatingEtiquette',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'onlineDatingEtiquettePage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'onlineDatingEtiquette' },
    ],
  },
  onlineDatingEtiquettePage: {
    itemType: 'onlineDatingEtiquette',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'onlineDatingEtiquette' },
    ],
  },
  
  
  
  preparingForTheFirstDateRow: {
    itemType: 'preparingForTheFirstDate',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'preparingForTheFirstDatePage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'preparingForTheFirstDate' },
    ],
  },
  preparingForTheFirstDatePage: {
    itemType: 'preparingForTheFirstDate',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'preparingForTheFirstDate' },
    ],
  },
  haveFirstDateRow: {
    itemType: 'haveFirstDate',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'haveFirstDatePage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'haveFirstDate' },
    ],
  },
  haveFirstDatePage: {
    itemType: 'haveFirstDate',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'haveFirstDate' },
    ],
  },
  isFirstDateSuccessfulRow: {
    itemType: 'isFirstDateSuccessful',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'isFirstDateSuccessfulPage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'isFirstDateSuccessful' },
    ],
  },
  isFirstDateSuccessfulPage: {
    itemType: 'isFirstDateSuccessful',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'isFirstDateSuccessful' },
    ],
  },
  
  
  
  keepingRomanceAliveRow: {
    itemType: 'keepingRomanceAlive',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'keepingRomanceAlivePage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'keepingRomanceAlive' },
    ],
  },
  keepingRomanceAlivePage: {
    itemType: 'keepingRomanceAlive',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'keepingRomanceAlive' },
    ],
  },
  communicationInRelationshipsRow: {
    itemType: 'communicationInRelationships',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'communicationInRelationshipsPage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'communicationInRelationships' },
    ],
  },
  communicationInRelationshipsPage: {
    itemType: 'communicationInRelationships',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'communicationInRelationships' },
    ],
  },
  sharedHobbiesRow: {
    itemType: 'sharedHobbies',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'sharedHobbiesPage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'sharedHobbies' },
    ],
  },
  sharedHobbiesPage: {
    itemType: 'sharedHobbies',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'sharedHobbies' },
    ],
  },
  
  
  
  psychologicalAspectsOfDatingRow: {
    itemType: 'psychologicalAspectsOfDating',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'psychologicalAspectsOfDatingPage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'psychologicalAspectsOfDating' },
    ],
  },
  psychologicalAspectsOfDatingPage: {
    itemType: 'psychologicalAspectsOfDating',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'psychologicalAspectsOfDating' },
    ],
  },
  emotionalSupportRow: {
    itemType: 'emotionalSupport',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'emotionalSupportPage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'emotionalSupport' },
    ],
  },
  emotionalSupportPage: {
    itemType: 'emotionalSupport',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'emotionalSupport' },
    ],
  },
  personalGrowthRow: {
    itemType: 'personalGrowth',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'personalGrowthPage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'personalGrowth' },
    ],
  },
  personalGrowthPage: {
    itemType: 'personalGrowth',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'personalGrowth' },
    ],
  },
  
  
  
  gettingToKnowIntimatePreferencesRow: {
    itemType: 'gettingToKnowIntimatePreferences',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'gettingToKnowIntimatePreferencesPage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'gettingToKnowIntimatePreferences' },
    ],
  },
  gettingToKnowIntimatePreferencesPage: {
    itemType: 'gettingToKnowIntimatePreferences',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'gettingToKnowIntimatePreferences' },
    ],
  },
  healthyIntimateRelationshipsRow: {
    itemType: 'healthyIntimateRelationships',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'healthyIntimateRelationshipsPage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'healthyIntimateRelationships' },
    ],
  },
  healthyIntimateRelationshipsPage: {
    itemType: 'healthyIntimateRelationships',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'healthyIntimateRelationships' },
    ],
  },
  solvingIntimateProblemsRow: {
    itemType: 'solvingIntimateProblems',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'solvingIntimateProblemsPage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'solvingIntimateProblems' },
    ],
  },
  solvingIntimateProblemsPage: {
    itemType: 'solvingIntimateProblems',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'solvingIntimateProblems' },
    ],
  },
  
  
  
  realStoriesRow: {
    itemType: 'realStories',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'realStoriesPage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'realStories' },
    ],
  },
  realStoriesPage: {
    itemType: 'realStories',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'realStories' },
    ],
  },
  userExperienceRow: {
    itemType: 'userExperience',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'userExperiencePage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'userExperience' },
    ],
  },
  userExperiencePage: {
    itemType: 'userExperience',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'userExperience' },
    ],
  },
  interviewsWithExpertsRow: {
    itemType: 'interviewsWithExperts',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'interviewsWithExpertsPage' },
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'interviewsWithExperts' },
    ],
  },
  interviewsWithExpertsPage: {
    itemType: 'interviewsWithExperts',
    ui: 'page',
    listOfItems: [
      { type: 'itemsOfType', itemsType: 'interviewsWithExperts' },
    ],
  },
}

