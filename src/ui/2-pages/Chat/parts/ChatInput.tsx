import { useBool } from '@util/react-state/useBool.ts'
import React, { useEffect, useState } from 'react'
import { TypeU } from '@util/common/TypeU.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { ChatMessageContentA } from 'src/model/api/ChatMessageA.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import Textarea from 'src/ui/0-elements/Textarea/Textarea.tsx'
import { TextareaStyle } from 'src/ui/0-elements/Textarea/TextareaStyle.ts'
import ModalDialog from 'src/ui/1-widgets/modals/ModalDialog/ModalDialog.tsx'
import Pu = TypeU.Pu
import Flex from 'ui/0-elements/basic-elements/Flex'
import { StyleVals } from 'ui-data/style/StyleVals'
import { commonStyle } from 'util/react/short-props/style/commonStyle'
import PictureIc = SvgIconsPack.PictureIc
import VideoCameraIc = SvgIconsPack.VideoCameraIc
import MicrophoneIc = SvgIconsPack.MicrophoneIc
import EmojiLaughIc = SvgIconsPack.EmojiLaughIc
import PuzzleIc = SvgIconsPack.PuzzleIc
import PlaneSendIc = SvgIconsPack.PlaneSendIc




export type ChatInputProps = Pu<{
  sendMsg: (message: ChatMessageContentA) => void
}>



const ChatInput = React.memo((props: ChatInputProps) => {
  const {
    sendMsg,
  } = props
  
  const [text, setText] = useState('')
  
  const [needSend, setNeedSend] = useState(false)
  const [allowEmpty, setAllowEmpty] = useState(null as null | boolean)
  const [doSend, setDoSend] = useState(false)
  
  const reset = () => {
    setNeedSend(false)
    setAllowEmpty(null)
    setDoSend(false)
  }
  
  useEffect(() => {
    if (needSend && text) setDoSend(true)
    else if (needSend && !text && allowEmpty) setDoSend(true)
    else if (needSend && !text && allowEmpty === false) reset()
  }, [needSend, text, allowEmpty])
  
  useEffect(() => {
    if (doSend) {
      sendMsg?.({ text })
      setText('')
      reset()
    }
  }, [doSend])
  
  return (
    <>
      <Flex col relative w='full' data-display-name='ChatInput'>
        <Flex col stretched p={16} g={16} bg='white' rad={15}
          absolute l={0} r={0} b={0}
          css={t => ({ boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` })}
        >
          
          <Textarea autoFocus hFitText
            placeholder='Напишите сообщение...'
            css={[
              TextareaStyle.inputTrans,
              { [TextareaStyle.El.frame]: commonStyle({ pv: 6 }) },
            ]}
            value={text}
            onValue={setText}
          />
          
          <Flex row center g={10} justifySpaceBetween>
            <PictureIc css={SvgIconS6.t(pictureIcS)}/>
            <MicrophoneIc css={SvgIconS6.t(pictureIcS)}/>
            <VideoCameraIc css={SvgIconS6.t(pictureIcS)}/>
            <EmojiLaughIc css={SvgIconS6.t(pictureIcS)}/>
            <PuzzleIc css={SvgIconS6.t(pictureIcS)}/>
            <Button css={IconButtonS6.t(sendButtonS)} onClick={() => setNeedSend(true)}>
              <PlaneSendIc/>
            </Button>
          </Flex>
        
        </Flex>
      </Flex>
      
      <ModalDialog
        isOpen={needSend && !text && allowEmpty === null}
        type='info'
        title={'Отправить пустое сообщение?'}
        onModal={() => setAllowEmpty(false)}
        onBack={() => setAllowEmpty(false)}
        onYes={() => setAllowEmpty(true)}
      />
    </>
  )
})
ChatInput.displayName = 'ChatInput'
export default ChatInput




const pictureIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 23, w: 'auto', color: '#8B8B8B' },
}]
const planeSendIcS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { h: 30, w: 'auto', color: '#F45378' },
}]

const sendButtonS: AppWidgetStyle = t => [IconButtonS6.S.trans.round.lg.normal, {
  button: { m: -11, sz: 'auto' },
  // TODO Theme
  icon: { h: 30, w: 'auto', color: '#F45378' },
}]