import { WebSocketChannel } from '@util/app/WebSocketChannel.ts'
import React, { useEffect } from 'react'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'




const SendOnlineStatus = React.memo(() => {
  
  const wsReady = useAppZustand(s => s.wsReady)
  const online = useAppZustand(s => s.getIsOnline())
  const accessToken = useAuthZustand(s => s.accessToken)
  
  useEffect(() => {
    if (accessToken && wsReady) {
      WebSocketChannel.sendMsg({
        type: online ? 'BECAME_ONLINE' : 'BECAME_OFFLINE',
        data: { accessToken },
      })
    }
  }, [wsReady, accessToken, online])
  
  return undefined
})
SendOnlineStatus.displayName = 'SendOnlineStatus'
export default SendOnlineStatus


