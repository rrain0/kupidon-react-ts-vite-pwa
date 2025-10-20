import styled from '@emotion/styled'

import { flexStyle } from '@libs/style-as-short-props/style/flexStyle.ts'
import React from 'react'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Flex from '@libs/style-as-short-props/elems/Flex.tsx'
import HeartsDoubleIc from 'src/components/elems/icons/SvgIcons/pack/special/HeartsDoubleIc.tsx'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import ImgSpark from 'src/components/elems/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/components/elems/ImgSpark/ImgSparkS6.ts'
import EmptyAva from 'src/components/widgets/avatars/Ava/EmptyAva.tsx'
import { Pu } from '@utils/base/tsUtils.ts'







export type AvaContentProps = {
  id: string
  ava?: string | undefined
  online?: boolean | undefined
  mutualSympathy?: boolean | undefined
  shadow?: boolean | undefined
}



const AvaContent = React.memo((props: AvaContentProps) => {
  const {
    id, ava, online, mutualSympathy, shadow,
  } = props
  
  return (
    <>
      <AvaBox full shadow={shadow}>
        {ava && <ImgSpark css={ImgSparkS6.t(ImgSparkS6.S.img.square.full.normal)} src={ava}/>}
        {!ava && <EmptyAva id={id}/>}
      </AvaBox>
      {mutualSympathy && (
        <NewPairMarkBox center shadow={shadow}>
          <HeartsDoubleIc css={SvgIconS6.t(heartsDoubleIcS)}/>
        </NewPairMarkBox>
      )}
      {online && <OnlineMark/>}
    </>
  )
})
AvaContent.displayName = 'AvaContent'
export default AvaContent




const AvaBox = styled(Flex)<Pu<{ shadow: boolean }>>(({
  theme: t, shadow,
}) => (flexStyle({
  round: true, noOverflow: true,
  ...shadow && { boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` },
})))



const OnlineMark = styled(Flex)(flexStyle({
  absolute: true, b: '10%', r: '10%', sz: 13, round: true,
  transform: 'translate3d(4.5px, 4.5px, 0)',
  // TODO Theme
  border: '2px solid #f5f5f5',
  // TODO Theme
  bgColor: '#19aa1e',
}))


const NewPairMarkBox = styled(Flex)<Pu<{ shadow: boolean }>>(({
  theme: t, shadow,
}) => (flexStyle({
  absolute: true, t: '-2%', l: '-4%', w: '36%', ratio: 1, round: true,
  bg: `linear-gradient(
    to bottom, ${t.boxAccentCt4.ctGrad[0]}, ${t.boxAccentCt4.ctGrad[1]}
  )`,
  ...shadow && { boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` },
})))
const heartsDoubleIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: '46%', ml: 1, w: 'auto', color: '#ffffff'/* , color: t.boxAccentCt4.ct */ },
}]

