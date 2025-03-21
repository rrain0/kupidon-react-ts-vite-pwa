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
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import ArticleItemLink from 'src/ui/2-pages/DateArticles/parts/ArticleItemLink.tsx'
import Txt = EmotionCommon.Txt
import rowC = EmotionCommon.rowC
import ClassStyle = ReactU.ClassStyle
import ArrowAngledRoundedIc = SvgIconsPack.ArrowAngledRoundedIc
import assertNever = TypeU.assertNever



const uiVals = {
  toRead: {
    'ru-RU': 'Читать',
  },
} satisfies UiTextValues


export type DateArticleItemCardProps = ClassStyle & {
  articleItem: DateArticleItem
  title: string
  picture: string
  showToRead: boolean
}
const DateArticleItemCard = React.memo((props: DateArticleItemCardProps) => {
  const {
    className,
    style,
    articleItem: ait,
    title,
    picture,
    showToRead,
  } = props
  
  const uiValues = useMemo(() => ({
    toRead: uiVals.toRead,
  }), [])
  const uiText = useUiValues(uiValues)
  
  return (
    <ArticleItemLink articleItem={ait}>
      <CardBox
        data-display-name="DateArticleItemCard"
        className={className}
        style={style}
      >
        
        
        <ImgSpark
          css={ImgSparkS6.t(ImgSparkS6.S.img.img.absFull.normal)}
          src={picture}
        />
        
        <MiniPosterImageFade />
        
        <ContentBox>
          
          <Title>{title}</Title>
          
          {showToRead && (
            <ReadItBox>
              <ReadItText>{uiText.toRead}</ReadItText>
              <ArrowAngledRoundedIc css={SvgIconS6.t(arrowIcS)} />
            </ReadItBox>
          )}
          
        </ContentBox>
        
      </CardBox>
    </ArticleItemLink>
  )
})
DateArticleItemCard.displayName = 'DateArticleItemCard'
export default DateArticleItemCard



const CardBox = styled.article`
  position: relative;
  width: 233px;
  aspect-ratio: 1.084;
  border-radius: ${StyleVals.cardRadius}px;
  overflow: hidden;
`




const MiniPosterImageFade = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0.69deg,
    #010101B0 1.76%,
    #6B6B6B5E 99.4%
  );
`


const ContentBox = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 12px 11px 10px;
  display: grid;
  grid:
    'desc' 1fr
    '....' 8px
    'read' auto
    /100%;
`



const Title = styled.div`
  grid-area: desc;
  align-self: end;
  // TODO Theme
  color: white;
  ${Txt.s17Wide};
  white-space: pre-line;
`


const ReadItBox = styled.div`
  grid-area: read;
  //margin-top: 19px;
  ${rowC};
  gap: 3px;
`
const arrowIcS: AppWidgetStyle = t => [
  SvgIconS6.S.icon.icon.full.normal, {
    icon: {
      mt: -1,
      sz: 18,
      // TODO Theme
      color: '#FFFFFF8C',
    },
  },
]
const ReadItText = styled.div`
  // TODO Theme
  color: #FFFFFF8C;
  ${Txt.s17Wide};
`
