import { Env } from '@util/app/Env.ts'
import { useLiveUsersStatus } from '@util/app/useLiveUsersStatus.ts'
import { ArrayU } from '@util/common/ArrayU.ts'
import { MathU } from '@util/common/MathU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import { useStateAndRef } from '@util/react-state/useStateAndRef.ts'
import { useInterval2 } from '@util/react/useInterval2.ts'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MockData } from 'src/_mock-data/MockData.ts'
import { ChatItemA } from 'src/model/api/ChatItemA.ts'
import { ChatItemsApi } from 'src/api/requests/ChatItemsApi.ts'
import { UsersApi } from 'src/api/requests/UsersApi.ts'
import { useFormApiRequest } from 'src/api/useFormApiRequest.ts'
import { UserPairA } from 'src/model/api/UserPairA.ts'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import ChatList from 'src/ui/2-pages/Chats/parts/ChatList.tsx'
import ChatListActionBar from 'src/ui/2-pages/Chats/parts/ChatListActionBar.tsx'
import { ChatListItemWidgetData } from 'src/ui/2-pages/Chats/parts/ChatListItemWidget.tsx'
import ChatsPageHeader from 'src/ui/2-pages/Chats/parts/ChatsPageHeader.tsx'
import NewPairsList, {
  NewPairItem,
} from 'src/ui/2-pages/Chats/parts/NewPairsList.tsx'
import NewPairsListWithItems from 'src/ui/2-pages/Chats/parts/NewPairsListWithItems.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/page/PageLayout.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import { useUsersStatusZustand } from 'src/zustand/status/UsersStatusZustand.ts'
import arrOfIndices = ArrayU.arrOfIndices
import posInf = MathU.posInf
import isundef = TypeU.isundef
import isdef = TypeU.isdef



const {
  date0sAgo, date1mAgo, date8mAgo, date1sAgo, date3dAgo, date3wAgo, date1MAgo,
  date1dAgo, date12mAgo, date8yAgo, date1wAgo, date2yAgo, date17hAgo, date6MAgo,
  date1hAgo, date57mAgo,
} = MockData.date


const {
  avaChan1, avaChan2, avaChan3, banSmirks, chanAva, guyFawkesMask,
} = MockData.images.record
const {
  avaCharmingWoman, avaCheerfulGirl, avaCloseUpSmilingBlonde,
  avaDarkHairedLady, avaAttractivePrettyWoman, avaBeautifulBusinessLady,
  avaWomanPosingHouse, avaStylishBrunetteGirl, avaWomanWalkingStreet,
  avaWomanWithCureSmile,
} = MockData.peopleAvas.record



const showFullProps = false as boolean


// TODO Name -> firstName & lastName
export const mockChatItems: (ChatListItemWidgetData & {
  isMutualSympathy?: boolean | undefined
  newPairCreatedAt?: string | undefined
})[] = [
  {
    id: 'c929d161-f608-4ef8-9ac8-f0cfe73c60c0',
    name: 'Лена',
    lastMsg: 'Буду иметь ввиду :)', isLastMsgMy: true, lastMsgStatus: 'sent' as const,
    lastMsgDate: date0sAgo, mute: true,
    isMutualSympathy: true,
    newPairCreatedAt: date12mAgo,
    ...showFullProps && { lastMsgStatus: 'sending' as const },
  },
  {
    id: '3ceb9e6e-0e23-4cee-8a52-21d8d03f040d',
    ava: avaCharmingWoman, name: 'Лера',
    ...Env.isDev && { ava: chanAva, name: 'Киана' },
    lastMsg: 'Интересно', isLastMsgMy: true, lastMsgStatus: 'sent' as const,
    lastMsgDate: date1mAgo, mute: false,
  },
  {
    id: 'ee8d201d-789b-4c89-a28b-e78b282bca70',
    ava: avaCheerfulGirl, name: 'Влада',
    ...Env.isDev && { ava: chanAva, name: 'Камелия' },
    lastMsg: 'Последнее сообщение', isLastMsgMy: false, unreadCnt: 10,
    lastMsgDate: date8mAgo, mute: false,
  },
  {
    id: '27b4aa73-9b92-4037-b10a-ddc03656fdd7',
    ava: avaCloseUpSmilingBlonde, name: 'Майя',
    ...Env.isDev && { ava: chanAva, online: true, name: 'Лести' },
    lastMsg: 'Не очень', isLastMsgMy: false, unreadCnt: 2,
    lastMsgDate: date1sAgo, mute: false, pinned: 1, isWriting: true,
  },
  {
    id: 'a503343a-4759-441d-aae0-3f61e2335337',
    ava: avaDarkHairedLady, name: 'Настя',
    ...Env.isDev && { ava: banSmirks, name: 'Бан' },
    lastMsg: 'Последнее сообщение', isLastMsgMy: false, unreadCnt: 1,
    lastMsgDate: date3dAgo, online: true,
    isMutualSympathy: true,
    newPairCreatedAt: date1wAgo,
    ...showFullProps && { unreadCnt: 99 },
  },
  ...Env.isDev && [{
    id: '12c40cc6-5cdc-4b22-be2e-020643cab84a',
    ava: guyFawkesMask, name: 'Unknown?????????????????? ????????????????? ?????????????????',
    lastMsg: 'Последнее сообщение????????????????????????????????????????????????????',
    isLastMsgMy: false,
    lastMsgDate: date3wAgo, mute: true,
    isMutualSympathy: true,
    newPairCreatedAt: date12mAgo,
  }] || [],
  {
    id: '175dc7be-3f56-4b9d-9403-e994b72624dc',
    ava: avaAttractivePrettyWoman, name: 'Алиса',
    ...Env.isDev && { ava: avaChan3, name: 'Эмбер' },
    lastMsg: 'Последнее сообщение',
    lastMsgDate: date1MAgo, online: true, mute: false,
    isMutualSympathy: true,
    newPairCreatedAt: date1MAgo,
  },
  {
    id: '365e7251-9d0e-42ba-b239-a1ad9ddf6527',
    ava: avaBeautifulBusinessLady, name: 'Дарья',
    ...Env.isDev && { ava: avaChan1, name: 'Кира' },
    lastMsg: 'Хорошего вечера', isLastMsgMy: true, lastMsgStatus: 'read' as const,
    lastMsgDate: date1dAgo, online: true, mute: false, pinned: 0,
    isMutualSympathy: true,
    newPairCreatedAt: date3dAgo,
  },
  {
    id: '5ac18ba3-fc4a-4983-a662-7b8134885ed6',
    ava: avaWomanPosingHouse, name: 'Ксюша',
    ...Env.isDev && { ava: chanAva, name: 'Арису' },
    lastMsg: 'Последнее сообщение',
    lastMsgDate: date12mAgo, mute: false,
    ...showFullProps && { isWriting: true, unreadCnt: 1234567890123456 },
  },
  {
    id: '97bd2cee-decf-4774-8768-b576118af713',
    ava: avaStylishBrunetteGirl, name: 'Мария',
    ...Env.isDev && { ava: chanAva, name: 'Това' },
    lastMsg: 'Последнее сообщение', isLastMsgMy: true, lastMsgStatus: 'sent' as const,
    lastMsgDate: date8yAgo, mute: true,
  },
  {
    id: 'd7a11ffd-c5b3-4f31-9fec-289a9f86a85c',
    ava: avaWomanWalkingStreet, name: 'Саша',
    ...Env.isDev && { ava: chanAva, name: 'Реонна' },
    lastMsg: 'Спасибо',
    lastMsgDate: date1wAgo,
    ...showFullProps && { unreadCnt: 99999999, mute: true },
  },
  {
    id: '4fb12fb0-1f88-45a0-af4e-28b5614d1960',
    name: 'Анита',
    ...Env.isDev && { name: 'Стелли' },
    lastMsg: 'Давай', isLastMsgMy: true, lastMsgStatus: 'error' as const,
    lastMsgDate: date2yAgo, mute: true,
  },
  {
    id: 'ce2dcdb0-54ae-4f58-a7d9-3826abfeaebf',
    ava: avaWomanWithCureSmile, name: 'Лаура',
    ...Env.isDev && { ava: avaChan2, name: 'Виола' },
    lastMsg: 'Последнее сообщение', isLastMsgMy: false,
    lastMsgDate: date17hAgo, mute: false,
    isMutualSympathy: true,
    newPairCreatedAt: date57mAgo,
    ...showFullProps && { unreadCnt: 1555666 },
  },
  {
    id: 'b8851399-7522-40d3-98c9-00b3f5d6d2cb',
    name: 'Ксения',
    lastMsg: 'Последнее сообщение', isLastMsgMy: false, lastMsgStatus: 'sent' as const,
    lastMsgDate: date6MAgo, mute: true,
    unreadCnt: 1256,
  },
  {
    id: 'ab3bee90-b38e-4bbd-a2c7-823f8fa3bde4',
    name: 'Таня',
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


const manyChatItems = arrOfIndices(Math.floor(200 / mockChatItems.length)).flatMap(i => (
  mockChatItems.map(it => ({ ...it, id: `${it.id}-${i}` }))
))




const ChatsPage = React.memo(() => {
  
  const authUserId = useAuthZustand(s => s.user!.id)
  
  //
  //
  // const chatItemsInitiallyRemoved = [
  //   'ce2dcdb0-54ae-4f58-a7d9-3826abfeaebf',
  //   '3ceb9e6e-0e23-4cee-8a52-21d8d03f040d', // Киана
  // ]
  //
  // const { get: getInitialChatItems, setOrUpdate: setInitialChatItems } = useStateAndRef(() => (
  //   mockChatItems.filter(it => showFullProps ? !chatItemsInitiallyRemoved.includes(it.id) : true)
  // ))
  //
  //
  //
  // const [getStage, setStage] = useRefGetSet(1)
  //
  // const chatItems1Removed = [
  //   '4fb12fb0-1f88-45a0-af4e-28b5614d1960',
  //   'd7a11ffd-c5b3-4f31-9fec-289a9f86a85c',
  //   '12c40cc6-5cdc-4b22-be2e-020643cab84a', // Unknown
  //   'b8851399-7522-40d3-98c9-00b3f5d6d2cb', // Ксения
  //   'c929d161-f608-4ef8-9ac8-f0cfe73c60c0', // Лена
  // ]
  // const chatItems1Added = [
  //   'ce2dcdb0-54ae-4f58-a7d9-3826abfeaebf',
  //   '3ceb9e6e-0e23-4cee-8a52-21d8d03f040d', // Киана
  // ]
  //
  // const chatItems2Removed = [
  //   'ce2dcdb0-54ae-4f58-a7d9-3826abfeaebf',
  //   '3ceb9e6e-0e23-4cee-8a52-21d8d03f040d', // Киана
  // ]
  // const chatItems2Added = [
  //   '4fb12fb0-1f88-45a0-af4e-28b5614d1960',
  //   'd7a11ffd-c5b3-4f31-9fec-289a9f86a85c',
  //   '12c40cc6-5cdc-4b22-be2e-020643cab84a', // Unknown
  //   'b8851399-7522-40d3-98c9-00b3f5d6d2cb', // Ксения
  //   //'c929d161-f608-4ef8-9ac8-f0cfe73c60c0', // Лена
  // ]
  //
  //
  //
  // const [chatItems, setChatItems] = useState(getInitialChatItems())
  //
  //
  //
  // const pinChats = useCallback((ids: string[]) => {
  //   setChatItems(items => ArrayU.mapToIf(items, it => {
  //     // TODO add pinned as lowermost and adjust all indexes
  //     if (ids.includes(it.id) && isundef(it.pinned)) return { ...it, pinned: 1 }
  //     return it
  //   }))
  // }, [])
  // const unpinChats = useCallback((ids: string[]) => {
  //   setChatItems(items => ArrayU.mapToIf(items, it => {
  //     // TODO add pinned as lowermost and adjust all indexes
  //     if (ids.includes(it.id) && isdef(it.pinned)) return { ...it, pinned: undefined }
  //     return it
  //   }))
  // }, [])
  //
  // const muteChats = useCallback((ids: string[], { forever = false, period = 0 /*ms*/ } = { }) => {
  //   setChatItems(items => ArrayU.mapToIf(items, it => {
  //     if (ids.includes(it.id) && !it.mute) return { ...it, mute: true }
  //     return it
  //   }))
  // }, [])
  // const unmuteChats = useCallback((ids: string[]) => {
  //   setChatItems(items => ArrayU.mapToIf(items, it => {
  //     if (ids.includes(it.id) && it.mute) return { ...it, mute: false }
  //     return it
  //   }))
  // }, [])
  // const removeChats = useCallback((ids: string[], { removeForAll = false } = { }) => {
  //   console.log('removeForAll', removeForAll)
  //   setInitialChatItems(items => ArrayU.filterToIf(items, it => (
  //     !ids.includes(it.id)
  //   )))
  //   setChatItems(items => ArrayU.filterToIf(items, it => (
  //     !ids.includes(it.id)
  //   )))
  // }, [])
  //
  //
  // useInterval2({ offset: 1500, interval: 1500 }, () => {
  //   if (!showFullProps) return
  //   if (getStage() === 1) {
  //     setStage(2)
  //     setChatItems(items => [
  //       ...items.filter(it => !chatItems1Removed.includes(it.id)),
  //       ...getInitialChatItems().filter(it => chatItems1Added.includes(it.id)),
  //     ])
  //   }
  //   else if (getStage() === 2) {
  //     setStage(1)
  //     setChatItems(items => [
  //       ...items.filter(it => !chatItems2Removed.includes(it.id)),
  //       ...getInitialChatItems().filter(it => chatItems2Added.includes(it.id)),
  //     ])
  //   }
  // })
  //
  
  // const uiChatItems = useMemo(() => {
  //   return chatItems
  //     .filter(it => it)
  //     .sort((a, b) => {
  //       return (a.pinned ?? posInf) - (b.pinned ?? posInf)
  //         || (() => {
  //           const bUnread = !b.mute ? Math.sign(b.unreadCnt ?? 0) : 0
  //           const aUnread = !a.mute ? Math.sign(a.unreadCnt ?? 0) : 0
  //           return bUnread - aUnread
  //         })()
  //         || +new Date(b.lastMsgDate) - +new Date(a.lastMsgDate)
  //         || 0
  //     })
  // }, [chatItems])
  
  // const [newPairItems, setMutualSympathiesItems] = useState(chatItems)
  //
  // const preparedMutualSympathiesItems = useMemo(() => {
  //   return newPairItems
  //     .filter(it => it.isMutualSympathy)
  //     .sort((a, b) => {
  //       return +new Date(b.newPairCreatedAt!) - +new Date(a.newPairCreatedAt!)
  //         || 0
  //     })
  // }, [newPairItems])
  
  const [uiChatItems, setUiChatItems] = (
    useState<ChatListItemWidgetData[] | undefined>(undefined)
  )
  
  const [chatItems, setChatItems] = useState<ChatItemA[] | undefined>(undefined)
  
  
  const {
    request,
    isLoading, isSuccess, isError,
    response, resetResponse,
  } = useFormApiRequest({
    values: { },
    prepareAndRequest: useCallback(() => {
      return ChatItemsApi.chatItems()
    }, []),
  })
  
  useEffect(() => {
    request()
  }, [])
  
  useEffect(() => {
    if (response?.isSuccess) {
      setChatItems(response.data.chatItems)
    }
  }, [isSuccess])
  
  useEffect(() => {
    if (chatItems) {
      setUiChatItems(chatItems.map(it => ({
        id: it.id,
        name: it.profile.name,
        ava: it.profile.ava,
        lastMsg: it.lastMessage?.content.text ?? undefined,
        lastMsgDate: it.lastMessage?.createdAt,
        isLastMsgMy: authUserId === it.lastMessage?.fromUserId,
        
        online: it.online,
        // mute: false,
        // pinned: undefined,
        // isWriting: false,
      })))
    }
  }, [chatItems])
  
  const usersStatus = useLiveUsersStatus(
    'chatsPageChatItems',
    chatItems
      ?.filter(it => it.type === 'PERSONAL')
      .map(it => ({ id: it.profile.id, online: it.online }))
  )
  
  useEffect(() => {
    if (usersStatus) {
      const m = usersStatus.map
      //console.log('m', m.values())
      setChatItems(s => s?.map(it => {
        if (it.type === 'PERSONAL' && it.profile) {
          const { profile: { id }, online } = it
          const us = m.get(id)
          if (us && id === us.id && online !== us.online) {
            return { ...it, online: us.online }
          }
        }
        return it
      }))
    }
  }, [usersStatus])
  
  
  return (
    <>
    
      <PageLayout col>
        <PageContentLayout colSm grow ptDefault={12}>
          
          <ChatsPageHeader likesCnt={12}/>
          
          <Gap h={24}/>
          
          <NewPairsListWithItems/>
          
          <Gap h={14}/>
          
          <ChatList
            chatItems={uiChatItems}
            // pin={pinChats}
            // unpin={unpinChats}
            // mute={muteChats}
            // unmute={unmuteChats}
            // remove={removeChats}
          />
          
        </PageContentLayout>
      </PageLayout>
      
      <BottomFloatingBar>
        <ChatListActionBar/>
      </BottomFloatingBar>
      
    </>
  )
})
ChatsPage.displayName = 'ChatsPage'
export default ChatsPage



