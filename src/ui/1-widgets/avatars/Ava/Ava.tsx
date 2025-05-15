import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import React, { useMemo } from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import Txt = EmotionCommon.Txt
import HeartsDoubleIc = SvgIconsPack.HeartsDoubleIc
import Pu = TypeU.Pu




// TODO Theme
const pastelRainbow = [
  '#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff',
  '#d6e6ff', '#d7f9f8', '#ffffea', '#fff0d4', '#fbe0e0', '#e5d4ef',
]



const idToColor = (id: string) => {
  const hash = [...id].reduce((acc, cur) => acc + cur.charCodeAt(0), 0)
  const len = pastelRainbow.length
  return pastelRainbow[hash % len]
}



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
  
  const emptyAvaColor = useMemo(() => idToColor(id), [id])
  
  return (
    <AvaContainer alignSelf='stretch' noShrink center
      data-display-name='Ava'
      {...restProps}
    >
      <AvaBox full shadow={shadow}>
        {ava && <ImgSpark css={ImgSparkS6.t(ImgSparkS6.S.img.img.full.normal)} src={ava}/>}
        {!ava && <EmptyAva css={{ backgroundColor: emptyAvaColor }} center>🎲</EmptyAva>}
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
const EmptyAva = styled(Flex)`
  width: 100%;
  height: 100%;
  ${Txt.s22};
`


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

