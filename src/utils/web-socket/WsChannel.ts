import { SwChannel } from 'src/utils/service-worker/SwChannel.ts'
import { asMsgToWs, WsMsg, WsMsgListener } from 'src/utils/web-socket/WsU.ts'



export namespace WsChannel {
  
  export function send(msg: WsMsg): void {
    console.log('WsChannel send:', msg)
    SwChannel.sendAwaitAnswer(asMsgToWs(msg))
      .catch((ex) => console.error('sendMsgAwaitAnswer error', ex))
  }
  
  
  
  export const addOnMsgListener = (onMsg: WsMsgListener) => {
    SwChannel.addOnWsMsgListener(onMsg)
  }
  export const removeOnMsgListener = (onMsg: WsMsgListener) => {
    SwChannel.removeOnWsMsgListener(onMsg)
  }
  
}
