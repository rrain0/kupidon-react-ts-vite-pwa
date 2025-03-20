import { MockDateArticles } from 'src/_mock-data/date-articles/MockDateArticles.ts'
import { UiText } from 'src/mini-libs/ui-text/UiText.ts'
import { DateArticleType } from 'src/ui-data/special/date-article/DateArticleTypesData.ts'



export type DateArticle = {
  id: string
  types: DateArticleType[]
  title: UiText
  picture: string
  shortDescription: UiText
  content: string // TODO react-html-parser
}



export const DateArticlesData: DateArticle[] = MockDateArticles

