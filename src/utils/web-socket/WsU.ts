

export type WsMsgListener = (ev?: WsMsg) => void

export type WsMsg = {
  type: string
  data?: Record<string, any> | undefined
}


export const asMsgToClient = (msg: WsMsg) => ({ type: 'TO_CLIENT', data: msg })
export const asMsgFromWs = (msg: WsMsg) => ({ type: 'FROM_WS', data: msg })
export const asMsgToWs = (msg: WsMsg) => ({ type: 'TO_WS', data: msg })
