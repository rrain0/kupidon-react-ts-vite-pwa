import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import Card from 'src/ui/0-elements/Card/Card.tsx'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { DateType, DateTypeData } from 'src/ui-data/special/DateTypeData.ts'
import Children = ReactU.Children
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle
import Txt = EmotionCommon.Txt
import OnClick = ReactU.OnClick
import SoupIc = SvgIconsPack.SoupIc





export type DateTypeCardProps = ClassStyle & Children & Puro<{
  type: DateType
  onClick: OnClick
}>
export const DateTypeCard = React.memo((props: DateTypeCardProps) => {
  const {
    className,
    style,
    type = 'cafe',
    onClick,
  } = props
  
  const data = DateTypeData[type]
  const uiValues = useUiValues(data.uiText)
  
  const uiText = useMemo(() => ({
    dateTypeName: uiValues.name,
  }), [uiValues])
  
  return (
    <Button
      className={className}
      css={ButtonS6.t(dateTypeBoxS)}
      style={style}
      data-display-name="DateTypeCard"
      onClick={onClick}
    >
      {({
        cafe: <SoupIc css={SvgIconS6.t([iconS, { iconColor: DateTypeData.cafe.color }])} />,
      } satisfies Record<DateType, React.ReactNode>)[type]}
      <Title>{uiText.dateTypeName}</Title>
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

const iconS: AppWidgetStyle = t => [
  SvgIconS6.S.icon.icon.full.normal, {
    icon: { sz: 36 },
  },
]

const Title = styled.div`
  ${Txt.s17};
`

