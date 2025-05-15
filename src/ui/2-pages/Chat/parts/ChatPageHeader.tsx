import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import { virtualOffset } from '@util/css/virtualOffset.ts'
import { withDefaults } from '@util/react/withDefaults.tsx'
import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgGradIconS6 } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconS6.ts'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import CountFormatShort from 'src/ui/1-widgets/CountFormatShort.tsx'
import SearchIc = SvgIconsPack.SearchIc
import HeartOutlinedGradIc = SvgGradIconsPack.HeartOutlinedGradIc
import Txt = EmotionCommon.Txt
import Pu = TypeU.Pu






type ChatPageHeaderExtraProps = Pu<{
  likesCnt: number
}>

type ChatPageHeaderProps =
  & Omit<React.ComponentProps<typeof Flex>, 'children'>
  & ChatPageHeaderExtraProps



const ChatPageHeader = React.memo((props: ChatPageHeaderProps) => {
  const {
    likesCnt = 0,
    ...restProps
  } = props
  
  
  return (
    <HeaderBox alignSelf='stretch'
      data-display-name='ChatPageHeader'
      {...restProps}
    >
      <Button css={IconButtonS6.t(searchButtonS)}>
        <SearchIc/>
      </Button>
      {/* TODO Translations */}
      <ChatHeader>Чаты</ChatHeader>
      <Button css={ButtonS6.t(likesButtonS)} row>
        <HeartOutlinedGradIc css={SvgGradIconS6.t(heartS)}/>
        <LikesCounterBox>
          <LikesCounter>
            <CountFormatShort addPlus>{likesCnt}</CountFormatShort>
          </LikesCounter>
        </LikesCounterBox>
      </Button>
    </HeaderBox>
  )
})
ChatPageHeader.displayName = 'ChatPageHeader'
export default ChatPageHeader





const HeaderBox = styled(Flex)({
  display: 'grid',
  gridTemplateColumns: '46px 1fr 46px',
  alignItems: 'center',
})

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
const heartS: AppWidgetStyle = [SvgGradIconS6.S.icon.icon.auto.normal, {
  gradIcon: { sz: 23 },
}]

const LikesCounterBox = withDefaults({
  mt: -1, ml: -6, r: 3, pv: 1, ph: 3,
}, styled(Flex)(({ theme: t }) => ({
  // TODO Theme
  backgroundColor: t.boxAccentCt4.bg,
  color: 'transparent',
})))
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

