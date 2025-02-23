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
import { DatePlace, DatePlacesData } from 'src/ui-data/special/DatePlacesData.ts'
import Children = ReactU.Children
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle
import Txt = EmotionCommon.Txt
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import full = RouteBuilder.full
import fullParams = RouteBuilder.fullParams





export type DatePlaceCardProps = ClassStyle & {
  place: DatePlace
}
export const DatePlaceCard = React.memo((props: DatePlaceCardProps) => {
  const {
    className,
    style,
    place,
  } = props
  
  const uiValues = useUiValues(place.uiText)
  
  const uiText = useMemo(() => ({
    name: uiValues.name,
  }), [uiValues])
  
  
  const navigate = useNavigate()
  const [search] = useSearchParams()
  
  const selectPlace = () => {
    /* navigate(RootRoute.datePlaces[fullParams]({
      anySearchParams: search,
      allowedNameParams: {
        place: place,
        type: null,
      },
    })) */
  }
  
  
  return (
    <DatePlaceBox
      className={className}
      style={style}
      data-display-name="DatePlaceCard"
      onClick={selectPlace}
    >
      <ImgSpark
        css={ImgSparkS6.t(ImgSparkS6.S.img.img.full.normal)}
        src={place.picture}
      />
      <Title>{uiText.name}</Title>
    </DatePlaceBox>
  )
})
DatePlaceCard.displayName = 'DatePlaceCard'
export default DatePlaceCard



const DatePlaceBox = styled(Card)`
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

