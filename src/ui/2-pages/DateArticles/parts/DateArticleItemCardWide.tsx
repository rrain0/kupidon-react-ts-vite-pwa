import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import React, { useMemo } from 'react'
import { emptyUiText, UiTextValues } from 'src/mini-libs/ui-text/UiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import {
  DateArticleItem,
  DateArticleCategoriesData,
} from 'src/ui-data/special/date-article/DateArticleCategoriesData.ts'
import { DateArticlesData } from 'src/ui-data/special/date-article/DateArticlesData.ts'
import {
  DateArticleTypesData,
} from 'src/ui-data/special/date-article/DateArticleTypesData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Card from 'src/ui/0-elements/Card/Card.tsx'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import ArticleItemLink from 'src/ui/2-pages/DateArticles/parts/ArticleItemLink.tsx'
import Txt = EmotionCommon.Txt
import rowC = EmotionCommon.rowC
import ClassStyle = ReactU.ClassStyle
import assertNever = TypeU.assertNever
import col = EmotionCommon.col
import rowWrap = EmotionCommon.rowWrap



const uiVals = {
  toRead: {
    'ru-RU': 'Читать',
  },
} satisfies UiTextValues


export type DateArticleItemCardWideProps = ClassStyle & {
  articleItem: DateArticleItem
}
const DateArticleItemCardWide = React.memo((props: DateArticleItemCardWideProps) => {
  const {
    className,
    style,
    articleItem: ait,
  } = props
  
  const data = (() => {
    if (ait.type === 'category') {
      const category = DateArticleCategoriesData[ait.itemCategory]
      const type = DateArticleTypesData[category.itemType]
      return {
        title: type.name,
        picture: type.picture,
        isArticle: false,
      }
    }
    if (ait.type === 'type') {
      const type = DateArticleTypesData[ait.itemType]
      return {
        title: type.name,
        picture: type.picture,
        isArticle: false,
      }
    }
    if (ait.type === 'item') {
      const item = DateArticlesData.find(a => a.id === ait.itemId)
      if (!item) return undefined
      return {
        title: item.title,
        picture: item.picture,
        isArticle: true,
        shortDescription: item.shortDescription,
      }
    }
    return assertNever(ait)
  })()
  
  const uiValues = useMemo(() => ({
    title: data?.title ?? emptyUiText,
    shortDescription: data?.shortDescription ?? emptyUiText,
  }), [])
  const uiText = useUiValues(uiValues)
  
  if (!data) return undefined
  
  return (
    <ArticleItemLink articleItem={ait}>
      <DateArticleBox
        data-display-name="DateArticleCard"
        className={className}
        style={style}
      >
        <ImgSpark
          css={ImgSparkS6.t(imgSparkS)}
          src={data.picture}
        />
        <InfoBox>
          <Title>{uiText.title}</Title>
          <ShortDescription>{uiText.shortDescription}</ShortDescription>
        </InfoBox>
        <BubblesBox></BubblesBox>
      </DateArticleBox>
    </ArticleItemLink>
  )
})
DateArticleItemCardWide.displayName = 'DateArticleItemCardWide'
export default DateArticleItemCardWide



const DateArticleBox = styled(Card)`
  ${p => CardS.card3S(p.theme)};
  position: relative;
  width: 100%;
  height: fit-content;
  padding: 0;
  gap: 0;
  ${col};
  box-shadow: ${StyleVals.shadowLightSz} ${p => p.theme.shadow.bg2};
  cursor: pointer;
`

const BubblesBox = styled.div`
  position: absolute;
  top: 9px;
  left: 9px;
  ${rowWrap};
  gap: 4px;
`
const Bubble = styled.div`
  height: 20px;
  border-radius: 999999px;
  padding: 0 10px;
  // TODO Theme
  background-color: white;
  ${rowC};
  // TODO Theme
  color: #232020;
  ${Txt.s12Bold};
`


const imgSparkS: AppWidgetStyle = [
  ImgSparkS6.S.img.img.wFull.normal, {
    imgFrame: { ratio: 2.594 },
  },
]

const InfoBox = styled.div`
  width: 100%;
  height: fit-content;
  ${col};
  gap: 5px;
  padding: 10px 16px 16px;
`
const Title = styled.div`
  // TODO Theme
  color: black;
  ${Txt.s17Bold};
`
const ShortDescription = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  // TODO Theme
  color: #939393;
  ${Txt.s14};
`
