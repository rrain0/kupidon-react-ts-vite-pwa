import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'

import { Pu } from '@utils/base/tsUtils.ts'
import col = EmotionCommon.col
import row = EmotionCommon.row
import Txt = EmotionCommon.Txt
import rowC = EmotionCommon.rowC
import rowWrapC = EmotionCommon.rowWrapC



export type Compatibility = 'high' | 'medium'

export type PersonalityCompatibilityProps = Pu<{
  compatibility: Compatibility
  compatibles: string[]
}>
export const PersonalityCompatibility = React.memo((props: PersonalityCompatibilityProps) => {
  const {
    compatibility = 'high',
    compatibles,
  } = props
  
  const title = (() => {
    if (compatibility === 'high') return 'Отлично совместимы'
    if (compatibility === 'medium') return 'Совместитмы'
    //if (compatibility === 'low') return 'Менее совместимы'
  })()
  
  return (
    <Card
      data-display-name="PersonalityCompatibility"
      compatibility={compatibility}
    >
      <TitleBox>
        <Title>{title}</Title>
        {/* <PercentTopRight>{percent}</PercentTopRight> */}
      </TitleBox>
      <Types>
        {compatibles?.map(c => (
          <TypeBox key={c}>
            <TypeContent>
              {c}
            </TypeContent>
          </TypeBox>
        ))}
        {/* <PercentRight>{percent}</PercentRight> */}
      </Types>
      {/* <PercentBottom>{percent}</PercentBottom> */}
    </Card>
  )
})
PersonalityCompatibility.displayName = 'PersonalityCompatibility'
export default PersonalityCompatibility



const boxLocalTheme = {
  boxNeutral: {
    bg:    '#cccccc',
    ct:    '#333333',
    ctSec: '#676767',
  },
  boxSuccess: {
    bg:    '#d0debd',
    ct:    '#1B842F',
    ctSec: '#676767',
  },
  boxWarn: {
    bg:    '#f7d9b8',
    ct:    '#9E5F14',
    ctSec: '#676767',
  },
  boxDanger: {
    bg:    '#f7b8b8',
    ct:    '#c52525',
    ct2:   '#ff6b6b',
    ctSec: '#676767',
  },
}



const Card = styled.div<{ compatibility: Compatibility }>`
  border-radius: 15px;
  padding: 10px 16px;
  ${col};
  gap: 16px;
  ${p => {
    // TODO Style - extract colors to goodBox, warnBox, dangerBox
    if (p.compatibility === 'high') return {
      backgroundColor: boxLocalTheme.boxSuccess.bg,
      color: boxLocalTheme.boxSuccess.ct,
    }
    if (p.compatibility === 'medium') return {
      backgroundColor: boxLocalTheme.boxNeutral.bg,
      color: boxLocalTheme.boxNeutral.ct,
    }
  }}
`




const TitleBox = styled.div`
  ${row};
  justify-content: space-between;
  gap: 15px;
`
const Title = styled.div`
  ${Txt.s16Bold};
`


const Types = styled.div`
  ${rowWrapC};
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
  ${Txt.s16Bold};
`

const PercentTopRight = styled.div`
  align-self: center;
  //color: #171717;
  color: #676767;
  ${Txt.s15Bold};
`
const PercentRight = styled.div`
  min-width: 60px;
  flex: 1;
  ${row};
  justify-content: end;
  //color: #171717;
  color: #676767;
  ${Txt.s15Bold};
`
const PercentBottom = styled.div`
  align-self: end;
  color: #171717;
  ${Txt.s15Bold};
`


