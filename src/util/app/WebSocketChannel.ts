import { ServiceWorkerChannel } from 'src/util/app/ServiceWorkerChannel.ts'
import { WsMsg, WsMsgListener } from 'src/util/app/WebSocketU.ts'



export namespace WebSocketChannel {
  
  export function send(message: WsMsg): void {
    console.log('WebSocketChannel send:', message)
    ServiceWorkerChannel.sendAwaitAnswer({ type: 'TO_WS', data: message })
      .catch((ex) => console.error('sendMsgAwaitAnswer error', ex))
  }
  
  
  
  export const addOnMsgListener = (onMsg: WsMsgListener) => {
    ServiceWorkerChannel.addOnWsMsgListener(onMsg)
  }
  export const removeOnMsgListener = (onMsg: WsMsgListener) => {
    ServiceWorkerChannel.removeOnWsMsgListener(onMsg)
  }
  
}
