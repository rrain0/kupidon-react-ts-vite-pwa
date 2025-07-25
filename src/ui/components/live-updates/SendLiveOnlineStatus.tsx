import { usePrevState } from '@util/react-state/usePrevState.ts'
import { useInterval } from '@util/react/useInterval.ts'
import { WsChannel } from '@util/web-socket/WsChannel.ts'
import React, { useEffect, useMemo } from 'react'
import { getAccessTokenData } from 'src/model/api/AccessTokenA.ts'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'




const SendLiveOnlineStatus = React.memo(() => {
  
  const wsChannelReady = useAppZustand(s => s.getWsChannelReady())
  const accessToken = useAuthZustand(s => s.accessToken)
  const online = useAppZustand(s => s.getIsOnline())
  
  const prevAccessToken = usePrevState(accessToken)
  const userId = useMemo(() => {
    if (accessToken) return getAccessTokenData(accessToken)?.userId
  }, [accessToken])
  const prevUserId = useMemo(() => {
    if (prevAccessToken) return getAccessTokenData(prevAccessToken)?.userId
  }, [prevAccessToken])
  
  //console.log('wsChannelReady', wsChannelReady)
  
  useInterval(15000, () => {
    // Сделать оффлайн предыдущего юзера (например при разлогине)
    if (prevAccessToken && prevUserId !== userId) {
      WsChannel.send({
        type: 'BECAME_OFFLINE',
        data: { accessToken: prevAccessToken },
      })
    }
    // Отправить онлайн статус текущего юзера
    if (accessToken && wsChannelReady) {
      WsChannel.send({
        type: online ? 'BECAME_ONLINE' : 'BECAME_OFFLINE',
        data: { accessToken },
      })
    }
  }, [wsChannelReady, userId, online])
  
  return undefined
})
SendLiveOnlineStatus.displayName = 'SendLiveOnlineStatus'
export default SendLiveOnlineStatus


