import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Card from 'src/ui/0-elements/Card/Card.tsx'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { DateCategory, DateCategoryData } from 'src/ui-data/special/DateCategoryData.ts'
import Children = ReactU.Children
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle
import Txt = EmotionCommon.Txt
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import full = RouteBuilder.full





export type DateCategoryCardProps = ClassStyle & Children & Puro<{
  category: DateCategory
}>
export const DateCategoryCard = React.memo((props: DateCategoryCardProps) => {
  const {
    className,
    style,
    category = 'romantic',
  } = props
  
  const data = DateCategoryData[category]
  const uiValues = useUiValues(data.uiText)
  
  const uiText = useMemo(() => ({
    dateTypeName: uiValues.name,
  }), [uiValues])
  
  
  const navigate = useNavigate()
  const [search] = useSearchParams()
  
  const setCategory = () => {
    const newSearch = new URLSearchParams(search)
    newSearch.set(RootRoute.datePlaces[params].category, category)
    navigate(RootRoute.datePlaces[full]() + '?' + newSearch.toString())
  }
  
  
  return (
    <DateTypeBox
      className={className}
      style={style}
      data-display-name="DateCategoryCard"
      onClick={setCategory}
    >
      <ImgSpark
        css={ImgSparkS6.t(ImgSparkS6.S.img.img.full.normal)}
        src={data.picture}
      />
      <Title>{uiText.dateTypeName}</Title>
    </DateTypeBox>
  )
})
DateCategoryCard.displayName = 'DateTypeCard'
export default DateCategoryCard



const DateTypeBox = styled(Card)`
  ${p => CardS.card3S(p.theme)};
  width: 171px;
  aspect-ratio: 0.924;
  height: auto;
  padding: 0;
  gap: 0;
  display: grid;
  grid-template-rows: 1fr 44px;
  place-items: center;
  box-shadow: ${StyleVals.shadowLightSz} ${p => p.theme.shadow.bg2};
  cursor: pointer;
`
const Title = styled.div`
  // TODO Theme
  color: black;
  ${Txt.s17Bold};
`

