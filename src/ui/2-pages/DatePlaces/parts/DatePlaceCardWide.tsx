import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Card from 'src/ui/0-elements/Card/Card.tsx'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { DatePlace } from 'src/ui-data/special/date-place/DatePlacesData.ts'
import ClassStyle = ReactU.ClassStyle
import Txt = EmotionCommon.Txt
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import fullParams = RouteBuilder.fullParams
import use = RouteBuilder.use
import col = EmotionCommon.col
import rowWrap = EmotionCommon.rowWrap
import rowC = EmotionCommon.rowC




const uiVals = {
  itNear: {
    'ru-RU': 'Близко',
  },
} satisfies UiValues


export type DatePlaceCardProps = ClassStyle & {
  place: DatePlace
}
export const DatePlaceCardWide = React.memo((props: DatePlaceCardProps) => {
  const {
    className,
    style,
    place,
  } = props
  
  
  
  const uiValues = useMemo(() => ({
    itNear: uiVals.itNear,
    name: place.name,
    shortDescription: place.shortDescription,
  }), [place])
  
  const uiText = useUiValues(uiValues)
  
  
  const navigate = useNavigate()
  const [search] = useSearchParams()
  
  const selectPlace = () => {
    const placesParams = RootRoute.datePlaces[params]
    navigate(RootRoute.datePlace.placeId[use](place.id)[fullParams]({
      anySearchParams: search,
      anyParams: {
        [placesParams.category]: null,
        [placesParams.type]: null,
      },
    }))
  }
  
  
  return (
    <DatePlaceBox
      className={className}
      style={style}
      data-display-name="DatePlaceCardWide"
      onClick={selectPlace}
    >
      <ImgSpark
        css={ImgSparkS6.t(imgSparkS)}
        src={place.picture}
      />
      <InfoBox>
        <Title>{uiText.name}</Title>
        <ShortDescription>{uiText.shortDescription}</ShortDescription>
      </InfoBox>
      <BubblesBox>
        {place.isNear && <Bubble>{uiText.itNear}</Bubble>}
      </BubblesBox>
    </DatePlaceBox>
  )
})
DatePlaceCardWide.displayName = 'DatePlaceCardWide'
export default DatePlaceCardWide



const DatePlaceBox = styled(Card)`
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
  color: ${p => p.theme.boxAccent6Ct.ct};
  ${Txt.s17Bold};
`
const ShortDescription = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  color: ${p => p.theme.boxSecondary2.ct};
  ${Txt.s14};
`

