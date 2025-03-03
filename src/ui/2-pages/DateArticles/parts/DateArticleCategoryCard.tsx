import styled from '@emotion/styled'
import { ReactU } from '@util/react/ReactU.ts'
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import React, { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { UiTextValues } from 'src/mini-libs/ui-text/UiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import {
  DateArticleCategoriesData,
  DateArticleCategoryType,
} from 'src/ui-data/special/date-article/DateArticleCategoriesData.ts'
import {
  DateArticleTypeData,
} from 'src/ui-data/special/date-article/DateArticleTypeData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import Txt = EmotionCommon.Txt
import rowC = EmotionCommon.rowC
import ClassStyle = ReactU.ClassStyle
import ArrowAngledRoundedIc = SvgIconsPack.ArrowAngledRoundedIc
import RootRoute = AppRoutes.RootRoute
import fullParams = RouteBuilder.fullParams



const uiVals = {
  toRead: {
    'ru-RU': 'Читать',
  },
} satisfies UiTextValues


export type DateArticleCategoryCardProps = ClassStyle & {
  category: DateArticleCategoryType
}
const DateArticleCategoryCard = React.memo((props: DateArticleCategoryCardProps) => {
  const {
    className,
    style,
    category,
  } = props
  
  const categoryData = DateArticleCategoriesData[category]
  const typeData = DateArticleTypeData[categoryData.articleType]
  
  const uiValues = useMemo(() => ({
    title: typeData.name,
    toRead: uiVals.toRead,
  }), [])
  const uiText = useUiValues(uiValues)
  
  const [search] = useSearchParams()
  
  const link = categoryData.type === 'type'
    ? RootRoute.dateArticles[fullParams]({
      anySearchParams: search,
      allowedNameParams: {
        category: null,
        type: categoryData.articleType,
      },
    })
    : RootRoute.dateArticles[fullParams]({
      anySearchParams: search,
      allowedNameParams: {
        category: category,
        type: null,
      },
    })
  
  
  
  return (
    <Link to={link}>
      <CardBox
        className={className}
        style={style}
        data-display-name="DateArticleCategoryCard"
      >
        
        
        <ImgSpark
          css={ImgSparkS6.t(ImgSparkS6.S.img.img.absFull.normal)}
          src={typeData.picture}
        />
        
        <MiniPosterImageFade />
        
        <ContentBox>
          
          <Title>{uiText.title}</Title>
          
          <ReadItBox>
            <ReadItText>{uiText.toRead}</ReadItText>
            <ArrowAngledRoundedIc css={SvgIconS6.t(arrowIcS)} />
          </ReadItBox>
          
        </ContentBox>
        
      </CardBox>
    </Link>
  )
})
DateArticleCategoryCard.displayName = 'DateArticleCategoryCard'
export default DateArticleCategoryCard



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
