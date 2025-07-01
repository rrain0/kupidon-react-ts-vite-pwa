import { ServiceWorkerU } from '@util/app/ServiceWorkerU.ts'
import React, { useEffect, useMemo } from 'react'
import * as jose from 'jose'
import { PageState } from 'src/ui/components/UsePageLifecycle.tsx'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'




const SendUserOnlineStatus = React.memo(() => {
  
  const isOnline = useAppZustand(s => onlinePageStates.includes(s.pageState))
  
  const accessToken = useAuthZustand(s => s.accessToken)
  
  const { userId, sessionId } = useMemo(() => {
    if (accessToken) {
      const decodedAccess = jose.decodeJwt(accessToken)
      const { sub: userId, sessionId } = decodedAccess
      return { userId, sessionId }
    }
    return { userId: '', sessionId: '' }
  }, [accessToken])
  
  
  useEffect(() => {
    if (userId && sessionId) {
      if (isOnline) {
        ServiceWorkerU.sendMsgAwaitAnswer({
          type: 'TO_WS', data: {
            type: 'BECAME_ONLINE',
            data: {
              userId: userId,
              sessionId: sessionId,
            },
          },
        }).catch(() => { })
      }
      else {
        ServiceWorkerU.sendMsgAwaitAnswer({
          type: 'TO_WS', data: {
            type: 'BECAME_OFFLINE',
            data: {
              userId: userId,
              sessionId: sessionId,
            },
          },
        }).catch(() => { })
      }
    }
  }, [userId, sessionId, isOnline])
  
  return undefined
})
SendUserOnlineStatus.displayName = 'SendUserOnlineStatus'
export default SendUserOnlineStatus



const onlinePageStates: PageState[] = ['Active', 'Passive']


