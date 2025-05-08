import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { virtualOffset } from '@util/css/virtualOffset.ts'
import { useLiveShortDuration } from '@util/date/useLiveShortDuration.ts'
import { useShortDurationUiText } from '@util/date/useShortDurationUiText.ts'
import React, { useMemo } from 'react'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import IsWritingFiveDots, {
  IsWritingFiveDotsCssProps,
} from 'src/ui/0-elements/icons/IsWritingFiveDots.tsx'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import Ava from 'src/ui/1-widgets/avatars/Ava/Ava.tsx'
import { ReactU } from 'src/util/react/ReactU'
import ClassStyle = ReactU.ClassStyle
import Txt = EmotionCommon.Txt
import trimDotZerosEnd = StringU.trimDotZerosEnd
import max1Line = EmotionCommon.max1Line
import max1LineBox = EmotionCommon.max1LineBox
import VolumeIc = SvgIconsPack.VolumeIc
import CrossBoldIc = SvgIconsPack.CrossBoldIc
import PinIc = SvgIconsPack.PinIc
import SpinnerCircleQuarterBoldIc = SvgIconsPack.SpinnerCircleQuarterBoldIc
import WarnCircleOutlinedIc = SvgIconsPack.WarnCircleOutlinedIc
import CheckmarkIc = SvgIconsPack.CheckmarkIc
import CheckmarkDoubleIc = SvgIconsPack.CheckmarkDoubleIc
import Pu = TypeU.Pu
import toEmptyAttr = TypeU.toEmptyAttr
import Callback = TypeU.Callback






const outerUiValues = {
  youRespectful: {
    'ru-RU': 'Вы',
    'en-US': 'You',
  },
} satisfies UiValues


export type ChatListItemData = {
  id: string
  ava?: string | undefined
  online?: boolean | undefined
  name: string
  lastMsg: string
  lastMsgDate: string
  isLastMsgMy?: boolean | undefined
  unreadCnt?: number | undefined
  mute?: boolean | undefined
  order?: number | undefined
  lastMsgStatus?: 'sending' | 'sent' | 'read' | 'error' | undefined
  isWriting?: boolean | undefined
}


export type ChatListItemProps =
  & ChatListItemData
  & React.ComponentPropsWithRef<typeof Button>

export const ChatListItem = React.memo((props: ChatListItemProps) => {
  const {
    className, style,
    id, ava, online, name, lastMsg, lastMsgDate, isLastMsgMy, unreadCnt = 0,
    mute, order = 0, lastMsgStatus, isWriting,
    ...restProps
  } = props
  
  
  const duration = useLiveShortDuration(lastMsgDate)
  const durationText = useShortDurationUiText(duration)
  
  const unreadText = (() => {
    if (unreadCnt >= 1e8) return '∞'
    if (unreadCnt >= 1e6) return trimDotZerosEnd((unreadCnt / 1e6).toFixed(1)) + 'M'
    if (unreadCnt >= 1e3) return trimDotZerosEnd((unreadCnt / 1e3).toFixed(1)) + 'k'
    return unreadCnt ? `${unreadCnt}` : ''
  })()
  
  
  const uiValues = useMemo(() => ({
    youRespectful: outerUiValues.youRespectful,
  }), [])
  
  const uiText = useUiValues(uiValues)
  
  const sending = lastMsgStatus === 'sending'
  const sent = lastMsgStatus === 'sent'
  const read = lastMsgStatus === 'read'
  const error = lastMsgStatus === 'error'
  
  return (
    <Button row g={8} alignSelf='stretch'
      css={ButtonS6.t(chatItemButtonS)}
      data-display-name='ChatListItem'
      {...restProps}
    >
      
      <Ava id={id} ava={ava} online={online} fullH/>
      
      <Flex col grow alignSelf='stretch'>
        
        <Flex row align basis='50%'>
          <Flex><NameBox><Name>{name}</Name></NameBox></Flex>
          <Flex row align noShrink>
            <Gap wMin={8} grow/>
            {[
              sending && <SpinnerCircleQuarterBoldIc key='spinner' css={SvgIconS6.t(spinnerIcS)}/>,
              sent && <CheckmarkIc key='sent' css={SvgIconS6.t(checkmarkIcS)}/>,
              read && <CheckmarkDoubleIc key='read' css={SvgIconS6.t(checkmarkDoubleIcS)}/>,
              error && <WarnCircleOutlinedIc key='sending error' css={SvgIconS6.t(warnIcS)}/>,
              durationText && <Status key='duration'>{durationText}</Status>,
              mute && <VolumeMute key='mute'/>,
              !!order && <PinIc key='pin' css={SvgIconS6.t(pinIcS)}/>,
            ]
              .filter(it => it)
              .flatMap((it, i, arr) => (
                i < arr.length - 1
                  ? [it, <Status key={`•${i}`}>{' • '}</Status>]
                  : it
              ))
            }
          </Flex>
        </Flex>
        
        <Flex row align basis='50%'>
          <Flex row align grow>
            {isWriting && <IsWritingFiveDots css={isWritingFiveDotsS}/>}
            {!isWriting && (
              <Flex row align>
                <Flex row align noShrink>
                  {isLastMsgMy && <MetaPreMsg>{uiText.youRespectful}{' • '}</MetaPreMsg>}
                </Flex>
                <MsgBox><Msg>{lastMsg}</Msg></MsgBox>
              </Flex>
            )}
          </Flex>
          <Flex row align noShrink>
            <Gap w={8}/>
            {unreadText && (
              <Unread center noShrink secondary={mute}>{unreadText}</Unread>
            )}
          </Flex>
        </Flex>
      
      </Flex>
      
    </Button>
  )
})
ChatListItem.displayName = 'ChatListItem'
export default ChatListItem



const chatItemButtonS: AppWidgetStyle = t => [
  ButtonS6.S.text.rect.lg.normal, {
    button: {
      w: undefined, h: 72, r: 20, ...virtualOffset({ h: 8, v: 6 }),
      textAlign: 'start',
    },
    // TODO Theme
    buttonSelected: { bg: '#e07bff44' },
  },
]


const NameBox = styled.div`
  ${max1LineBox};
`
const Name = styled.div`
  ${Txt.s17Bold};
  ${max1Line};
  // TODO Theme
  color: black;
`


const spinnerIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 15, w: 'auto', color: '#aaaaaa', colorAcc: 'black' },
}]
const checkmarkIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 19, m: -2, w: 'auto', color: '#8B8B8B' },
}]
const checkmarkDoubleIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 19, m: -2, w: 'auto', color: '#008080' },
}]
const warnIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 19, m: -3, w: 'auto', color: '#ff4433' },
}]
const volumeMuteIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 13, w: 'auto', ml: -1, color: '#c69477' },
}]
const volumeMuteCrossIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 7, w: 'auto', ml: -1, color: '#c69477' },
}]
const VolumeMute = () => (
  <>
    <VolumeIc css={SvgIconS6.t(volumeMuteIcS)}/>
    <CrossBoldIc css={SvgIconS6.t(volumeMuteCrossIcS)}/>
  </>
)
const pinIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 17, w: 'auto', m: -1, color: '#80558c', rotate: '0.125turn' },
}]
const isWritingFiveDotsS = css`
  height: 10px;
  width: auto;
  ${IsWritingFiveDotsCssProps({
    color: 'black',
    colorAccent: '#BB2649',
  })}
`



const MetaPreMsg = styled(Flex)`
  ${Txt.s15Tight};
  white-space: pre;
  // TODO Theme
  color: #8B8B8B;
`
const Status = styled(Flex)`
  ${Txt.s13};
  white-space: pre;
  // TODO Theme
  color: #8B8B8B;
`
const MsgBox = styled.div`
  ${max1LineBox};
`
const Msg = styled.div`
  ${Txt.s15Tight};
  ${max1Line};
  // TODO Theme
  color: black;
`
const Unread = styled(Flex)<Pu<{ secondary: boolean }>>`
  //margin-top: -4px;
  //margin-bottom: -4px;
  min-width: 28px;
  height: 28px;
  border-radius: 14px;
  padding: 6px;
  // TODO Theme
  background-color: #BB2649;
  // Todo Theme
  color: #FFFFFF;
  ${p => p.secondary && `
    background-color: ${p.theme.boxSecondary3.bg};
    color: ${p.theme.boxSecondary3.ct};
  `}
  ${Txt.s14Bold};
`



