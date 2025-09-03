import * as jose from 'jose'



export interface AccessTokenA {
  token: string
  expiresAt: number
  userId: string
  sessionId: string
  sessionExpiresAt: number
  roles: string[]
  get isExpired(): boolean
}



export function getAccessTokenData(token: string): AccessTokenA {
  const decodedToken = jose.decodeJwt(token)
  const expiresAt = decodedToken.exp!
  return {
    token,
    expiresAt: decodedToken.exp!,
    userId: decodedToken.sub!,
    sessionId: decodedToken.sessionId as string,
    sessionExpiresAt: decodedToken.sessionExpiresAt as number,
    roles: decodedToken.roles as string[],
    get isExpired() { return !expiresAt || Date.now() >= expiresAt * 1000 },
  }
}
