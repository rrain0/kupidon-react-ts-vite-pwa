import styled from '@emotion/styled'
import React from 'react'
import { MockData } from 'src/_mock-data/MockData.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import ChatListItem from 'src/ui/2-pages/Chat/parts/ChatListItem.tsx'
import MutualSympathiesList from 'src/ui/2-pages/Chat/parts/MutualSympathiesList.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { offsetToPageContentPaddings } from 'src/ui/components/Pages/offsetToPageContentPaddings.ts'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/Pages/PageLayout.tsx'



const {
  avaChan1, avaChan2, avaChan3, banSmirks, chanAva, guyFawkesMask,
} = MockData.images.record
const {
  avaCharmingWoman, avaCheerfulGirl, avaCloseUpSmilingBlonde,
  avaDarkHairedLady, avaAttractivePrettyWoman, avaBeautifulBusinessLady,
  avaWomanPosingHouse, avaStylishBrunetteGirl, avaWomanWalkingStreet,
  avaWomanWithCureSmile,
} = MockData.peopleAvas.record


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



// Add id, name & surname
const chatItems = [
  {
    id: 'c929d161-f608-4ef8-9ac8-f0cfe73c60c0',
    name: 'Мика',
    lastMsg: 'Буду иметь ввиду :)', isLastMsgMy: true, lastMsgStatus: 'sending' as const,
    lastMsgDate: date0sAgo, mute: true,
    isMutualSympathy: true,
  },
  {
    id: '3ceb9e6e-0e23-4cee-8a52-21d8d03f040d',
    //ava: chanAva, name: 'Киана',
    ava: avaCharmingWoman, name: 'Лера',
    lastMsg: 'Интересно', isLastMsgMy: true, lastMsgStatus: 'sent' as const,
    lastMsgDate: date1mAgo, mute: false,
  },
  {
    id: 'ee8d201d-789b-4c89-a28b-e78b282bca70',
    //ava: chanAva, name: 'Камелия',
    ava: avaCheerfulGirl, name: 'Влада',
    lastMsg: 'Последнее сообщение', isLastMsgMy: false, unreadCnt: 10,
    lastMsgDate: date8mAgo, mute: false,
  },
  {
    id: '27b4aa73-9b92-4037-b10a-ddc03656fdd7',
    //ava: chanAva, online: true, name: 'Лести',
    ava: avaCloseUpSmilingBlonde, name: 'Майя',
    lastMsg: 'Не очень', isLastMsgMy: false, unreadCnt: 2,
    lastMsgDate: date1sAgo, mute: false, order: 1, isWriting: true,
  },
  {
    id: 'a503343a-4759-441d-aae0-3f61e2335337',
    //ava: banSmirks, name: 'Бан',
    ava: avaDarkHairedLady, name: 'Настя',
    lastMsg: 'Последнее сообщение', isLastMsgMy: false, unreadCnt: 99,
    lastMsgDate: date3dAgo, online: true,
    isMutualSympathy: true,
  },
  /* {
    id: '12c40cc6-5cdc-4b22-be2e-020643cab84a',
    ava: guyFawkesMask, name: 'Unknown?????????????????? ????????????????? ?????????????????',
    lastMsg: 'Последнее сообщение????????????????????????????????????????????????????',
    isLastMsgMy: false,
    lastMsgDate: date3wAgo, mute: true,
    isMutualSympathy: true,
  }, */
  {
    id: '175dc7be-3f56-4b9d-9403-e994b72624dc',
    //ava: avaChan3, name: 'Эмбер',
    ava: avaAttractivePrettyWoman, name: 'Алиса',
    lastMsg: 'Последнее сообщение', unreadCnt: 1256,
    lastMsgDate: date1MAgo, online: true, mute: false,
    isMutualSympathy: true,
  },
  {
    id: '365e7251-9d0e-42ba-b239-a1ad9ddf6527',
    //ava: avaChan1, name: 'Кира',
    ava: avaBeautifulBusinessLady, name: 'Дарья',
    lastMsg: 'Хорошего вечера', isLastMsgMy: true, lastMsgStatus: 'read' as const,
    lastMsgDate: date1dAgo, online: true, mute: false, order: 1,
    isMutualSympathy: true,
  },
  {
    id: '5ac18ba3-fc4a-4983-a662-7b8134885ed6',
    //ava: chanAva, name: 'Арису',
    ava: avaWomanPosingHouse, name: 'Ксюша',
    lastMsg: 'Последнее сообщение', unreadCnt: 1234567890123456,
    lastMsgDate: date12mAgo, mute: false, isWriting: true,
  },
  {
    id: '97bd2cee-decf-4774-8768-b576118af713',
    //ava: chanAva, name: 'Това',
    ava: avaStylishBrunetteGirl, name: 'Мария',
    lastMsg: 'Последнее сообщение', isLastMsgMy: true, lastMsgStatus: 'sent' as const,
    lastMsgDate: date8yAgo, mute: true,
  },
  {
    id: 'd7a11ffd-c5b3-4f31-9fec-289a9f86a85c',
    //ava: chanAva, name: 'Реонна',
    ava: avaWomanWalkingStreet, name: 'Саша',
    lastMsg: 'Спасибо', unreadCnt: 99999999,
    lastMsgDate: date1wAgo, mute: true,
  },
  {
    id: '4fb12fb0-1f88-45a0-af4e-28b5614d1960',
    //name: 'Стелли',
    name: 'Анита',
    lastMsg: 'Давай', isLastMsgMy: true, lastMsgStatus: 'error' as const,
    lastMsgDate: date2yAgo, mute: true, order: 1,
  },
  {
    id: 'ce2dcdb0-54ae-4f58-a7d9-3826abfeaebf',
    //ava: avaChan2, name: 'Виола',
    ava: avaWomanWithCureSmile, name: 'Лаура',
    lastMsg: 'Последнее сообщение', isLastMsgMy: false, unreadCnt: 1555666,
    lastMsgDate: date17hAgo, mute: false,
    isMutualSympathy: true,
  },
  {
    id: 'b8851399-7522-40d3-98c9-00b3f5d6d2cb',
    name: 'Ксюша',
    lastMsg: 'Последнее сообщение', isLastMsgMy: true, lastMsgStatus: 'sent' as const,
    lastMsgDate: date6MAgo, mute: true,
  },
  {
    id: 'ab3bee90-b38e-4bbd-a2c7-823f8fa3bde4',
    name: 'Настя',
    lastMsg: 'Последнее сообщение', isLastMsgMy: true, lastMsgStatus: 'read' as const,
    lastMsgDate: date1hAgo, mute: false,
  },
  {
    id: 'd5b629d8-fbe9-4c29-a7b3-ca1ac9e071c1',
    name: 'Маша',
    lastMsg: 'Последнее сообщение', isLastMsgMy: true, lastMsgStatus: 'read' as const,
    lastMsgDate: date57mAgo, mute: false,
  },
]

const mutualSympathies = chatItems.filter(it => it.isMutualSympathy)



const ChatPage = React.memo(() => {
  
  return (
    <>
    
      <PageLayout col>
        <PageContentLayout colSm>
          
          {mutualSympathies?.length && (
            <MutualSympathiesList mutualSympathiesItems={mutualSympathies}/>
          )}
          
          <Gap h={14}/>
          
          <ChatItemsList g={20} col>
            {[...chatItems]
              .sort((a, b) => {
                return (b.order ?? 0) - (a.order ?? 0)
                  || Math.sign(b.unreadCnt ?? 0) - Math.sign(a.unreadCnt ?? 0)
                  || +new Date(b.lastMsgDate) - +new Date(a.lastMsgDate)
                  || 0
              })
              .map(({
                id, ava, online, name, lastMsg, lastMsgDate, isLastMsgMy, unreadCnt,
                mute, order, lastMsgStatus, isWriting,
              }) => (
                <ChatListItem
                  id={id}
                  key={id}
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
              ))
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
  ${offsetToPageContentPaddings({ h: true, b: true })}
  padding-top: 20px;
  border-radius: 15px 15px 0 0;
  // TODO Theme
  background-color: white;
  box-shadow: ${StyleVals.shadowLightSz} ${p => p.theme.shadow.bg2};

`
