import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { useLiveShortDuration } from '@utils/date/react/useLiveShortDuration.ts'
import { useShortDurationUiText } from '@utils/date/react/useShortDurationUiText.ts'
import React, { useMemo } from 'react'
import { UiValues } from '@libs/ui-text/UiText.ts'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import Gap from '@libs/short-propsed/components/Gap.tsx'
import IsWritingFiveDots, {
  IsWritingFiveDotsCssProps,
} from 'src/components/elems/icons/IsWritingFiveDots.tsx'
import PinIc from 'src/components/elems/icons/SvgIcons/pack/ui/PinIc.tsx'
import SpinnerCircleQuarterBoldIc
  from 'src/components/elems/icons/SvgIcons/pack/ui/SpinnerCircleQuarterBoldIc.tsx'
import VolumeIc from 'src/components/elems/icons/SvgIcons/pack/ui/VolumeIc.tsx'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import Ava from 'src/components/widgets/avatars/Ava/Ava.tsx'
import CountFormatShort from 'src/components/widgets/CountFormatShort.tsx'
import Txt = EmotionCommon.Txt
import max1Line = EmotionCommon.max1Line
import max1LineBox = EmotionCommon.max1LineBox
import CrossBoldIc from 'src/components/elems/icons/SvgIcons/pack/ui/CrossBoldIc.tsx'
import InfoCircleOutlinedIc from 'src/components/elems/icons/SvgIcons/pack/ui/InfoCircleOutlinedIc.tsx'
import CheckmarkIc from 'src/components/elems/icons/SvgIcons/pack/ui/CheckmarkIc.tsx'
import CheckmarkDoubleIc from 'src/components/elems/icons/SvgIcons/pack/ui/CheckmarkDoubleIc.tsx'
import { Pu } from '@utils/base/typeUtils.ts'
import { isdef } from '@utils/base/typeUtils.ts'






const outerUiValues = {
  youRespectful: {
    'ru-RU': 'Вы',
    'en-US': 'You',
  },
} satisfies UiValues


export type ChatListItemWidgetData = {
  id: string
  name: string
  ava?: string | undefined
  online?: boolean | undefined
  lastMsg?: string | undefined
  lastMsgDate?: string | undefined
  isLastMsgMy?: boolean | undefined
  unreadCnt?: number | undefined
  mute?: boolean | undefined
  pinned?: number | undefined // int 0+, 0 is topmost, undefined - not pinned
  lastMsgStatus?: 'sending' | 'sent' | 'read' | 'error' | undefined
  isWriting?: boolean | undefined
}


export type ChatListItemWidgetProps =
  & { item: ChatListItemWidgetData }
  & React.ComponentProps<typeof Flex>

export const ChatListItemWidget = React.memo((props: ChatListItemWidgetProps) => {
  const {
    item: {
      id, ava, online, name, lastMsg, lastMsgDate, isLastMsgMy, unreadCnt = 0,
      mute, pinned, lastMsgStatus, isWriting,
    },
    ...restProps
  } = props
  
  
  
  const duration = useLiveShortDuration(lastMsgDate)
  const durationText = useShortDurationUiText(duration)
  
  
  const uiValues = useMemo(() => ({
    youRespectful: outerUiValues.youRespectful,
  }), [])
  
  const uiText = useUiValues(uiValues)
  
  const sending = lastMsgStatus === 'sending'
  const sent = lastMsgStatus === 'sent'
  const read = lastMsgStatus === 'read'
  const error = lastMsgStatus === 'error'
  
  return (
    <Flex alignedStretch h={60} rad={20} row g={8}
      data-display-name='ChatListItemWidget'
      {...restProps}
    >
      
      <Ava fullH alignedStretch noShrink id={id} ava={ava} online={online}/>
      
      <Flex alignedStretch col grow>
        
        <Flex row align basis='50%'>
          <Flex><NameBox><Name>{name}</Name></NameBox></Flex>
          <Flex row align noShrink>
            <Gap wMin={8} grow/>
            {[
              sending && <SpinnerCircleQuarterBoldIc key='spinner' css={SvgIconS6.t(spinnerIcS)}/>,
              sent && <CheckmarkIc key='sent' css={SvgIconS6.t(checkmarkIcS)}/>,
              read && <CheckmarkDoubleIc key='read' css={SvgIconS6.t(checkmarkDoubleIcS)}/>,
              error && <InfoCircleOutlinedIc key='sending error' css={SvgIconS6.t(warnIcS)}/>,
              durationText && <StatusDivider key='duration'>{durationText}</StatusDivider>,
              mute && <VolumeMute key='mute'/>,
              isdef(pinned) && <PinIc key='pin' css={SvgIconS6.t(pinIcS)}/>,
            ]
              .filter(it => it)
              .flatMap((it, i, arr) => (
                i < arr.length - 1
                  ? [it, <StatusDivider key={`•${i}`}>{' • '}</StatusDivider>]
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
            {!!unreadCnt && (
              <Unread center noShrink secondary={mute}>
                <CountFormatShort>{unreadCnt}</CountFormatShort>
              </Unread>
            )}
          </Flex>
        </Flex>
      
      </Flex>
    
    </Flex>
  )
})
ChatListItemWidget.displayName = 'ChatListItemWidget'
export default ChatListItemWidget





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
  ${IsWritingFiveDotsCssProps.map({
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
const StatusDivider = styled(Flex)`
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






