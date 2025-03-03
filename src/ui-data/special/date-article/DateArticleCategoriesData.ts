import { DateArticleType } from 'src/ui-data/special/date-article/DateArticleTypeData.ts'




export type DateArticleCategoryType =
  | 'allPreviewRow'
  | 'allPageOfPreviews'
  
  | 'gettingToKnowPreviewRow'
  | 'gettingToKnowPageOfPreviews'
  
  | 'profileCreationAdvicesPreviewRow'
  | 'profileCreationAdvicesPageOfPreviews'
  
  | 'howToCreateAttractiveProfile'

export type DateArticleCategoryCommonData = {
  articleType: DateArticleType
}

export type DateArticleCategoryUiData = {
  ui: 'previewRow'
  headerNext: DateArticleCategoryType
} | {
  ui: 'pageOfPreviews'
} | {
  ui: 'page'
}

export type DateArticleCategoryCategoryData = {
  type: 'category'
  next: DateArticleCategoryType[]
} | {
  type: 'type'
}

export type DateArticleCategoryData =
  DateArticleCategoryCommonData & DateArticleCategoryUiData & DateArticleCategoryCategoryData




export const DateArticleCategoriesData: Record<DateArticleCategoryType, DateArticleCategoryData> = {
  allPreviewRow: {
    type: 'category',
    next: ['gettingToKnowPageOfPreviews'],
    ui: 'previewRow',
    headerNext: 'allPageOfPreviews',
    articleType: 'all',
  },
  allPageOfPreviews: {
    type: 'category',
    next: ['gettingToKnowPageOfPreviews'],
    ui: 'pageOfPreviews',
    articleType: 'all',
  },
  
  
  gettingToKnowPreviewRow: {
    type: 'category',
    next: ['howToCreateAttractiveProfile'],
    ui: 'previewRow',
    headerNext: 'profileCreationAdvicesPageOfPreviews',
    articleType: 'gettingToKnow',
  },
  gettingToKnowPageOfPreviews: {
    type: 'category',
    next: ['profileCreationAdvicesPreviewRow'],
    ui: 'pageOfPreviews',
    articleType: 'gettingToKnow',
  },
  profileCreationAdvicesPreviewRow: {
    type: 'category',
    next: ['howToCreateAttractiveProfile'],
    ui: 'previewRow',
    headerNext: 'profileCreationAdvicesPageOfPreviews',
    articleType: 'profileCreationAdvices',
  },
  profileCreationAdvicesPageOfPreviews: {
    type: 'category',
    next: ['howToCreateAttractiveProfile'],
    ui: 'page',
    articleType: 'profileCreationAdvices',
  },
  
  
  howToCreateAttractiveProfile: {
    type: 'type', ui: 'page', articleType: 'howToCreateAttractiveProfile',
  },
}

