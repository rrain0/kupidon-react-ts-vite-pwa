import styled from '@emotion/styled'
import { ReactU } from '@utils/react/ReactU.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle'
import React from 'react'
import { UiTextValues } from 'src/mini-libs/ui-text/UiText.ts'
import {
  DateArticleItem,
} from 'src/ui-data/special/date-article/DateArticleCategoriesData.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Card from 'src/ui/0-elements/Card/Card.tsx'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import ArticleItemLink from 'src/ui/2-pages/DateArticles/parts/ArticleItemLink.tsx'
import Txt = EmotionCommon.Txt
import rowC = EmotionCommon.rowC
import ClassStyle = ReactU.ClassStyle
import col = EmotionCommon.col
import rowWrap = EmotionCommon.rowWrap



const uiVals = {
  toRead: {
    'ru-RU': 'Читать',
  },
} satisfies UiTextValues


export type DateArticleItemCardWideProps = ClassStyle & {
  articleItem: DateArticleItem
  title: string
  picture: string
  shortDescription?: string | undefined
}
const DateArticleItemCardWide = React.memo((props: DateArticleItemCardWideProps) => {
  const {
    className,
    style,
    articleItem: ait,
    title,
    picture,
    shortDescription,
  } = props
  
  return (
    <ArticleItemLink articleItem={ait}>
      <DateArticleBox
        data-display-name="DateArticleCard"
        className={className}
        style={style}
      >
        <ImgSpark
          css={ImgSparkS6.t(imgSparkS)}
          src={picture}
        />
        <InfoBox>
          <Title>{title}</Title>
          {shortDescription && <ShortDescription>{shortDescription}</ShortDescription>}
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
  ImgSparkS6.S.img.img.fullW.normal, {
    imgFrame: { ratio: 2.594 },
  },
]

const InfoBox = styled.div`
  width: 100%;
  height: fit-content;
  padding: 12px 16px;
  gap: 5px;
  ${col};
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
