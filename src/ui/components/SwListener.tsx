import { ServiceWorkerChannel } from '@util/app/ServiceWorkerChannel.ts'
import { getIsSwReady } from '@util/app/ServiceWorkerU.ts'
import { WsMsg } from '@util/app/WebSocketU.ts'
import React, { useEffect } from 'react'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'



const SwListener = React.memo(() => {
  
  useEffect(() => {
    const onMsg = (msg?: WsMsg) => {
      console.log('SwListener received:', msg)
      const { type: t, data } = msg ?? { }
      
      if (t === 'SW_READY') {
        useAppZustand.setState({ swReady: getIsSwReady() })
      }
      else if (t === 'SW_NOT_READY') {
        useAppZustand.setState({ swReady: false })
      }
    }
    
    ServiceWorkerChannel.addOnMsgListener(onMsg)
    return () => ServiceWorkerChannel.removeOnMsgListener(onMsg)
  }, [])
  
  useEffect(() => {
    console.log('SwListener getIsSwReady()', getIsSwReady())
    useAppZustand.setState({ swReady: getIsSwReady() })
    const onControllerChange = () => {
      console.log('SwListener onControllerChange', getIsSwReady())
      useAppZustand.setState({ swReady: true })
    }
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange)
    return () => navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange)
  }, [])
  
  return undefined
})
SwListener.displayName = 'SwListener'
export default SwListener


