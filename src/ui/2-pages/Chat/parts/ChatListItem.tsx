import styled from '@emotion/styled'
import { ArrayU } from '@util/common/ArrayU.ts'
import { StringU } from '@util/common/StringU.ts'
import { useLiveShortDuration } from '@util/date/useLiveShortDuration.ts'
import { useShortDurationUiText } from '@util/date/useShortDurationUiText.ts'
import { withDefaults } from '@util/react/withDefaults.tsx'
import React, { useMemo } from 'react'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import { ReactU } from 'src/util/react/ReactU'
import ClassStyle = ReactU.ClassStyle
import Txt = EmotionCommon.Txt
import maxLines = EmotionCommon.maxLines
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
import IsWritingIc = SvgIconsPack.IsWritingIc
import randomElem = ArrayU.randomElem



// TODO Theme
const pastelRainbow = [
  '#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff',
  '#d6e6ff', '#d7f9f8', '#ffffea', '#fff0d4', '#fbe0e0', '#e5d4ef',
]



const outerUiValues = {
  youRespectful: {
    'ru-RU': 'Вы',
    'en-US': 'You',
  },
} satisfies UiValues


export type ChatListItemProps = {
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
} & ClassStyle

export const ChatListItem = React.memo((props: ChatListItemProps) => {
  const {
    className, style,
    ava, online, name, lastMsg, lastMsgDate, isLastMsgMy, unreadCnt = 0,
    mute, order = 0, lastMsgStatus, isWriting,
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
  const emptyAvaColor = useMemo(() => randomElem(pastelRainbow), [])
  
  return (
    <ChatItemBox row g={8}
      data-display-name='ChatListItem'
      className={className}
      style={style}
    >
      
      <AvaContainer alignSelf='stretch' noShrink center>
        <AvaBox full>
          {ava && <ImgSpark css={ImgSparkS6.t(ImgSparkS6.S.img.img.full.normal)} src={ava}/>}
          {!ava && <EmptyAva css={{ backgroundColor: emptyAvaColor }} center>🎲</EmptyAva>}
        </AvaBox>
        {online && <OnlineMark/>}
      </AvaContainer>
      
      <Flex col grow>
        <Flex row align grow>
          <Flex><NameBox><Name>{name}</Name></NameBox></Flex>
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
        <Flex row align grow>
          {isWriting && <IsWritingIc css={SvgIconS6.t(isWritingIcS)}/>}
          {!isWriting && (
            <Flex>
              {isLastMsgMy && <MetaPreMsg>{uiText.youRespectful}{' • '}</MetaPreMsg>}
              <MsgBox><Msg>{lastMsg}</Msg></MsgBox>
            </Flex>
          )}
          <Gap wMin={8} grow/>
          {unreadText && <Unread noShrink>{unreadText}</Unread>}
        </Flex>
      </Flex>
      
    </ChatItemBox>
  )
})
ChatListItem.displayName = 'ChatListItem'
export default ChatListItem



const ChatItemBox = styled(Flex)`
  width: 100%;
  height: 60px;
`


const AvaContainer = styled(Flex)`
  position: relative;
  aspect-ratio: 1;
`
const AvaBox = styled(Flex)`
  border-radius: 999999px;
  overflow: hidden;
`
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


const NameBox = styled.div`
  ${max1LineBox};
`
const Name = styled.div`
  ${Txt.s17Bold};
  ${maxLines(1)};
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
const isWritingIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 10, w: 'auto', color: '#000000', colorAcc: '#BB2649' },
}]



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
const Unread = withDefaults({ center: true }, styled(Flex)`
  min-width: 28px;
  height: 28px;
  border-radius: 14px;
  padding: 6px;
  // TODO Theme
  background-color: #BB2649;
  // Todo Theme
  color: #FFFFFF;
  ${Txt.s14Bold};
`)



