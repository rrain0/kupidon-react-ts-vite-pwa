import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { TypeU } from '@utils/common/TypeU.ts'
import { nameCommaAge } from '@utils/ui/nameCommaAge.ts'
import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Grid from 'src/ui/0-elements/basic-elements/Grid.tsx'
import HeartLockIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/HeartLockIc.tsx'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import EmptyAva from 'src/ui/1-widgets/avatars/Ava/EmptyAva.tsx'
import DislikeButton from 'src/ui/1-widgets/ProfileCards/DislikeButton.tsx'
import LikeButton from 'src/ui/1-widgets/ProfileCards/LikeButton.tsx'
import Pu = TypeU.Pu
import Txt = EmotionCommon.Txt
import Callback = TypeU.Callback




export type LikedMeCardItem = {
  id: string
  picture: string
  name: string
  birthDate: string
}

export type LikedMeCardProps = {
  item: LikedMeCardItem
} & Pu<{
  locked: boolean
  onSelect: Callback
}>
const LikedMeCard = React.memo((props: LikedMeCardProps) => {
  const {
    item: { id, picture, name, birthDate },
    locked,
    onSelect,
  } = props
  
  const nameAge = nameCommaAge(name, birthDate)
  
  return (
    <Flex pos='rel' ratio={171 / 217} rad={15} noOverflow>
      
      {picture && <ImgSpark src={picture} css={ImgSparkS6.t(ImgSparkS6.S.img.img.absTrbl.normal)}/>}
      {!picture && <EmptyAva id={id}/>}
      
      {locked && (
        <Grid absTlwh center css={{ backdropFilter: 'blur(20px)' }}>
          <HeartLockIc css={SvgIconS6.t(heartLockS)}/>
        </Grid>
      )}
      
      {!locked && (
        <>
          
          {/* Считывает нажатия на саму карточку */}
          <Flex absTlwh onClick={() => onSelect?.()} css={{ cursor: 'pointer' }}/>
          
          <Flex absTlwh ph={8} pv={10} col centerEnd
            // Только кнопкам действий разрешено перехватывать нажатия
            css={[fade, { '&, & > *': { pointerEvents: 'none' } }]}
          >
            <NameAge>{nameAge}</NameAge>
            <Gap h={7}/>
            <Flex row g={16}>
              <LikeButton sz={40}/>
              <DislikeButton sz={40}/>
            </Flex>
          </Flex>
          
        </>
      )}
      
    </Flex>
  )
})
LikedMeCard.displayName = 'LikedMeCard'
export default LikedMeCard


const heartLockS: AppWidgetStyle = t => [
  SvgIconS6.S.icon.icon.full.normal, {
    icon: { sz: '25%', color: 'white', opacity: 0.3 },
  },
]


const NameAge = styled(Flex)(({ theme: t }) => [Txt.s17Bold, {
  // TODO Theme
  color: 'white',
}])


const fade = css({
  // TODO Theme
  background: `linear-gradient(to bottom,
    rgba(32, 30, 30, 0) 50%,
    rgba(32, 30, 30, 0.4) 68%,
    rgba(32, 30, 30, 0.4) 85%,
    rgba(32, 30, 30, 0.8) 100%
  )`,
})