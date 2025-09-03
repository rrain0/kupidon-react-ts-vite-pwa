import styled from '@emotion/styled'
import { useLiveUsersStatus } from '@utils/app/useLiveUsersStatus.ts'
import { TypeU } from '@utils/base/TypeU.ts'
import { flexStyle } from '@utils/react/short-props/style/flexStyle.ts'
import { getViewProps } from '@utils/view/ViewProps.ts'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useApiRequest } from '@libs/api/useApiRequest.ts'
import { ChatItemApi } from 'src/services/api/requests/ChatItemApi.ts'
import { UserApi } from 'src/services/api/requests/UserApi.ts'
import { ChatItemA } from 'src/models/api/ChatItemA.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'
import Ava from 'src/components/widgets/avatars/Ava/Ava.tsx'
import ChatInputDataHub from 'src/components/pages/Chat/parts/ChatInputDataHub.tsx'
import ChatMessagesDataHub from 'src/components/pages/Chat/parts/ChatMessagesDataHub.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import TopActionBar from 'src/components/components/screen-bars/TopActionBar.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import Txt = EmotionCommon.Txt
import Pu = TypeU.Pu



/*


export type ChatCompanionData = {
  id: string
  ava?: string | undefined
  online?: boolean | undefined
  name: string
  mute?: boolean | undefined
  pinned?: number | undefined // int 0+, 0 is topmost, undefined - not pinned
  isWriting?: boolean | undefined
}
*/


export type ChatPageProps = Pu<{
  toUserId: string
  toChatId: string
}>


const ChatPage = React.memo((props: ChatPageProps) => {
  const { toUserId, toChatId } = props
  const userId = useAuthZustand(s => s.user!.id)
  
  const isUserProfile = userId && !toChatId
  const isChatProfile = toChatId
  
  
  const [chatItem, setChatItem] = useState<ChatItemA | undefined>(undefined)
  {
    const {
      startRequest,
      isLoading, isFinished, isSuccess, isError,
      data, error,
    } = useApiRequest(() => ChatItemApi.toUserId(toUserId ?? ''))
    
    useEffect(() => {
      setChatItem(undefined)
      if (isUserProfile) startRequest()
    }, [isUserProfile, toUserId])
    
    useEffect(() => {
      if (isSuccess) {
        const chatItem = data.chatItem
        setChatItem(chatItem)
      }
    }, [isSuccess])
  }
  
  {
    const {
      startRequest,
      isLoading, isFinished, isSuccess, isError,
      data, error,
    } = useApiRequest(() => ChatItemApi.id(toChatId ?? ''))
    
    useEffect(() => {
      if (isChatProfile) startRequest()
    }, [isChatProfile, toChatId])
    
    useEffect(() => {
      if (isSuccess) {
        const chatItem = data.chatItem
        setChatItem(chatItem)
      }
    }, [isSuccess])
  }
  
  
  
  {
    const p = chatItem?.profile
    const usersStatus = useLiveUsersStatus(
      'chatPage',
      p ? [{ id: p.id, online: p.online }] : [],
    )
    useEffect(() => {
      setChatItem(curr => {
        if (!curr) return undefined
        return {
          ...curr,
          profile: {
            ...curr.profile,
            online: usersStatus?.map.get(curr.profile.id)?.online ?? false,
          },
        }
      })
    }, [usersStatus])
  }
  
  
  
  useLayoutEffect(() => {
    const p = getViewProps(window)
    const sh = p.scrollHeight
    window.scrollTo({ top: sh, behavior: 'instant' })
  })
  
  
  
  const profile = chatItem?.profile
  
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
          
          {!profile && <Flex aligned>Загрузка...</Flex>}
          {profile && (
            <>
              <Ava
                id={profile.id}
                ava={profile.ava}
                online={profile.online}
                alignedStretch h='full'
              />
              
              <Flex col ph={12} stretched grow justifySpaceAround>
                <Flex css={[Txt.s18BoldTight, { color: 'black' /* TODO Theme */ }]}>
                  {profile.name}
                </Flex>
                <Flex css={[Txt.s15Tight, { color: '#858585' /* TODO Theme */ }]}>
                  {'был(а) в 20:51'}
                </Flex>
              </Flex>
            </>
          )}
          
        </Flex>
      </TopActionBar>
      
    
      <PageLayout col>
        <PageContentLayout colSm grow ptDefault={12}>
          
          <ChatMessagesDataHub toUserId={toUserId} toChatId={toChatId}/>
          
        </PageContentLayout>
      </PageLayout>
      
      
      
      
      <BottomFloatingBar h={116}>
        <ChatInputDataHub toUserId={toUserId} toChatId={toChatId}/>
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

