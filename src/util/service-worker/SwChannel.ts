import { SwMsg, SwMsgListener } from 'src/util/service-worker/SwU.ts'
import { WsMsgListener } from 'src/util/web-socket/WsU.ts'



export namespace SwChannel {

  
  
  export function send(msg: SwMsg): void {
    const swCtrl = navigator.serviceWorker.controller
    if (!swCtrl) {
      return
    }
    console.log('SwChannel send:', msg)
    swCtrl.postMessage(msg)
  }
  
  export function sendOrError(msg: SwMsg): void {
    const swCtrl = navigator.serviceWorker.controller
    if (!swCtrl) {
      throw new Error(
        'SwChannel.send error: There is no activating or active Service Worker'
      )
    }
    console.log('SwChannel send:', msg)
    swCtrl.postMessage(msg)
  }
  
  
  
  export async function sendAwaitAnswer(msg: SwMsg): Promise<MessageEvent> {
    
    /*
      This wraps the message posting/response in a promise, which will
      resolve if the response doesn't contain an error, and reject with
      the error if it does.
      If you'd prefer, it's possible to call
      controller.postMessage() and set up the onmessage handler
      independently of a promise, but this is a convenient wrapper.
     */
    return new Promise<MessageEvent>(function(resolve, reject) {
      const messageChannel = new MessageChannel()
      messageChannel.port1.onmessage = ev => resolve(ev)
      
      /*
        This sends the message data as well as transferring
        messageChannel.port2 to the service worker.
        The service worker can then use the transferred port to reply
        via postMessage(), which will in turn trigger the onmessage
        handler on messageChannel.port1.
        See
        https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
       */
      const swCtrl = navigator.serviceWorker.controller
      if (!swCtrl) {
        reject(new Error(
          'SwChannel.send error: There is no activating or active Service Worker'
        ))
        return
      }
      console.log('SwChannel send & await:', msg)
      swCtrl.postMessage(msg, [messageChannel.port2])
    })
  }
  
  
  
  
  const listeners = new Set<SwMsgListener>()
  const wsListeners = new Set<WsMsgListener>()
  
  navigator.serviceWorker.addEventListener('message', (ev) => {
    console.log('SwChannel received:', ev.data)
    let { type, data } = ev.data ?? { }
    if (type === 'FROM_SW') {
      ({ type, data } = data ?? { })
      if (type === 'FROM_WS') {
        for (const l of wsListeners) l(data)
      }
      else {
        for (const l of listeners) l({ type, data })
      }
    }
  })
  
  export const addOnMsgListener = (onMsg: SwMsgListener) => { listeners.add(onMsg) }
  export const removeOnMsgListener = (onMsg: SwMsgListener) => { listeners.delete(onMsg) }
  
  export const addOnWsMsgListener = (onMsg: WsMsgListener) => { wsListeners.add(onMsg) }
  export const removeOnWsMsgListener = (onMsg: WsMsgListener) => { wsListeners.delete(onMsg) }
  
  
  // Chrome on Android stops SW after 30s inactivity,
  // so it refreshes lifetime while page is opened.
  setInterval(() => {
    if (navigator.serviceWorker.controller) {
      send({ type: 'KEEP_SW_ALIVE' })
    }
  }, 10000)
}
