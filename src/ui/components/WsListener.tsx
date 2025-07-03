import { ServiceWorkerChannel } from '@util/app/ServiceWorkerChannel.ts'
import { WebSocketChannel } from '@util/app/WebSocketChannel.ts'
import { WsEv } from '@util/app/WebSocketU.ts'
import React, { useEffect } from 'react'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { UserStatus, useUsersStatusZustand } from 'src/zustand/status/UsersStatusZustand.ts'



const WsListener = React.memo(() => {
  
  useEffect(() => {
    const onEv = (ev?: WsEv) => {
      console.log('WS ev:', ev)
      const { type: t, data } = ev ?? { }
      
      if (t === 'WS_READY') {
        useAppZustand.setState({ wsReady: true })
      }
      else if (t === 'WS_NOT_READY') {
        useAppZustand.setState({ wsReady: false })
      }
      else if (t === 'USERS_STATUS_UPDATE') {
        const d = data as { usersStatus: UserStatus[] }
        const us = d.usersStatus
        useUsersStatusZustand.setState(s => {
          const newS = { ...s }
          for (const subscriber in s) {
            const { map } = s[subscriber]
            // TODO Если производительности будет мало, сделать точечные изменения
            us.forEach(it => {
              if (map.has(it.id)) map.set(it.id, it)
            })
            newS[subscriber] = { map }
          }
          return newS
        })
      }
    }
    WebSocketChannel.addOnEvListener(onEv)
    // Если ошибка отправки потому что SW не готов,
    // то тогда WS в SW сам скажет, что он готов, когда запустится
    try {
      ServiceWorkerChannel.sendMsg({ type: 'WS_CHECK_READY' })
    }
    catch (ex) {
      console.error('WS_NOT_READY', ex)
      useAppZustand.setState({ wsReady: false })
    }
    return () => WebSocketChannel.removeOnEvListener(onEv)
  }, [])
  
  return undefined
})
WsListener.displayName = 'WsListener'
export default WsListener


