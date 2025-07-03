


export type WsEvListener = (ev?: WsEv) => void

export type WsEv = {
  type: string
  data?: Record<string, any> | undefined
}
