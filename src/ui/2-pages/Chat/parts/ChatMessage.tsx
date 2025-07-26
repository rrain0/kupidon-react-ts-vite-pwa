import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { ChatMessageContentA } from 'src/model/api/ChatMessageA.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { IsWritingFiveDotsCssProps } from 'src/ui/0-elements/icons/IsWritingFiveDots.tsx'
import CheckmarkDoubleIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CheckmarkDoubleIc.tsx'
import CheckmarkIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CheckmarkIc.tsx'
import CrossBoldIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CrossBoldIc.tsx'
import SpinnerCircleQuarterBoldIc
  from 'src/ui/0-elements/icons/SvgIcons/pack/ui/SpinnerCircleQuarterBoldIc.tsx'
import VolumeIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/VolumeIc.tsx'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import InfoCircleOutlinedIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/InfoCircleOutlinedIc.tsx'
import Txt = EmotionCommon.Txt




export type ChatMessageUi = {
  id: string
  type: 'my' | 'others'
  content: ChatMessageContentA
  time: string
  status?: 'sending' | 'sent' | 'read' | 'error' | undefined
}


export type ChatMessageExtraProps = {
  msg: ChatMessageUi
}

export type ChatMessageProps =
  & Omit<React.ComponentProps<typeof Flex>, 'children'>
  & ChatMessageExtraProps



const ChatMessage = React.memo((props: ChatMessageProps) => {
  const {
    msg: {
      type = 'my',
      content: { text } = { },
      time,
      status,
    },
    ...restProps
  } = props
  
  const right = type === 'my'
  const my = type === 'my'
  
  const sending = status === 'sending'
  const sent = status === 'sent'
  const read = status === 'read'
  const error = status === 'error'
  
  return (
    <Flex
      data-display-name='ChatMessage'
      col align={right ? 'end' : 'start'}
      pv={5} pl={right ? 64 : 0} pr={right ? 0 : 64}
      css={Txt.s16}
      {...restProps}
    >
      
      <Flex row wrap alignEnd justifyEnd pv={6} ph={15} gCol={4}
        // TODO Theme
        bg={my ? '#FFD7E0' : '#EEEEEE'}
        // TODO Theme
        color={my ? '#0D0D0D' : '#232020'}
        css={{
          borderRadius: 18,
          ...right ? { borderTopRightRadius: 0 } : { borderTopLeftRadius: 0 },
        }}
      >
        
        <Flex grow hMin='1.32em'>
          {text}
        </Flex>
        
        <Flex row center g={6} mb={-1} mr={-6}>
          {[
            <StatusText key='time' fontSz={10} mb={-2}>{time}</StatusText>,
            sending && <SpinnerCircleQuarterBoldIc key='spinner' css={SvgIconS6.t(spinnerIcS)}/>,
            sent && <CheckmarkIc key='sent' css={SvgIconS6.t(checkmarkIcS)}/>,
            read && <CheckmarkDoubleIc key='read' css={SvgIconS6.t(checkmarkDoubleIcS)}/>,
            error && <InfoCircleOutlinedIc key='sending error' css={SvgIconS6.t(warnIcS)}/>,
            //durationText && <Status key='duration'>{durationText}</Status>,
            //mute && <VolumeMute key='mute'/>,
            //isdef(pinned) && <PinIc key='pin' css={SvgIconS6.t(pinIcS)}/>,
          ]
            .filter(it => it)
          }
        </Flex>
        
      </Flex>
      
    </Flex>
  )
})
ChatMessage.displayName = 'ChatMessage'
export default ChatMessage




const spinnerIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 11, w: 'auto', color: '#aaaaaa', colorAcc: 'black' },
}]
const checkmarkIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 16, m: -2, w: 'auto', color: '#8B8B8B' },
}]
const checkmarkDoubleIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 16, m: -2, w: 'auto', color: '#008080' },
}]
const warnIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 15, m: -3, w: 'auto', color: '#ff4433' },
}]
const volumeMuteIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 10, w: 'auto', ml: -1, color: '#c69477' },
}]
const volumeMuteCrossIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 4, w: 'auto', ml: -1, color: '#c69477' },
}]
const VolumeMute = () => (
  <>
    <VolumeIc css={SvgIconS6.t(volumeMuteIcS)}/>
    <CrossBoldIc css={SvgIconS6.t(volumeMuteCrossIcS)}/>
  </>
)
const pinIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 14, w: 'auto', m: -1, color: '#80558c', rotate: '0.125turn' },
}]
const isWritingFiveDotsS = css`
  height: 10px;
  width: auto;
  ${IsWritingFiveDotsCssProps.map({
    color: 'black',
    colorAccent: '#BB2649',
  })}
`



const StatusDivider = styled(Flex)`
  ${Txt.s13};
  white-space: pre;
  // TODO Theme
  color: #8B8B8B;
`
const StatusText = styled(Flex)`
  ${Txt.s13};
  // TODO Theme
  color: #8B8B8B;
`