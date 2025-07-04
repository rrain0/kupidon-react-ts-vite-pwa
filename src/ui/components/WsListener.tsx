import { SwChannel } from '@util/service-worker/SwChannel.ts'
import { getIsSwReady } from '@util/service-worker/SwU.ts'
import { WsChannel } from '@util/web-socket/WsChannel.ts'
import { WsMsg } from '@util/web-socket/WsU.ts'
import React, { useEffect } from 'react'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { UserStatus, useUsersStatusZustand } from 'src/zustand/status/UsersStatusZustand.ts'



const WsListener = React.memo(() => {
  
  const swReady = useAppZustand(s => s.swReady)
  
  useEffect(() => {
    const onMsg = (msg?: WsMsg) => {
      console.log('WsListener received:', msg)
      const { type: t, data } = msg ?? { }
      
      if (t === 'WS_READY') {
        console.log('WsListener getIsSwReady()', getIsSwReady())
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
        }, true)
      }
    }
    
    WsChannel.addOnMsgListener(onMsg)
    return () => WsChannel.removeOnMsgListener(onMsg)
  }, [])
  
  useEffect(() => {
    if (swReady || getIsSwReady()) {
      SwChannel.send({ type: 'WS_CHECK_READY' })
    }
  }, [swReady])
  
  return undefined
})
WsListener.displayName = 'WsListener'
export default WsListener


