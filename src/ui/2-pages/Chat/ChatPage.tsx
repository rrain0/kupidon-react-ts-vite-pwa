import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import { flexStyle } from '@util/react/short-props/style/flexStyle.ts'
import { getViewProps } from '@util/view/ViewProps.ts'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import { ChatItemsApi } from 'src/api/requests/ChatItemsApi.ts'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Ava from 'src/ui/1-widgets/avatars/Ava/Ava.tsx'
import ChatInputDataHub from 'src/ui/2-pages/Chat/parts/ChatInputDataHub.tsx'
import ChatMessagesDataHub from 'src/ui/2-pages/Chat/parts/ChatMessagesDataHub.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/ui/components/screen-bars/parts/BackButton.tsx'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/page/PageLayout.tsx'
import TopActionBar from 'src/ui/components/screen-bars/TopActionBar.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import Txt = EmotionCommon.Txt
import Pu = TypeU.Pu





export type ChatCompanionData = {
  id: string
  ava?: string | undefined
  online?: boolean | undefined
  name: string
  mute?: boolean | undefined
  pinned?: number | undefined // int 0+, 0 is topmost, undefined - not pinned
  isWriting?: boolean | undefined
}


export type ChatPageProps = Pu<{
  toUserId: string
  toChatId: string
}>


const ChatPage = React.memo((props: ChatPageProps) => {
  const { toUserId, toChatId } = props
  const userId = useAuthZustand(s => s.user!.id)
  
  
  const [companion, setCompanion] = useState<ChatCompanionData | undefined>(undefined)
  {
    const {
      startRequest,
      isLoading, isFinished, isSuccess, isError,
      data, error,
    } = useApiRequest(() => UserApi.userById(toUserId ?? ''))
    
    useEffect(() => {
      setCompanion(undefined)
      if (userId && !toChatId) startRequest()
    }, [toUserId, toChatId])
    
    useEffect(() => {
      if (isSuccess) {
        const u = data.user
        setCompanion({
          id: u.id,
          ava: u.photos.find(p => p.index === 0)?.url,
          online: false,
          name: u.name,
          mute: false,
          pinned: undefined,
          isWriting: false,
        })
      }
    }, [isSuccess])
  }
  
  {
    const {
      startRequest,
      isLoading, isFinished, isSuccess, isError,
      data, error,
    } = useApiRequest(() => ChatItemsApi.chatItem(toChatId ?? ''))
    
    useEffect(() => {
      if (toChatId) startRequest()
    }, [toChatId])
    
    useEffect(() => {
      if (isSuccess) {
        const it = data.chatItem
        setCompanion({
          id: it.id,
          name: it.profile.name,
          ava: it.profile.ava,
          // online: false,
          // mute: false,
          // pinned: undefined,
          // isWriting: false,
        })
      }
    }, [isSuccess])
  }
  
  
  useLayoutEffect(() => {
    const p = getViewProps(window)
    const sh = p.scrollHeight
    window.scrollTo({ top: sh, behavior: 'instant' })
  })
  
  
  
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
          
          {!companion && <Flex aligned>Загрузка...</Flex>}
          {companion && (
            <>
              <Ava id={companion.id} ava={companion.ava} alignedStretch h='full'/>
              
              <Flex col ph={12} stretched grow justifySpaceAround>
                <Flex css={[Txt.s18BoldTight, { color: 'black' /* TODO Theme */ }]}>
                  {companion.name}
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

