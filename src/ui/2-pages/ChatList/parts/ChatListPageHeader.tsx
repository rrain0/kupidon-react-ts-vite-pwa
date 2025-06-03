import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import { virtualOffset } from '@util/css/virtualOffset.ts'
import { flexStyle } from '@util/react/short-props/style/flexStyle.ts'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Grid from 'src/ui/0-elements/basic-elements/Grid.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { GradSvgIconS6 } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconS6.ts'
import { GradSvgIconsPack } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconsPack.tsx'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import CountFormatShort from 'src/ui/1-widgets/CountFormatShort.tsx'
import AppLink from 'src/ui/components/app-router/AppLink.tsx'
import HeartOutlinedGradIc = GradSvgIconsPack.HeartOutlinedGradIc
import Txt = EmotionCommon.Txt
import Pu = TypeU.Pu
import RootRoute = AppRoutes.RootRoute
import FourDotsIc = SvgIconsPack.FourDotsIc






type ChatListPageHeaderExtraProps = Pu<{
  likesCnt: number
}>

type ChatListPageHeaderProps =
  & Omit<React.ComponentProps<typeof Grid>, 'children'>
  & ChatListPageHeaderExtraProps



const ChatListPageHeader = React.memo((props: ChatListPageHeaderProps) => {
  const {
    likesCnt = 0,
    ...restProps
  } = props
  
  return (
    <Grid alignedStretch cols='46px 1fr 46px' stretch
      data-display-name='ChatListPageHeader'
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
ChatListPageHeader.displayName = 'ChatListPageHeader'
export default ChatListPageHeader





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

