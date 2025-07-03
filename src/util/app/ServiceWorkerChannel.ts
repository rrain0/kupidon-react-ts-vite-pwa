import { SwMsg } from 'src/util/app/ServiceWorkerU.ts'



export namespace ServiceWorkerChannel {

  
  
  export function send(message: SwMsg): void {
    const swCtrl = navigator.serviceWorker.controller
    if (!swCtrl) {
      return
      throw new Error('There is no activating or active Service Worker')
    }
    swCtrl.postMessage(message)
  }
  
  
  
  export async function sendAwaitAnswer(message: SwMsg): Promise<MessageEvent> {
    
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
        reject(new Error('There is no activating or active Service Worker'))
        return
      }
      swCtrl.postMessage(message, [messageChannel.port2])
    })
  }

  

}
