import { WsChannel } from '@utils/web-socket/WsChannel.ts'
import React, { useEffect, useMemo } from 'react'
import { useAppZustand } from 'src/zustand/app/appZustand.ts'
import { useAuthZustand } from 'src/zustand/auth/authZustand.ts'
import { useUsersStatusZustand } from 'src/zustand/status/usersStatusZustand.ts'




const RequestItemsLiveUpdate = React.memo(() => {
  
  const wsChannelReady = useAppZustand(s => s.getWsChannelReady())
  const online = useAppZustand(s => s.getIsOnline())
  const accessToken = useAuthZustand(s => s.accessToken)
  const usersStatusZustand = useUsersStatusZustand()
  
  const userIdsHash = useMemo(() => {
    let hash = ''
    for (const consumer in usersStatusZustand) {
      hash += JSON.stringify([...usersStatusZustand[consumer].map.keys()])
    }
    return hash
  }, [usersStatusZustand])
  
  useEffect(() => {
    if (accessToken && wsChannelReady) {
      WsChannel.send({
        type: 'SUBSCRIBE_ON_USERS_STATUS',
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
  }, [wsChannelReady, accessToken, online, userIdsHash])
  
  return undefined
})
RequestItemsLiveUpdate.displayName = 'RequestItemsLiveUpdate'
export default RequestItemsLiveUpdate


