import styled from '@emotion/styled'
import React from 'react'
import { MockData } from 'src/_mock-data/MockData.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import ChatListItem from 'src/ui/2-pages/Chat/parts/ChatListItem.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/Pages/PageLayout.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'



const {
  avaChan1, avaChan2, avaChan3, banSmirks, chanAva, guyFawkesMask,
} = MockData.images.allRecord


const date0sAgo = new Date().toISOString()
const date1sAgo = new Date(+new Date() - 1000).toISOString()
const date1mAgo = new Date(+new Date() - 1000 * 60).toISOString()
const date8mAgo = new Date(+new Date() - 1000 * 60 * 8).toISOString()
const date12mAgo = new Date(+new Date() - 1000 * 60 * 12).toISOString()
const date57mAgo = new Date(+new Date() - 1000 * 60 * 57).toISOString()
const date1hAgo = new Date(+new Date() - 1000 * 60 * 60).toISOString()
const date17hAgo = new Date(+new Date() - 1000 * 60 * 60 * 17).toISOString()
const date1dAgo = new Date(+new Date() - 1000 * 60 * 60 * 24).toISOString()
const date3dAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 3).toISOString()
const date1wAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 7).toISOString()
const date3wAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 7 * 3).toISOString()
const date1MAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 30).toISOString()
const date6MAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 30 * 6).toISOString()
const date2yAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 30 * 12 * 2).toISOString()
const date8yAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 30 * 12 * 8).toISOString()



const chatItems = [
  {
    name: 'Мика',
    lastMsg: 'Буду иметь ввиду :)', isLastMsgMy: true, lastMsgStatus: 'sending' as const,
    lastMsgDate: date0sAgo, mute: true,
  },
  {
    ava: chanAva, name: 'Киана',
    lastMsg: 'Интересно', isLastMsgMy: true, lastMsgStatus: 'sent' as const,
    lastMsgDate: date1mAgo, mute: false,
  },
  {
    ava: chanAva, name: 'Камелия',
    lastMsg: 'Последнее сообщение', isLastMsgMy: false, unreadCnt: 10,
    lastMsgDate: date8mAgo, mute: false,
  },
  {
    ava: chanAva, online: true, name: 'Лести',
    lastMsg: 'Не очень', isLastMsgMy: false, unreadCnt: 2,
    lastMsgDate: date1sAgo, mute: false, order: 1, isWriting: true,
  },
  {
    ava: banSmirks, online: true, name: 'Бан',
    lastMsg: 'Последнее сообщение', isLastMsgMy: false, unreadCnt: 99,
    lastMsgDate: date3dAgo,
  },
  {
    ava: guyFawkesMask, name: 'Unknown?????????????????? ????????????????? ?????????????????',
    lastMsg: 'Последнее сообщение????????????????????????????????????????????????????',
    isLastMsgMy: false,
    lastMsgDate: date3wAgo, mute: true,
  },
  {
    ava: avaChan3, online: true, name: 'Эмбер',
    lastMsg: 'Последнее сообщение', unreadCnt: 1256,
    lastMsgDate: date1MAgo, mute: false,
  },
  {
    ava: avaChan1, online: true, name: 'Кира',
    lastMsg: 'Хорошего вечера', isLastMsgMy: true, lastMsgStatus: 'read' as const,
    lastMsgDate: date1dAgo, mute: false, order: 1,
  },
  {
    ava: chanAva, name: 'Арису',
    lastMsg: 'Последнее сообщение', unreadCnt: 1234567890123456,
    lastMsgDate: date12mAgo, mute: false, isWriting: true,
  },
  {
    ava: chanAva, name: 'Това',
    lastMsg: 'Последнее сообщение', isLastMsgMy: true, lastMsgStatus: 'sent' as const,
    lastMsgDate: date8yAgo, mute: true,
  },
  {
    ava: chanAva, name: 'Реонна',
    lastMsg: 'Спасибо', unreadCnt: 99999999,
    lastMsgDate: date1wAgo, mute: true,
  },
  {
    name: 'Стелли',
    lastMsg: 'Давай', isLastMsgMy: true, lastMsgStatus: 'error' as const,
    lastMsgDate: date2yAgo, mute: true, order: 1,
  },
  {
    ava: avaChan2, name: 'Виола',
    lastMsg: 'Последнее сообщение', isLastMsgMy: false, unreadCnt: 1555666,
    lastMsgDate: date17hAgo, mute: false,
  },
  {
    name: 'Ксюша',
    lastMsg: 'Последнее сообщение', isLastMsgMy: true, lastMsgStatus: 'sent' as const,
    lastMsgDate: date6MAgo, mute: true,
  },
  {
    name: 'Настя',
    lastMsg: 'Последнее сообщение', isLastMsgMy: true, lastMsgStatus: 'read' as const,
    lastMsgDate: date1hAgo, mute: false,
  },
  {
    ava: chanAva, name: 'Маша',
    lastMsg: 'Последнее сообщение', isLastMsgMy: true, lastMsgStatus: 'read' as const,
    lastMsgDate: date57mAgo, mute: false,
  },
]



const ChatPage = React.memo(() => {
  const titleText = useUiValues(TitleUiText)
  
  return (
    <>
    
      <PageLayout col>
        <PageContentLayout colSm>
          
          <Hdrs.Page>{titleText.chat}</Hdrs.Page>
          
          <ChatItemsList g={20} col>
            {[...chatItems]
              .sort((a, b) => {
                return (b.order ?? 0) - (a.order ?? 0)
                  || Math.sign(b.unreadCnt ?? 0) - Math.sign(a.unreadCnt ?? 0)
                  || +new Date(b.lastMsgDate) - +new Date(a.lastMsgDate)
                  || 0
              })
              .map(({
                ava, online, name, lastMsg, lastMsgDate, isLastMsgMy, unreadCnt,
                mute, order, lastMsgStatus, isWriting,
              }, i) => {
                return (
                  <ChatListItem
                    key={i}
                    ava={ava}
                    online={online}
                    name={name}
                    lastMsg={lastMsg}
                    lastMsgDate={lastMsgDate}
                    isLastMsgMy={isLastMsgMy}
                    unreadCnt={unreadCnt}
                    mute={mute}
                    order={order}
                    lastMsgStatus={lastMsgStatus}
                    isWriting={isWriting}
                  />
                )
              })
            }
          </ChatItemsList>
          
        </PageContentLayout>
      </PageLayout>
      
      {/* <BottomButtonBar/> */}
      
    </>
  )
})
export default ChatPage



const ChatItemsList = styled(Flex)`

`
