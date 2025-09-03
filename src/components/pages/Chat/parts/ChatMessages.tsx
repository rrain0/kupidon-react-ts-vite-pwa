import React from 'react'
import { TypeU } from '@utils/base/TypeU.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import ChatMessage, { ChatMessageUi } from 'src/components/pages/Chat/parts/ChatMessage.tsx'
import Pu = TypeU.Pu




export type ChatMessagesProps = Pu<{
  msgs: ChatMessageUi[]
}>



const ChatMessages = React.memo((props: ChatMessagesProps) => {
  const {
    msgs,
  } = props
  
  return (
    <Flex col grow justifyEnd overflowAuto data-display-name='ChatMessages'>
      
      {!msgs && <Flex aligned>Загрузка...</Flex>}
      {msgs?.map((msg) => (
        <ChatMessage
          key={msg.id}
          msg={msg}
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
  
  )
})
ChatMessages.displayName = 'ChatMessages'
export default ChatMessages

