import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { DatePlaceCategoriesData, DatePlaceCategoryType } from 'src/ui-data/special/date-place/DatePlaceCategoriesData.ts'
import { DatePlaceTypeData } from 'src/ui-data/special/date-place/DatePlaceTypeData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import { ReactU } from '@util/react/ReactU.ts'
import ClassStyle = ReactU.ClassStyle
import Txt = EmotionCommon.Txt
import RootRoute = AppRoutes.RootRoute
import fullParams = RouteBuilder.fullParams
import flexC = EmotionCommon.flexC
import maxLines = EmotionCommon.maxLines




export type DatePlaceCategoryCardProps = ClassStyle & {
  category: DatePlaceCategoryType
}
export const DatePlaceCategoryCard = React.memo((props: DatePlaceCategoryCardProps) => {
  const {
    className,
    style,
    category,
  } = props
  
  const categoryData = DatePlaceCategoriesData[category]
  const typeData = DatePlaceTypeData[categoryData.placeType]
  
  const uiValues = useMemo(() => ({
    name: typeData.name,
  }), [typeData])
  const uiText = useUiValues(uiValues)
  
  const [search] = useSearchParams()
  
  const link = categoryData.type === 'type'
    ? RootRoute.datePlaces[fullParams]({
      anySearchParams: search,
      allowedNamedParams: {
        category: null,
        type: categoryData.placeType,
      },
    })
    : RootRoute.datePlaces[fullParams]({
      anySearchParams: search,
      allowedNamedParams: {
        category: category,
        type: null,
      },
    })
  
  
  return (
    <Link to={link}>
      <CardBox
        className={className}
        style={style}
        data-display-name='DatePlaceCategoryCard'
      >
        
        <ImgSpark
          css={ImgSparkS6.t(ImgSparkS6.S.img.img.absFull.normal)}
          src={typeData.picture}
        />
        
        <InfoBox>
          <TitleBox>
            <Title>{uiText.name}</Title>
          </TitleBox>
        </InfoBox>
        
      </CardBox>
    </Link>
  )
})
DatePlaceCategoryCard.displayName = 'DatePlaceCategoryCard'
export default DatePlaceCategoryCard



const CardBox = styled.article`
  position: relative;
  width: 233px;
  aspect-ratio: 1.084;
  border-radius: ${StyleVals.cardRadius}px;
  overflow: hidden;
`


const InfoBox = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: grid;
  grid:
    '.....' 1fr
    'title' 40px
    /100%;
`
const TitleBox = styled.div`
  grid-area: title;
  width: 100%;
  height: 100%;
  padding: 2px 6px;
  ${flexC};
  background-color: #ffffffbb;
`
const Title = styled.div`
  // TODO Theme
  color: black;
  ${Txt.s16Bold};
  line-height: 1;
  text-align: center;
  ${maxLines(2)};
`

