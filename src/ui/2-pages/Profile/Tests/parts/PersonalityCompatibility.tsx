import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { TypeU } from 'src/util/common/TypeU'
import Puro = TypeU.Puro
import col = EmotionCommon.col
import rowWrap = EmotionCommon.rowWrap
import row = EmotionCommon.row
import Txt = EmotionCommon.Txt
import rowC = EmotionCommon.rowC



type Compatibility = 'high' | 'medium' | 'low'

export type PersonalityCompatibilityProps = Puro<{
  compatibility: Compatibility
  compatibles: string[]
  percent: string
}>
export const PersonalityCompatibility = React.memo((props: PersonalityCompatibilityProps) => {
  const {
    compatibility = 'high',
    compatibles,
    percent,
  } = props
  
  const title = (() => {
    if (compatibility === 'high') return 'Отлично совместимы'
    if (compatibility === 'medium') return 'Средне совместитмы'
    if (compatibility === 'low') return 'Менее совместимы'
  })()
  
  return (
    <Card
      data-display-name="PersonalityCompatibility"
      compatibility={compatibility}
    >
      <Title>{title}</Title>
      <List>
        <Types>
          {compatibles?.map(c => (
            <TypeBox key={c}>
              <TypeContent>
                {c}
              </TypeContent>
            </TypeBox>
          ))}
        </Types>
        <Percent>{percent}</Percent>
      </List>
    </Card>
  )
})
PersonalityCompatibility.displayName = 'PersonalityCompatibility'
export default PersonalityCompatibility




const Card = styled.div<{ compatibility: Compatibility }>`
  border-radius: 15px;
  padding: 10px 16px;
  ${col};
  gap: 16px;
  ${p => {
    if (p.compatibility === 'high') return {
      backgroundColor: '#A2C17770', color: '#1B842F',
    }
    if (p.compatibility === 'medium') return {
      backgroundColor: '#FAB76A70', color: '#9E5F14',
    }
    if (p.compatibility === 'low') return {
      backgroundColor: '#FA6A6A70', color: '#c52525',
    }
  }}
`

const Title = styled.div`
  ${Txt.lg16Bold};
`

const List = styled.div`
  ${row};
  gap: 15px;
`

const Types = styled.div`
  ${rowWrap};
  flex: 1;
  gap: 15px;
`
const TypeBox = styled.div`
  min-height: 30px;
  background-color: #ffffff;
  border-radius: 999999px;
  padding: 5.5px 18px;
  ${rowC};
`
const TypeContent = styled.div`
  color: #171717;
  ${Txt.lg16Bold};
  
`

const Percent = styled.div`
  color: #171717;
  ${Txt.s15Bold};
`

