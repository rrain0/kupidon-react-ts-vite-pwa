import React from 'react'
import { TypeU } from '@util/common/TypeU.ts'
import { ChatMessageApi } from 'src/api/requests/ChatMessageApi.ts'
import { ChatMessageContentA } from 'src/model/api/ChatMessageA.ts'
import ChatInput from 'src/ui/2-pages/Chat/parts/ChatInput.tsx'
import Pu = TypeU.Pu




export type ChatInputDataHubProps = Pu<{
  toUserId: string
  toChatId: string
}>



const ChatInputDataHub = React.memo((props: ChatInputDataHubProps) => {
  const {
    toUserId, toChatId,
  } = props
  
  
  const sendMsg = (message: ChatMessageContentA) => {
    const msg = { content: message }
    if (toChatId) {
      ChatMessageApi.createMessageToChat(toChatId, msg)
    }
    else if (toUserId) {
      ChatMessageApi.createMessageToUser(toUserId, msg)
    }
  }
  
  return (
    <ChatInput sendMsg={sendMsg}/>
  )
})
ChatInputDataHub.displayName = 'ChatInputDataHub'
export default ChatInputDataHub


