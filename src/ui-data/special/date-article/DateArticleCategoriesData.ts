import { DateArticleType } from 'src/ui-data/special/date-article/DateArticleTypeData.ts'





export type DateArticleCategoryCommonData = {
  articleType: DateArticleType
}

export type DateArticleCategoryUiData =
  | { ui: 'rowOfPreviews', headerNext: DateArticleCategoryType }
  | { ui: 'pageOfRowsOfPreviews' }
  | { ui: 'page' }

export type DateArticleCategoryCategoryData =
  | { type: 'category', next: DateArticleCategoryType[] }
  | { type: 'type' }
  | { type: 'item', id: string }

export type DateArticleCategoryData =
  DateArticleCategoryCommonData & DateArticleCategoryUiData & DateArticleCategoryCategoryData


type Item =
  | { type: 'category', itemCategory: DateArticleCategoryType }
  | { type: 'type', itemType: DateArticleType }
  | { type: 'item', itemId: string }


type Type =
  | { type: 'category', itemType: DateArticleType }
  | { type: 'type', itemType: DateArticleType }
  | { type: 'item', itemId: string }
type Ui =
  | { ui: 'rowOfPreviews', listOfEntities: Item[], headerEntity: Item }
  | { ui: 'page', listOfEntities: Item[] }
  | { ui: 'pageOfRowsOfPreviews', listOfEntities: Item[] }
  | { ui: undefined }

export type DateArticleCategoryData2 = Type & Ui




export type DateArticleCategoryType =
  | 'allRowOfPreviews'
  | 'allPageOfRowsOfPreviews'
  
  | 'gettingToKnowRowOfPreviews'
  | 'gettingToKnowPage'
  
  | 'profileCreationAdvices'

export const DateArticleCategoriesData: Record<DateArticleCategoryType, DateArticleCategoryData> = {
  allRowOfPreviews: {
    type: 'category',
    next: ['gettingToKnowPage'],
    ui: 'rowOfPreviews',
    headerNext: 'allPageOfRowsOfPreviews',
    articleType: 'all',
  },
  allPageOfRowsOfPreviews: {
    type: 'category',
    next: ['gettingToKnowRowOfPreviews'],
    ui: 'pageOfRowsOfPreviews',
    articleType: 'all',
  },
  
  
  gettingToKnowRowOfPreviews: {
    type: 'category',
    next: ['profileCreationAdvices'],
    ui: 'rowOfPreviews',
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

