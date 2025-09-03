import { useIsMount } from '@utils/react/state/useIsMount.ts'
import { useDebounce } from '@utils/react/useDebounce.ts'
import React, { useEffect, useState } from 'react'

import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle.ts'
import { ChatMessageContentA } from 'src/models/api/ChatMessageA.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import PlaneSendIc from 'src/components/elems/icons/SvgIcons/pack/special/PlaneSendIc.tsx'
import PuzzleIc from 'src/components/elems/icons/SvgIcons/pack/special/PuzzleIc.tsx'
import EmojiLaughIc from 'src/components/elems/icons/SvgIcons/pack/ui/EmojiLaughIc.tsx'
import MicrophoneIc from 'src/components/elems/icons/SvgIcons/pack/ui/MicrophoneIc.tsx'
import VideoCameraIc from 'src/components/elems/icons/SvgIcons/pack/ui/VideoCameraIc.tsx'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import Textarea from 'src/components/elems/Textarea/Textarea.tsx'
import { TextareaStyle } from 'src/components/elems/Textarea/TextareaStyle.ts'
import ModalDialog from 'src/components/widgets/modals/ModalDialog/ModalDialog.tsx'
import { Pu } from '@utils/base/TypeUtils.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import { StyleVals } from 'src/styles/StyleVals.ts'
import { commonStyle } from '@libs/short-propsed/style/commonStyle'
import PictureIc from 'src/components/elems/icons/SvgIcons/pack/ui/PictureIc.tsx'




export type ChatInputProps = Pu<{
  sendMsg: (message: ChatMessageContentA) => void
  setIsWriting: (isWriting: boolean) => void
}>



const ChatInput = React.memo((props: ChatInputProps) => {
  const {
    sendMsg,
    setIsWriting,
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
  
  const isMount = useIsMount()
  useEffect(() => setIsWriting?.(!isMount), [text])
  useDebounce({
    callback: () => setIsWriting?.(false),
    delay: 4000,
    deps: [text],
  })
  
  
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

