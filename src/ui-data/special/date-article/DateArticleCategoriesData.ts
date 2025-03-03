import { DateArticleType } from 'src/ui-data/special/date-article/DateArticleTypeData.ts'




export type DateArticleCategoryType =
  | 'allPreviewRow'
  | 'allPageOfPreviews'
  
  | 'gettingToKnowPreviewRow'
  | 'gettingToKnowPage'
  
  | 'profileCreationAdvices'

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
    next: ['gettingToKnowPage'],
    ui: 'previewRow',
    headerNext: 'allPageOfPreviews',
    articleType: 'all',
  },
  allPageOfPreviews: {
    type: 'category',
    next: ['gettingToKnowPreviewRow'],
    ui: 'pageOfPreviews',
    articleType: 'all',
  },
  
  
  gettingToKnowPreviewRow: {
    type: 'category',
    next: ['profileCreationAdvices'],
    ui: 'previewRow',
    headerNext: 'gettingToKnowPage',
    articleType: 'gettingToKnow',
  },
  gettingToKnowPage: {
    type: 'category',
    next: ['profileCreationAdvices'],
    ui: 'page',
    articleType: 'gettingToKnow',
  },
  
  
  profileCreationAdvices: {
    type: 'type', ui: 'page', articleType: 'profileCreationAdvices',
  },
}

