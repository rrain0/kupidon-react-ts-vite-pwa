import { WebSocketChannel } from '@util/app/WebSocketChannel.ts'
import React, { useEffect, useMemo } from 'react'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import { useUsersStatusZustand } from 'src/zustand/status/UsersStatusZustand.ts'




const RequestItemsLiveUpdate = React.memo(() => {
  
  const wsReady = useAppZustand(s => s.wsReady)
  const online = useAppZustand(s => s.getIsOnline())
  const accessToken = useAuthZustand(s => s.accessToken)
  const usersStatusZustand = useUsersStatusZustand()
  
  const userIdsHash = useMemo(() => {
    let hash = ''
    for (const consumer in usersStatusZustand) {
      hash += JSON.stringify(usersStatusZustand[consumer].map.keys())
    }
    return hash
  }, [usersStatusZustand])
  
  useEffect(() => {
    if (accessToken && wsReady) {
      WebSocketChannel.send({
        type: 'SUBSCRIBE_ON_USER_STATUS',
        data: {
          accessToken,
          userIds: (() => {
            if (!online) return []
            const e = Object.entries(usersStatusZustand)
            const s = new Set<string>()
            e.forEach(([k, { map }]) => {
              [...map.keys()].forEach(it => s.add(it))
            })
            return [...s]
          })(),
        },
      })
    }
  }, [wsReady, accessToken, online, userIdsHash])
  
  return undefined
})
RequestItemsLiveUpdate.displayName = 'RequestItemsLiveUpdate'
export default RequestItemsLiveUpdate


