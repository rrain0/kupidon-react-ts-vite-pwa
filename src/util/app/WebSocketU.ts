


export type WsMsgListener = (ev?: WsMsg) => void

export type WsMsg = {
  type: string
  data?: Record<string, any> | undefined
}
