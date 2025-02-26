import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { DateType, DateTypeData } from 'src/ui-data/special/DateTypeData.ts'
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle
import Txt = EmotionCommon.Txt
import RootRoute = AppRoutes.RootRoute
import fullParams = RouteBuilder.fullParams
import rowC = EmotionCommon.rowC





export type DateTypeCardProps = ClassStyle & Puro<{
  type: DateType
}>
export const DateTypeCard = React.memo((props: DateTypeCardProps) => {
  const {
    className,
    style,
    type = 'cafe',
  } = props
  
  const data = DateTypeData[type]
  const uiValues = useMemo(() => ({
    name: data.name,
  }), [data])
  
  const uiText = useUiValues(uiValues)
  
  
  const navigate = useNavigate()
  const [search] = useSearchParams()
  
  const selectType = () => {
    navigate(RootRoute.datePlaces[fullParams]({
      anySearchParams: search,
      allowedNameParams: {
        category: null,
        type: type,
      },
    }))
  }
  
  return (
    <Button
      className={className}
      css={ButtonS6.t(dateTypeBoxS)}
      style={style}
      data-display-name="DateTypeCard"
      onClick={selectType}
    >
      <IconBox>
        <data.icon
          css={SvgIconS6.t([SvgIconS6.S.icon.icon.full.normal, { iconColor: data.color }])}
        />
      </IconBox>
      
      <Title>{uiText.name}</Title>
    </Button>
  )
})
DateTypeCard.displayName = 'DateTypeCard'
export default DateTypeCard



const dateTypeBoxS: AppWidgetStyle = t => [
  ButtonS6.S.filled.rect.lg.normal4, {
    button: {
      hMin: 60, p: [12, 16], g: 16,
      boxShadow: `${StyleVals.shadowLightSz} ${t.shadow.bg2}`,
      display: 'grid', cols: 'auto 1fr', placeItems: 'center start',
    },
  },
]

const IconBox = styled.div`
  width: 36px;
  height: 36px;
  ${rowC};
`

const iconS: AppWidgetStyle = t => [
  SvgIconS6.S.icon.icon.full.normal, {
    icon: { sz: 36 },
  },
]

const Title = styled.div`
  ${Txt.s17};
`

