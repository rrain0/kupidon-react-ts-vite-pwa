import { DateArticleType } from 'src/ui-data/special/date-article/DateArticleTypesData.ts'



export type DateArticleCategoryItem = { type: 'category', itemCategory: DateArticleCategoryName }
export type DateArticleTypeItem = { type: 'type', itemType: DateArticleType }
export type DateArticleItemItem = { type: 'item', itemId: string }
export type DateArticleItem =
  | DateArticleCategoryItem
  | DateArticleTypeItem
  | DateArticleItemItem


type Type = { itemType: DateArticleType }
type UiRow = { ui: 'row', headerItem: DateArticleItem, listOfItems: DateArticleItem[] }
type UiPage = { ui: 'page', listOfItems: DateArticleItem[] }
type Ui = UiRow | UiPage

export type DateArticleCategoryData = Type & Ui




export type DateArticleCategoryName =
  | 'allRow'
  | 'allPage'
  
  | 'gettingToKnowRow'
  | 'gettingToKnowPage'
  
  | 'profileCreationAdvicesRow'
  | 'profileCreationAdvicesPage'

export const DateArticleCategoriesData: Record<DateArticleCategoryName, DateArticleCategoryData> = {
  allRow: {
    itemType: 'all',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'allPage' },
    listOfItems: [
      { type: 'category', itemCategory: 'gettingToKnowPage' },
      { type: 'item', itemId: 'IDhowToCreateAttractiveProfile' },
    ],
  },
  allPage: {
    itemType: 'all',
    ui: 'page',
    listOfItems: [
      { type: 'category', itemCategory: 'gettingToKnowRow' },
    ],
  },
  
  
  gettingToKnowRow: {
    itemType: 'gettingToKnow',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'gettingToKnowPage' },
    listOfItems: [
      { type: 'category', itemCategory: 'profileCreationAdvicesPage' },
    ],
  },
  gettingToKnowPage: {
    itemType: 'gettingToKnow',
    ui: 'page',
    listOfItems: [
      { type: 'category', itemCategory: 'profileCreationAdvicesRow' },
    ],
  },
  
  
  profileCreationAdvicesRow: {
    itemType: 'profileCreationAdvices',
    ui: 'row',
    headerItem: { type: 'category', itemCategory: 'profileCreationAdvicesPage' },
    listOfItems: [
      { type: 'item', itemId: 'IDhowToCreateAttractiveProfile' },
    ],
  },
  profileCreationAdvicesPage: {
    itemType: 'profileCreationAdvices',
    ui: 'page',
    listOfItems: [
      { type: 'item', itemId: 'IDhowToCreateAttractiveProfile' },
    ],
  },
}

