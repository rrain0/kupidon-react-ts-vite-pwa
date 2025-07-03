import { ServiceWorkerChannel } from 'src/util/app/ServiceWorkerChannel.ts'
import { WsEv, WsEvListener } from 'src/util/app/WebSocketU.ts'



export namespace WebSocketChannel {
  
  export function sendMsg(message: WsEv): void {
    ServiceWorkerChannel.sendMsgAwaitAnswer({ type: 'TO_WS', data: message })
      .catch((ex) => console.error('sendMsgAwaitAnswer error', ex))
  }
  
  
  const wsToClientsChannel = new BroadcastChannel('from-ws')
  
  
  
  type ChannelMsgListener = (ev: MessageEvent<any>) => void
  
  const listeners = new Map<WsEvListener, ChannelMsgListener>()
  
  export const addOnEvListener = (onEv: WsEvListener) => {
    if (listeners.has(onEv)) return
    const onMsg: ChannelMsgListener = ev => onEv(ev.data)
    listeners.set(onEv, onMsg)
    wsToClientsChannel.addEventListener('message', onMsg)
  }
  export const removeOnEvListener = (onEv: WsEvListener) => {
    const onMsg = listeners.get(onEv)
    if (onMsg) {
      listeners.delete(onEv)
      wsToClientsChannel.removeEventListener('message', onMsg)
    }
  }
  
}
