import { WebSocketU, WsEv } from '@util/app/WebSocketU.ts'
import React, { useEffect } from 'react'
import { UserStatus, useUsersStatusZustand } from 'src/zustand/status/UsersStatusZustand.ts'



const WsListener = React.memo(() => {
  
  useEffect(() => {
    const onEv = (ev: WsEv) => {
      console.log('WS ev:', ev)
      const { type: t, data } = ev
      if (t === 'USERS_STATUS_UPDATE') {
        const d = data as { usersStatus: UserStatus[] }
        const us = d.usersStatus
        useUsersStatusZustand.setState(s => {
          const newS = { ...s }
          for (const subscriber in s) {
            const { map } = s[subscriber]
            // TODO Если производительности будет мало, сделать тосесные изменения
            us.forEach(it => {
              if (map.has(it.id)) map.set(it.id, it)
            })
            newS[subscriber] = { map }
          }
          return newS
        })
      }
    }
    WebSocketU.addOnEvListener(onEv)
    return () => WebSocketU.removeOnEvListener(onEv)
  }, [])
  
  return undefined
})
WsListener.displayName = 'WsListener'
export default WsListener


