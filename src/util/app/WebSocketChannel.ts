import { ServiceWorkerChannel } from 'src/util/app/ServiceWorkerChannel.ts'
import { WsMsg, WsMsgListener } from 'src/util/app/WebSocketU.ts'



export namespace WebSocketChannel {
  
  export function send(message: WsMsg): void {
    ServiceWorkerChannel.sendAwaitAnswer({ type: 'TO_WS', data: message })
      .catch((ex) => console.error('sendMsgAwaitAnswer error', ex))
  }
  
  
  const wsToClientsChannel = new BroadcastChannel('from-ws')
  
  
  
  type ChannelMsgListener = (ev: MessageEvent<any>) => void
  
  const listeners = new Map<WsMsgListener, ChannelMsgListener>()
  
  export const addOnMsgListener = (onMsg: WsMsgListener) => {
    if (listeners.has(onMsg)) return
    const onFullMsg: ChannelMsgListener = ev => onMsg(ev.data)
    listeners.set(onMsg, onFullMsg)
    wsToClientsChannel.addEventListener('message', onFullMsg)
  }
  export const removeOnMsgListener = (onMsg: WsMsgListener) => {
    const onFullMsg = listeners.get(onMsg)
    if (onFullMsg) {
      listeners.delete(onMsg)
      wsToClientsChannel.removeEventListener('message', onFullMsg)
    }
  }
  
}
