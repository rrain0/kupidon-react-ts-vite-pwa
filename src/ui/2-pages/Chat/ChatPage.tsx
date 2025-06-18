import styled from '@emotion/styled'
import { commonStyle } from '@util/react/short-props/style/commonStyle.ts'
import { flexStyle } from '@util/react/short-props/style/flexStyle.ts'
import { getViewProps } from '@util/view/ViewProps.ts'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { ChatMessagesApi } from 'src/api/requests/ChatMessagesApi.ts'
import { ChatMessageApi } from 'src/api/requests/ChatMessageApi.ts'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import Textarea from 'src/ui/0-elements/Textarea/Textarea.tsx'
import { TextareaStyle } from 'src/ui/0-elements/Textarea/TextareaStyle.ts'
import Ava from 'src/ui/1-widgets/avatars/Ava/Ava.tsx'
import ChatMessage from 'src/ui/2-pages/Chat/parts/ChatMessage.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/ui/components/screen-bars/parts/BackButton.tsx'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/Pages/PageLayout.tsx'
import TopActionBar from 'src/ui/components/screen-bars/TopActionBar.tsx'
import Txt = EmotionCommon.Txt
import PictureIc = SvgIconsPack.PictureIc
import MicrophoneIc = SvgIconsPack.MicrophoneIc
import EmojiLaughIc = SvgIconsPack.EmojiLaughIc
import PuzzleIc = SvgIconsPack.PuzzleIc
import PlaneSendIc = SvgIconsPack.PlaneSendIc
import VideoCameraIc = SvgIconsPack.VideoCameraIc










export type ChatCompanionData = {
  id: string
  ava?: string | undefined
  online?: boolean | undefined
  name: string
  mute?: boolean | undefined
  pinned?: number | undefined // int 0+, 0 is topmost, undefined - not pinned
  isWriting?: boolean | undefined
}

export type ChatMessage = {
  id: string
  createdAt: string
  updatedAt: string
  chatId: string
  fromUserId: string
  textContent: string // TODO
}


export type ChatPageProps = {
  companion: ChatCompanionData
  messages: ChatMessage[]
}


const ChatPage = React.memo((props: ChatPageProps) => {
  const { companion, messages } = props
  
  useLayoutEffect(() => {
    const p = getViewProps(window)
    const sh = p.scrollHeight
    window.scrollTo({ top: sh, behavior: 'instant' })
  })
  
  const [text, setText] = useState('')
  
  const sendMsg = () => {
    ChatMessageApi.createMessage({ toUserId: companion.id, content: { text } })
  }
  
  const [msgs, setMsgs] = useState<undefined | { id: string, content: { text: string } }[]>(undefined)
  
  
  const {
    request,
    isLoading, isSuccess, isError,
    response, resetResponse,
  } = useApiRequest({
    values: { },
    prepareAndRequest: useCallback(() => {
      return ChatMessagesApi.messages({ toUserId: companion.id })
    }, [companion.id]),
  })
  
  useEffect(() => {
    request()
  }, [])
  
  useEffect(() => {
    if (response?.isSuccess) {
      setMsgs(response.data.messages)
    }
  }, [isSuccess])
  
  return (
    <>
      
      <TopActionBar h={60}>
        <Flex row align h={60} p={6} bgColor='#FFFFFF'
          css={t => ({
            borderTopLeftRadius: 15, borderTopRightRadius: 15,
            boxShadow: `${StyleVals.shadowLightSz} ${t.shadow.bg2}`,
          })}
        >
          
          <BackButton/>
          
          <Ava id={companion.id} ava={companion.ava} alignedStretch h='full'/>
          
          <Flex col ph={12} stretched grow justifySpaceAround>
            <Flex css={[Txt.s18BoldTight, { color: 'black' /* TODO Theme */ }]}>
              {companion.name}
            </Flex>
            <Flex css={[Txt.s15Tight, { color: '#858585' /* TODO Theme */ }]}>
              {'был(а) в 20:51'}
            </Flex>
          </Flex>
        </Flex>
      </TopActionBar>
      
    
      <PageLayout col>
        <PageContentLayout colSm grow ptDefault={12}>
          
          
          <Flex col grow justifyEnd overflowAuto>
            
            {msgs?.map((msg) => (
              <ChatMessage
                key={msg.id}
                type={'my'}
                message={{ text: msg.content.text }}
                time={'15:48'}
                status={'read'}
              />
            ))}
            
            {/*
            <ChatDate>{'Вчера'}</ChatDate>
            
            <ChatMessage
              type={'my'}
              message={{ text: 'Привет' }}
              time={'15:48'}
              status={'read'}
            />
            <ChatMessage
              type={'my'}
              message={{ text: 'Не против познакомиться?' }}
              time={'15:48'}
              status={'read'}
            />
            
            <ChatMessage
              type={'others'}
              message={{ text: 'Привет)' }}
              time={'15:48'}
            />
            <ChatMessage
              type={'others'}
              message={{ text: 'Совсем не против' }}
              time={'15:48'}
            />
            <ChatMessage
              type={'others'}
              message={{ text: 'Может, расскажешь о себе?' }}
              time={'15:48'}
            />
            
            <ChatMessage
              type={'my'}
              message={{ text: 'Привет' }}
              time={'15:48'}
              status={'read'}
            />
            <ChatMessage
              type={'my'}
              message={{ text: 'Это будет довольно долгий разговор' }}
              time={'15:48'}
              status={'error'}
            />
            <ChatMessage
              type={'my'}
              message={{ text: 'Это будет довольно долгий разговор' }}
              time={'15:48'}
              status={'read'}
            />
            <ChatMessage
              type={'my'}
              message={{ text: 'Ведь рассказать много чего хочется)' }}
              time={'15:48'}
              status={'sending'}
            />
            
            <ChatMessage
              type={'others'}
              message={{ text: 'Буду иметь ввиду:)' }}
              time={'15:48'}
            />
            
            <ChatDate>{'Сегодня'}</ChatDate>
            
            <ChatMessage
              type={'my'}
              message={{ text: 'Привет' }}
              time={'15:48'}
              status={'read'}
            />
            <ChatMessage
              type={'my'}
              message={{ text: 'Не против познакомиться?' }}
              time={'15:48'}
              status={'read'}
            />
            
            <ChatMessage
              type={'others'}
              message={{ text: 'Привет)' }}
              time={'15:48'}
            />
            <ChatMessage
              type={'others'}
              message={{ text: 'Совсем не против' }}
              time={'15:48'}
            />
            <ChatMessage
              type={'others'}
              message={{ text: 'Может, расскажешь о себе?' }}
              time={'15:48'}
            />
            
            <ChatMessage
              type={'my'}
              message={{ text: 'Это будет довольно долгий разговор' }}
              time={'15:48'}
              status={'sent'}
            />
            <ChatMessage
              type={'my'}
              message={{ text: 'Ведь рассказать много чего хочется)' }}
              time={'15:48'}
              status={'sent'}
            />
             */}
          </Flex>
          
          
          
          
        </PageContentLayout>
      </PageLayout>
      
      
      
      
      <BottomFloatingBar h={116}>
        <Flex col relative w='full'>
          <Flex col stretched p={16} g={16} bg='white' rad={15}
            absolute l={0} r={0} b={0}
            css={t => ({ boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` })}
          >
            
            
            <Textarea autoFocus hFitText
              placeholder='Напишите сообщение...'
              css={[TextareaStyle.inputTrans, { [TextareaStyle.El.frame]: commonStyle({ pv: 6 }) }]}
              value={text}
              onChange={ev => setText(ev.target.value)}
            />
            
            <Flex row center g={10} justifySpaceBetween>
              <PictureIc css={SvgIconS6.t(pictureIcS)}/>
              <MicrophoneIc css={SvgIconS6.t(pictureIcS)}/>
              <VideoCameraIc css={SvgIconS6.t(pictureIcS)}/>
              <EmojiLaughIc css={SvgIconS6.t(pictureIcS)}/>
              <PuzzleIc css={SvgIconS6.t(pictureIcS)}/>
              <Button css={IconButtonS6.t(sendButtonS)} onClick={sendMsg}>
                <PlaneSendIc/>
              </Button>
            </Flex>
          
          </Flex>
        </Flex>
      </BottomFloatingBar>
      
      
    </>
  )
})
ChatPage.displayName = 'ChatPage'
export default ChatPage





const ChatDate = styled(Flex)(flexStyle({
  aligned: true, mt: 16,
  // TODO Theme
  color: '#858585',
}))



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