import styled from '@emotion/styled'
import { TypeU } from '@utils/base/TypeU.ts'
import { virtualOffset } from '@utils/css/virtualOffset.ts'
import { flexStyle } from '@utils/react/short-props/style/flexStyle.ts'
import React from 'react'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'
import Grid from 'src/components/elems/basic-elements/Grid.tsx'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import { GradSvgIconS6 } from 'src/components/elems/icons/GradSvgIcons/GradSvgIconS6.ts'
import HeartOutlinedGradIc
  from 'src/components/elems/icons/GradSvgIcons/pack/ui/HeartOutlinedGradIc.tsx'
import FourDotsIc from 'src/components/elems/icons/SvgIcons/pack/ui/FourDotsIc.tsx'
import CountFormatShort from 'src/components/widgets/CountFormatShort.tsx'
import AppLink from 'src/components/components/app-router/AppLink.tsx'
import Txt = EmotionCommon.Txt
import Pu = TypeU.Pu
import RootRoute = AppRoutes.RootRoute






type ChatsPageHeaderExtraProps = Pu<{
  likesCnt: number
}>

type ChatsPageHeaderProps =
  & Omit<React.ComponentProps<typeof Grid>, 'children'>
  & ChatsPageHeaderExtraProps



const ChatsPageHeader = React.memo((props: ChatsPageHeaderProps) => {
  const {
    likesCnt = 0,
    ...restProps
  } = props
  
  return (
    <Grid alignedStretch cols='46px 1fr 46px' stretch
      data-display-name='ChatsPageHeader'
      {...restProps}
    >
      
      <Flex centerStart>
        <Button css={IconButtonS6.t(searchButtonS)}>
          <FourDotsIc/>
        </Button>
      </Flex>
      
      {/* TODO Translation */}
      <Flex center><ChatHeader>Чаты</ChatHeader></Flex>
      
      <Flex centerEnd>
        <AppLink toFull={RootRoute.likedMe}>
          <Button css={ButtonS6.t(likesButtonS)} row>
            <HeartOutlinedGradIc css={GradSvgIconS6.t(heartS)}/>
            <LikesCounterBox>
              <LikesCounter>
                <CountFormatShort addPlus>{likesCnt}</CountFormatShort>
              </LikesCounter>
            </LikesCounterBox>
          </Button>
        </AppLink>
      </Flex>
      
    </Grid>
  )
})
ChatsPageHeader.displayName = 'ChatsPageHeader'
export default ChatsPageHeader





const searchButtonS: AppWidgetStyle = t => [
  IconButtonS6.S.trans.round.lg.normal, {
    button: { sz: 23 + 8 * 2, ...virtualOffset({ a: 8 }) },
    icon: { color: t.page.ct3 },
  },
]

const ChatHeader = styled(Flex)(({ theme: t }) => [
  Txt.s20Bold600, {
    color: t.page.ct3,
    placeSelf: 'center',
  },
])
const likesButtonS: AppWidgetStyle = t => [
  ButtonS6.S.text.rect.md.normal, {
    button: {
      hMin: 0, sz: 'ct', g: 0, ...virtualOffset({ a: 8 }),
      alignItems: 'start',
      justifySelf: 'end',
    },
  },
]
const heartS: AppWidgetStyle = [GradSvgIconS6.S.icon.icon.full.accent, {
  gradIcon: { sz: 23 },
}]


const LikesCounterBox = styled(Flex)(({ theme: t }) => flexStyle({
  mt: -1, ml: -6, rad: 3, pv: 1, ph: 3,
  bgColor:  t.boxAccentCt4.bg,
  color: 'transparent',
}))
const LikesCounter =  styled(Flex)(({ theme: t }) => [
  Txt.s10BoldLh100, {
    color: 'transparent',
    // TODO bug - !important here because without it, it doesn't work, though it must work
    backgroundClip: 'text !important',
    // TODO Theme
    background: `linear-gradient(
      to bottom,
      ${t.boxAccentCt4.ctGrad[0]} 0%,
      ${t.boxAccentCt4.ctGrad[1]} 100%
    )`,
  },
])

