import { SwChannel } from '@util/service-worker/SwChannel.ts'
import { getIsSwReady } from '@util/service-worker/SwU.ts'
import { WsMsg } from '@util/web-socket/WsU.ts'
import React, { useEffect } from 'react'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'



// TODO Push Notifications through SW
async function f() {
  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.getSubscription()
  subscription?.unsubscribe()
}



const SwListener = React.memo(() => {
  
  useEffect(() => {
    const onMsg = (msg?: WsMsg) => {
      console.log('SwListener received:', msg)
      const { type: t, data } = msg ?? { }
      
      /*
      if (t === 'SW_READY') {
        useAppZustand.setState({ swReady: getIsSwReady() })
      }
      else if (t === 'SW_NOT_READY') {
        useAppZustand.setState({ swReady: false })
      }
      */
    }
    
    SwChannel.addOnMsgListener(onMsg)
    return () => SwChannel.removeOnMsgListener(onMsg)
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


