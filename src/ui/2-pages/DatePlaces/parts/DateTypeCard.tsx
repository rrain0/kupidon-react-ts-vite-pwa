import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Card from 'src/ui/0-elements/Card/Card.tsx'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { DateType, DateTypeData } from 'src/ui-data/special/DateTypeData.ts'
import Children = ReactU.Children
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle
import Txt = EmotionCommon.Txt





export type DateTypeCardProps = ClassStyle & Children & Puro<{
  type: DateType
}>
export const DateTypeCard = React.memo((props: DateTypeCardProps) => {
  const {
    className,
    style,
    type = 'romantic',
  } = props
  
  const typeData = DateTypeData[type]
  const typeUiText = useUiValues(typeData.uiText)
  
  const uiText = useMemo(() => ({
    dateTypeName: typeUiText.name,
  }), [typeUiText])
  
  return (
    <DateTypeBox
      className={className}
      style={style}
      data-display-name="DateTypeCard"
    >
      <ImgSpark
        css={ImgSparkS6.t(ImgSparkS6.S.img.img.full.normal)}
        src={typeData.picture}
      />
      <Title>{uiText.dateTypeName}</Title>
    </DateTypeBox>
  )
})
DateTypeCard.displayName = 'DateTypeCard'
export default DateTypeCard



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
`
const Title = styled.div`
  // TODO Theme
  color: black;
  ${Txt.s17Bold};
`

