import * as datefns from 'date-fns'
import React, { useEffect, useState } from 'react'
import { ChatMessagesApi } from 'src/services/api/requests/ChatMessagesApi.ts'
import { useApiRequest } from '@libs/api/useApiRequest.ts'
import { ChatMessageA } from 'src/models/api/ChatMessageA.ts'
import { ChatMessageUi } from 'src/components/pages/Chat/parts/ChatMessage.tsx'
import ChatMessages from 'src/components/pages/Chat/parts/ChatMessages.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'




export type ChatMessagesDataHubProps = {
  toUserId: string | undefined
  toChatId: string | undefined
}



const ChatMessagesDataHub = React.memo((props: ChatMessagesDataHubProps) => {
  const {
    toUserId, toChatId,
  } = props
  
  const userId = useAuthZustand(s => s.user!.id)
  
  
  const [msgs, setMsgs] = useState<undefined | ChatMessageA[]>(undefined)
  const [msgsUi, setMsgsUi] = useState<undefined | ChatMessageUi[]>(undefined)
  
  
  {
    const {
      startRequest,
      isLoading, isFinished, isSuccess, isError,
      data, error,
    } = useApiRequest(() => ChatMessagesApi.messages({ toUserId, toChatId }))
    
    useEffect(() => {
      startRequest()
    }, [toUserId, toChatId])
    
    useEffect(() => {
      if (isSuccess) {
        setMsgs(data.messages)
      }
    }, [isSuccess])
  }
  
  useEffect(() => {
    setMsgsUi(msgs?.map(it => ({
      id: it.id,
      type: it.fromUserId === userId ? 'my' : 'others',
      content: it.content,
      time: datefns.format(it.createdAt, 'HH:mm'),
      //status: 'read',
    })))
  }, [msgs])
  
  
  return (
    <ChatMessages msgs={msgsUi}/>
  )
})
ChatMessagesDataHub.displayName = 'ChatMessagesDataHub'
export default ChatMessagesDataHub

