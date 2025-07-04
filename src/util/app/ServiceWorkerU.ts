


export type SwMsgListener = (ev?: SwMsg) => void

export type SwMsg = {
  type: string
  data?: any
}


type SwState = ServiceWorkerState
const swReadyStates: (ServiceWorkerState | undefined)[] = ['activating', 'activated']
export const getIsSwReady = () => swReadyStates.includes(navigator.serviceWorker.controller?.state)