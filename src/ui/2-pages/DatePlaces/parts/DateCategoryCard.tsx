import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { DatePlaceType, DatePlaceTypeData } from 'src/ui-data/special/DatePlaceTypeData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Card from 'src/ui/0-elements/Card/Card.tsx'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle
import Txt = EmotionCommon.Txt
import RootRoute = AppRoutes.RootRoute
import fullParams = RouteBuilder.fullParams
import col = EmotionCommon.col
import colC = EmotionCommon.colC





export type DateCategoryCardProps = ClassStyle & Puro<{
  category: DatePlaceType
  isType: boolean
}>
export const DateCategoryCard = React.memo((props: DateCategoryCardProps) => {
  const {
    className,
    style,
    category = 'romantic',
    isType,
  } = props
  
  const data = DatePlaceTypeData[category]
  const uiValues = useMemo(() => ({
    name: data.name,
  }), [data])
  
  const uiText = useUiValues(uiValues)
  
  const [search] = useSearchParams()
  
  const link = isType
    ? RootRoute.datePlaces[fullParams]({
      anySearchParams: search,
      allowedNameParams: {
        category: null,
        type: category,
      },
    })
    : RootRoute.datePlaces[fullParams]({
      anySearchParams: search,
      allowedNameParams: {
        category: category,
        type: null,
      },
    })
  
  
  return (
    <Link to={link}>
      <DateCategoryBox
        className={className}
        style={style}
        data-display-name="DateCategoryCard"
      >
        <ImgSpark
          css={ImgSparkS6.t(imgSparkS)}
          src={data.picture}
        />
        <InfoBox>
          <Title>{uiText.name}</Title>
        </InfoBox>
      </DateCategoryBox>
    </Link>
  )
})
DateCategoryCard.displayName = 'DateTypeCard'
export default DateCategoryCard



const DateCategoryBox = styled(Card)`
  ${p => CardS.card3S(p.theme)};
  width: 233px;
  height: fit-content;
  padding: 0;
  gap: 0;
  ${col};
  box-shadow: ${StyleVals.shadowLightSz} ${p => p.theme.shadow.bg2};
  cursor: pointer;
`

const imgSparkS: AppWidgetStyle = [
  ImgSparkS6.S.img.img.wFull.normal, {
    imgFrame: { ratio: 1.371 },
  },
]

const InfoBox = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 44px;
  ${colC};
  justify-content: center;
  gap: 5px;
  padding: 10px 2px;
`
const Title = styled.div`
  // TODO Theme
  color: black;
  ${Txt.s17Bold};
  overflow-wrap: anywhere;
`

