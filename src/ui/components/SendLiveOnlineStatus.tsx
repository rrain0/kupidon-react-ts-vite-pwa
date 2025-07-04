import { WsChannel } from '@util/web-socket/WsChannel.ts'
import React, { useEffect } from 'react'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'




const SendLiveOnlineStatus = React.memo(() => {
  
  const wsChannelReady = useAppZustand(s => s.getWsChannelReady())
  const online = useAppZustand(s => s.getIsOnline())
  const accessToken = useAuthZustand(s => s.accessToken)
  
  //console.log('wsChannelReady', wsChannelReady)
  
  useEffect(() => {
    if (accessToken && wsChannelReady) {
      WsChannel.send({
        type: online ? 'BECAME_ONLINE' : 'BECAME_OFFLINE',
        data: { accessToken },
      })
    }
  }, [wsChannelReady, accessToken, online])
  
  return undefined
})
SendLiveOnlineStatus.displayName = 'SendLiveOnlineStatus'
export default SendLiveOnlineStatus


