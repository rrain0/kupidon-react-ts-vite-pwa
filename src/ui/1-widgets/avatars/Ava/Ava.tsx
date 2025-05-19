import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import EmptyAva from 'src/ui/1-widgets/avatars/Ava/EmptyAva.tsx'
import HeartsDoubleIc = SvgIconsPack.HeartsDoubleIc
import Pu = TypeU.Pu






export type AvaExtraProps = {
  id: string
  ava?: string | undefined
  online?: boolean | undefined
  mutualSympathy?: boolean | undefined
  shadow?: boolean
}

export type AvaProps =
  & Omit<React.ComponentProps<typeof Flex>, 'children'>
  & AvaExtraProps



const Ava = React.memo((props: AvaProps) => {
  const {
    id, ava, online, mutualSympathy, shadow,
    ...restProps
  } = props
  
  return (
    <AvaContainer alignedStretch noShrink center
      data-display-name='Ava'
      {...restProps}
    >
      <AvaBox full shadow={shadow}>
        {ava && <ImgSpark css={ImgSparkS6.t(ImgSparkS6.S.img.img.full.normal)} src={ava}/>}
        {!ava && <EmptyAva id={id}/>}
      </AvaBox>
      {mutualSympathy && (
        <MutualSympathyMarkBox center shadow={shadow}>
          <HeartsDoubleIc css={SvgIconS6.t(heartsDoubleIcS)}/>
        </MutualSympathyMarkBox>
      )}
      {online && <OnlineMark/>}
    </AvaContainer>
  )
})
Ava.displayName = 'Ava'
export default Ava




const AvaContainer = styled(Flex)({
  position: 'relative',
  aspectRatio: 1,
})


const AvaBox = styled(Flex)<Pu<{ shadow: boolean }>>(({
  theme: t, shadow,
}) => ({
  borderRadius: 999999,
  overflow: 'hidden',
  ...shadow && { boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` },
}))


const OnlineMark = styled.div`
  position: absolute;
  bottom: 4%;
  right: 4%;
  width: 20%;
  height: 20%;
  // TODO Theme
  border: 2px solid #f5f5f5;
  border-radius: 999999px;
  // TODO Theme
  background-color: #19aa1e;
`


const MutualSympathyMarkBox = styled(Flex)<Pu<{ shadow: boolean }>>(({
  theme: t, shadow,
}) => ({
  position: 'absolute',
  top: '-2%',
  left: '-4%',
  width: '36%',
  aspectRatio: 1,
  borderRadius: 999999,
  background: `linear-gradient(
    to bottom, ${t.boxAccentCt4.ctGrad[0]}, ${t.boxAccentCt4.ctGrad[1]}
  )`,
  ...shadow && { boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` },
}))
const heartsDoubleIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: '46%', ml: 1, w: 'auto', color: '#ffffff'/* , color: t.boxAccentCt4.ct */ },
}]

