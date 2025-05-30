import styled from '@emotion/styled'
import { flexStyle } from '@util/react/short-props/style/flexStyle.ts'
import React from 'react'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Ava from 'src/ui/1-widgets/avatars/Ava/Ava.tsx'
import { mockChatItems } from 'src/ui/2-pages/ChatList/ChatListPage.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/ui/components/screen-bars/parts/BackButton.tsx'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/Pages/PageLayout.tsx'



const chatItem = mockChatItems.find(it => it.id === '175dc7be-3f56-4b9d-9403-e994b72624dc')!



const ChatPage = React.memo(() => {
  
  
  
  return (
    <>
      
      
    
      <PageLayout col>
        <PageContentLayout colSm grow ptDefault={12}>
          
          <Flex row align contentBox h={61}>
            
            <BackButton/>
            
            <Ava id={chatItem.id} ava={chatItem.ava} stretched/>
            
            <Flex col ph={12} stretched grow justifySpaceAround>
              <Flex>
                {chatItem.name}
              </Flex>
              <Flex>
                {'был(а) в 20:51'}
              </Flex>
            </Flex>
            
          </Flex>
          
          
          
          
          <Flex col grow justifyEnd overflowAuto g={16}>
            
            <ChatDate>{'Вчера'}</ChatDate>
            
            <ChatOwnMessage>
              {/* <ChatOwnMessageCircle1/> */}
              {/* <ChatOwnMessageCircle2/> */}
              {'Привет'}
            </ChatOwnMessage>
            <ChatOwnMessage>
              {/* <ChatOwnMessageCircle1/> */}
              {/* <ChatOwnMessageCircle2/> */}
              {'Не против познакомиться?'}
            </ChatOwnMessage>
            
            <ChatOtherUserMessage>
              {/* <ChatOtherUserMessageCircle1/> */}
              {/* <ChatOtherUserMessageCircle2/> */}
              {'Привет)'}
            </ChatOtherUserMessage>
            <ChatOtherUserMessage>
              {/* <ChatOtherUserMessageCircle1/> */}
              {/* <ChatOtherUserMessageCircle2/> */}
              {'Совсем не против'}
            </ChatOtherUserMessage>
            <ChatOtherUserMessage>
              {/* <ChatOtherUserMessageCircle1/> */}
              {/* <ChatOtherUserMessageCircle2/> */}
              {'Может, расскажешь о себе?'}
            </ChatOtherUserMessage>
            
            <ChatOwnMessage>
              {/* <ChatOwnMessageCircle1/> */}
              {/* <ChatOwnMessageCircle2/> */}
              {'Это будет довольно долгий разговор'}
            </ChatOwnMessage>
            <ChatOwnMessage>
              {/* <ChatOwnMessageCircle1/> */}
              {/* <ChatOwnMessageCircle2/> */}
              {'Ведь рассказать много чего хочется)'}
            </ChatOwnMessage>
            
            <ChatOtherUserMessage>{'Буду иметь ввиду:)'}</ChatOtherUserMessage>
            
            <ChatDate>{'Сегодня'}</ChatDate>
            
            <ChatOwnMessage>{'Привет'}</ChatOwnMessage>
            <ChatOwnMessage>{'Не против познакомиться?'}</ChatOwnMessage>
            
            <ChatOtherUserMessage>{'Привет)'}</ChatOtherUserMessage>
            <ChatOtherUserMessage>{'Совсем не против'}</ChatOtherUserMessage>
            <ChatOtherUserMessage>{'Может, расскажешь о себе?'}</ChatOtherUserMessage>
            
            <ChatOwnMessage>{'Это будет довольно долгий разговор'}</ChatOwnMessage>
            <ChatOwnMessage>{'Ведь рассказать много чего хочется)'}</ChatOwnMessage>
            
            <ChatOtherUserMessage>{'Буду иметь ввиду:)'}</ChatOtherUserMessage>
            
          </Flex>
          
          
          
          
        </PageContentLayout>
      </PageLayout>
      
      
      
      
      <BottomFloatingBar h={136}>
        <Flex col stretched p={16} g={12}>
          
          <Flex row g={12}>
            
            <Flex center round sz={46} bgColor='#EFEFEF'
              css={t => ({ boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` })}
            >
              <Flex color='black' fontSz='1.6em'>{'📝'}</Flex>
            </Flex>
            
            <Flex center round sz={46} bgColor='#EFEFEF'
              css={t => ({ boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` })}
            >
              <Flex color='black' fontSz='1.6em'>{'🖼'}</Flex>
            </Flex>
            
            <Flex center round sz={46} bgColor='#EFEFEF'
              css={t => ({ boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` })}
            >
              <Flex color='black' fontSz='1.6em'>{'🎤'}</Flex>
            </Flex>
            
            <Flex center round sz={46} bgColor='#EFEFEF'
              css={t => ({ boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` })}
            >
              <Flex color='black' fontSz='1.6em'>{'🎥'}</Flex>
            </Flex>
            
            <Flex center round sz={46} bgColor='#EFEFEF'
              css={t => ({ boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` })}
            >
              <Flex color='black' fontSz='1.6em'>{'😃'}</Flex>
            </Flex>
          
          </Flex>
          
          <Flex row gap={12}>
            <Flex row grow h={46} rad={20} ph={20} align bgColor='#EFEFEF'
              css={t => ({ boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` })}
            >
              <Flex>Напишите сообщение</Flex>
            </Flex>
            <Flex center round sz={46} bgColor='#EFEFEF'
              css={t => ({ boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` })}
            >
              <Flex color='black' fontSz='1.6em'>{'↑'}</Flex>
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
  aligned: true,
  // TODO Theme
  color: '#858585',
}))



const ChatOwnMessage = styled(Flex)(flexStyle({
  relative: true,
  alignedEnd: true, ml: 64, rad: 15, pv: 6, ph: 15,
  // TODO Theme
  bgColor: '#FFD7E0', color: '#0D0D0D',
}))
const ChatOwnMessageCircle1 = styled(Flex)(flexStyle({
  absolute: true, t: '50%', r: 0,
  transform: 'translate3d(50%, -50%, 0)',
  sz: 12, round: true, bgColor: '#f5f5f5',
}))
const ChatOwnMessageCircle2 = styled(Flex)(flexStyle({
  absolute: true, t: '50%', r: 0,
  transform: 'translate3d(50%, -50%, 0)',
  sz: 8, round: true, bgColor: '#FFD7E0',
}))



const ChatOtherUserMessage = styled(Flex)(flexStyle({
  relative: true,
  alignedStart: true, mr: 64, rad: 15, pv: 6, ph: 15,
  // TODO Theme
  bgColor: '#EEEEEE', color: '#232020',
}))
const ChatOtherUserMessageCircle1 = styled(Flex)(flexStyle({
  absolute: true, t: '50%', l: 0,
  transform: 'translate3d(-50%, -50%, 0)',
  sz: 12, round: true, bgColor: '#f5f5f5',
}))
const ChatOtherUserMessageCircle2 = styled(Flex)(flexStyle({
  absolute: true, t: '50%', l: 0,
  transform: 'translate3d(-50%, -50%, 0)',
  sz: 8, round: true, bgColor: '#EEEEEE',
}))



