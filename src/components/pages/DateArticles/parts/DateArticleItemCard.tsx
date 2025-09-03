import styled from '@emotion/styled'
import { TypeU } from '@utils/base/TypeU.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle'
import React, { useMemo } from 'react'
import { emptyUiText, UiTextValues } from '@libs/ui-text/UiText.ts'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import {
  DateArticleItem,
  DateArticleCategoriesData,
} from 'src/configs/date-article/DateArticleCategoriesData.ts'
import { DateArticlesData } from 'src/configs/date-article/DateArticlesData.ts'
import {
  DateArticleTypesData,
} from 'src/configs/date-article/DateArticleTypesData.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import ImgSpark from 'src/components/elems/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/components/elems/ImgSpark/ImgSparkS6.ts'
import ArticleItemLink from 'src/components/pages/DateArticles/parts/ArticleItemLink.tsx'
import Txt = EmotionCommon.Txt
import rowC = EmotionCommon.rowC
import ClassStyle = ReactU.ClassStyle
import ArrowAngledRoundedIc from 'src/components/elems/icons/SvgIcons/pack/ui/ArrowAngledRoundedIc.tsx'
import assertNever = TypeU.assertNever
import col = EmotionCommon.col



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
          css={ImgSparkS6.t(ImgSparkS6.S.img.img.absTrbl.normal)}
          src={picture}
        />
        
        <MiniPosterImageFade/>
        
        <ContentBox>
          
          <Title>{title}</Title>
          
          {showToRead && (
            <ReadItBox>
              <ReadItText>{uiText.toRead}</ReadItText>
              <ArrowAngledRoundedIc css={SvgIconS6.t(arrowIcS)}/>
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
  ${col};
  justify-content: end;
  gap: 8px;
`



const Title = styled.div`
  // TODO Theme
  color: white;
  ${Txt.s17Wide};
  white-space: pre-line;
`


const ReadItBox = styled.div`
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
