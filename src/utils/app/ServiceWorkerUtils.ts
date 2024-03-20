




export namespace ServiceWorkerUtils {

  
  
  export function sendMsg(message: {
    type: string
    data?: any
  }): void {
    navigator.serviceWorker.controller?.postMessage(message)
  }
  
  
  
  export async function sendMsgAndAwaitAnswer(message: {
    type: string
    data?: any
  }): Promise<MessageEvent> {
    
    // This wraps the message posting/response in a promise, which will
    // resolve if the response doesn't contain an error, and reject with
    // the error if it does. If you'd prefer, it's possible to call
    // controller.postMessage() and set up the onmessage handler
    // independently of a promise, but this is a convenient wrapper.
    return new Promise<MessageEvent>(function(resolve, reject){
      const  messageChannel = new MessageChannel()
      messageChannel.port1.onmessage = function(event){ resolve(event) }
      
      // This sends the message data as well as transferring
      // messageChannel.port2 to the service worker.
      // The service worker can then use the transferred port to reply
      // via postMessage(), which will in turn trigger the onmessage
      // handler on messageChannel.port1.
      // See
      // https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
      const controller = navigator.serviceWorker.controller
      if (!controller){
        reject(new Error("There is no activating or active Service Worker"))
      } else {
        controller.postMessage(message, [messageChannel.port2])
      }
    })
  }

  

}