import { atom } from 'recoil'
import { CurrentUser } from 'src/api/entity/CurrentUser'
import { resettableLocalStorageEffect } from '../RecoilPersist'




/*
  accessToken:
    undefined - пользователь разлогинен. Считается, что в куках нет валидного рефреш токена.
      Пользователь считается разлогиненным, если на refresh запрос получен ответ 401.
    string - конкретный access токен. Токен может быть просрочен, но известно, что пользователь вошёл в систему.
    
  user: получается вместе начальным получением accessToken (вход, регистрация).
    Если есть accessToken, значит и user тоже не null.
*/
export type AuthStateType = undefined|{
  accessToken: string,
  user: CurrentUser,
}
const defolt: AuthStateType = undefined
export const AuthRecoil = atom<AuthStateType>({
  key: 'auth',
  default: defolt,
  effects: [resettableLocalStorageEffect(defolt)],
})


