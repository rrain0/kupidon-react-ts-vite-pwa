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
} | {
  type: 'item'
  id: string
}

export type DateArticleCategoryData =
  DateArticleCategoryCommonData & DateArticleCategoryUiData & DateArticleCategoryCategoryData

type Entity =
  | { type: 'category', itemCategory: DateArticleCategoryType }
  | { type: 'type', itemType: DateArticleType }
  | { type: 'item', itemId: string }

type Type =
  | { type: 'category', itemType: DateArticleType }
  | { type: 'type', itemType: DateArticleType }
  | { type: 'item', itemId: string }
type Ui =
  | { ui: 'rowOfPreviews', listOfEntities: Entity[], headerEntity: Entity }
  | { ui: 'page', listOfEntities: Entity[] }
  | { ui: 'pageOfRowsOfPreviews', listOfEntities: Entity[] }
  | { ui: undefined }

export type DateArticleCategoryData2 = Type | Ui




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
  
  
  /* howToCreateAttractiveProfile: {
    type: 'item', articleId: 'IDhowToCreateAttractiveProfile',
  }, */
}

