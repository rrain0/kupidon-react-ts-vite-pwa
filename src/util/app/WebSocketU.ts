import { ServiceWorkerU } from 'src/util/app/ServiceWorkerU.ts'



export namespace WebSocketU {
  
  export function sendMsg(message: WsEv): void {
    ServiceWorkerU.sendMsgAwaitAnswer({ type: 'TO_WS', data: message })
      .catch((ex) => console.error(ex))
  }
  
  const swWsChannel = new BroadcastChannel('ws')
  
  
  
  type ChannelMsgListener = (ev: MessageEvent<any>) => void
  
  const listeners = new Map<WsEvListener, ChannelMsgListener>()
  
  export const addOnEvListener = (onEv: WsEvListener) => {
    if (listeners.has(onEv)) return
    const onMsg: ChannelMsgListener = ev => onEv(ev.data)
    listeners.set(onEv, onMsg)
    swWsChannel.addEventListener('message', onMsg)
  }
  export const removeOnEvListener = (onEv: WsEvListener) => {
    const onMsg = listeners.get(onEv)
    onMsg && swWsChannel.removeEventListener('message', onMsg)
  }
  
}


export type WsEvListener = (ev: WsEv) => void

export type WsEv = {
  type: string
  data?: Record<string, any> | undefined
}
