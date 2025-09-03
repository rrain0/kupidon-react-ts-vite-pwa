import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import {
  DatePlaceCategoriesData,
  DatePlaceCategoryType
} from 'src/configs/date-place/DatePlaceCategoriesData.ts'
import { DatePlaceTypeData } from 'src/configs/date-place/DatePlaceTypeData.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import ImgSpark from 'src/components/elems/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/components/elems/ImgSpark/ImgSparkS6.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import ClassStyle = ReactU.ClassStyle
import Txt = EmotionCommon.Txt
import RootRoute = AppRoutes.RootRoute
import flexC = EmotionCommon.flexC
import maxLines = EmotionCommon.maxLines
import AppLink from 'src/components/components/app-router/AppLink.tsx'




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
  
  return (
    <AppLink 
      toFull={RootRoute.datePlaces}
      allowedNamedParams={
        categoryData.type === 'type'
          ? { category: null, type: categoryData.placeType }
          : { category: category, type: null }
      }
    >
      <CardBox
        className={className}
        style={style}
        data-display-name='DatePlaceCategoryCard'
      >
        
        <ImgSpark
          css={ImgSparkS6.t(ImgSparkS6.S.img.img.absTrbl.normal)}
          src={typeData.picture}
        />
        
        <InfoBox>
          <TitleBox>
            <Title>{uiText.name}</Title>
          </TitleBox>
        </InfoBox>
        
      </CardBox>
    </AppLink>
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

