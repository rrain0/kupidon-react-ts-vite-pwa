import React, { useEffect, useState } from 'react'
import { TypeU } from '@utils/common/TypeU.ts'
import { ChatMessageApi } from 'src/services/api/requests/ChatMessageApi.ts'
import { ChatMessageContentA } from 'src/models/api/ChatMessageA.ts'
import ChatInput from 'src/components/pages/Chat/parts/ChatInput.tsx'
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
  
  
  
  const [isWriting, setIsWriting] = useState(false)
  useEffect(() => {
    console.log(`isWriting: ${isWriting}`)
  }, [isWriting])
  useEffect(() => () => {
    console.log(`isWriting: false (unmouont)`)
  }, [])
  
  
  
  return (
    <ChatInput sendMsg={sendMsg} setIsWriting={setIsWriting}/>
  )
})
ChatInputDataHub.displayName = 'ChatInputDataHub'
export default ChatInputDataHub


