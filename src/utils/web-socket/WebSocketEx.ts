import { AsyncU } from 'src/utils/base/AsyncU.ts'

import { asMsgToClient, WsMsg } from 'src/utils/web-socket/WsU.ts'
import newPromise = AsyncU.newPromise
import { isstring } from 'src/utils/base/TypeUtils.ts'
import delay = AsyncU.delay



export class WebSocketEx {
  
  constructor(url: string | URL, protocols?: string | string[]) {
    this.reconnect(url, protocols)
  }
  
  private data: {
    ws?: WebSocket | undefined
    isReady: boolean
  } = {
    isReady: false,
  }
  
  private async reconnect(url: string | URL, protocols?: string | string[]) {
    let attempt = 0
    while (true) {
      this.data.ws = new WebSocket(url, protocols)
      const [whenClosed, setClosed] = newPromise()
      this.data.ws.onopen = () => {
        attempt = 0
        this.updateIsReady()
      }
      this.data.ws.onmessage = ev => {
        //console.log('WebSocket received:', ev.data)
        const { data } = ev
        if (isstring(data)) {
          this.onmessage?.(JSON.parse(data) ?? { })
        }
      }
      this.data.ws.onerror = ev => {
        console.log('ws error', ev)
        // Sending message error
      }
      this.data.ws.onclose = ev => {
        console.log('ws close', ev)
        //ev.wasClean
        this.updateIsReady()
        setClosed()
      }
      await whenClosed
      if (attempt <= 40) attempt++
      await delay((() => {
        return 2000 // пока просто 2с оставлю
        
        if (attempt <= 20) return 2000 // 2s
        if (attempt <= 40) return 1 * 60 * 1000 // 1m
        return 10 * 60 * 1000 // 10m
      })())
    }
  }
  
  private updateIsReady() {
    const prevR = this.data.isReady
    const r = this.data.isReady = this.data.ws?.readyState === WebSocket.OPEN
    if (r !== prevR) {
      this.onmessage?.(asMsgToClient({ type: r ? 'WS_READY' : 'WS_NOT_READY' }))
    }
  }
  
  
  get isReady() { return this.data.isReady }
  
  send(data: WsMsg) {
    this.updateIsReady()
    if (this.data.ws && this.data.isReady) {
      console.log('WS send:', data)
      this.data.ws.send(JSON.stringify(data))
    }
    else {
      this.onmessage?.(asMsgToClient({ type: 'WS_NOT_READY' }))
      throw new Error('WebSocket is not ready')
    }
  }
  
  onmessage: ((msg: WsMsg) => void) | undefined
}
