


export type SwMsgListener = (ev?: SwMsg) => void

export type SwMsg = { type: string, data?: any }


const swReadyStates: (ServiceWorkerState | undefined)[] = ['activating', 'activated']
export const getIsSwReady = () => swReadyStates.includes(navigator.serviceWorker.controller?.state)


export type MsgFromSw = { type: 'FROM_SW', data?: any }

export const asMsgFromSw = (msg: SwMsg): MsgFromSw => ({ type: 'FROM_SW', data: msg })
