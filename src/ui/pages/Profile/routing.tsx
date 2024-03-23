import React from 'react'
import {
  Link,
  Navigate,
  RouteObject,
  useMatch,
  useSearchParams,
} from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil.ts'
import { RouteBuilder } from '@util/react/route-builder/RouteBuilder.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import use = RouteBuilder.use
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import ProfilePage from 'src/ui/pages/Profile/ProfilePage.tsx'
import full = RouteBuilder.full




const ProfileIdUserIdEmpty =
React.memo(
()=>{
  const [searchParams] = useSearchParams()
  const auth = useRecoilValue(AuthRecoil)
  const authId = auth?.user.id
  const urlUserId = useMatch(RootRoute.profile.id.userId[full]()+'/*')
    ?.params[RootRoute.profile.id.userId[path].slice(1)]!
  
  return authId===urlUserId
    ? <ProfilePage/>
    : <div>
        <div>Просмотр чужого профиля пока что не реализован.</div>
        <Link to={RootRoute.login[fullAllowedNameParams]({
          returnPath: RootRoute.profile[fullAnySearchParams](searchParams)
        })}>
          <button>Войти</button>
        </Link>
      </div>
})



const ProfileIdUserIdAny =
React.memo(
()=>{
  const [searchParams] = useSearchParams()
  const urlUserId = useMatch(RootRoute.profile.id.userId[full]()+'/*')
    ?.params[RootRoute.profile.id.userId[path].slice(1)]!
  
  return <Navigate
    to={RootRoute.profile.id.userId[use](urlUserId)[fullAnySearchParams](searchParams)}
    replace={true}
  />
})



// path: 'profile / id / userId / <check-here>'
const profileIdUserIdRouting: RouteObject[] = [
  {
    path: '',
    Component: ProfileIdUserIdEmpty,
  },
  {
    path: '*',
    Component: ProfileIdUserIdAny,
  }
]




const ProfileIdEmpty =
React.memo(
()=>{
  const [searchParams] = useSearchParams()
  const auth = useRecoilValue(AuthRecoil)
  const authId = auth?.user.id
  return authId
    ? <Navigate
        to={RootRoute.profile.id.userId[use](authId)[fullAnySearchParams](searchParams)}
        replace={true}
      />
    : <Navigate
        to={RootRoute.login[fullAllowedNameParams]({
          returnPath: RootRoute.profile[fullAnySearchParams](searchParams)
        })}
        replace={true}
      />
})



// path: 'profile / id / <check here>'
export const profileIdRouting: RouteObject[] = [
  {
    path: '',
    Component: ProfileIdEmpty,
  },
  {
    path: RootRoute.profile.id.userId[path]+'/*',
    children: profileIdUserIdRouting,
  },
]





const ProfileAny =
React.memo(
()=>{
  const [searchParams] = useSearchParams()
  return <Navigate
    to={RootRoute.profile.id[fullAnySearchParams](searchParams)}
    replace={true}
  />
})



// path: 'profile / <check here>'
export const profileRouting: RouteObject[] = [
  {
    path: RootRoute.profile.id[path]+'/*',
    children: profileIdRouting,
  },
  {
    path: '*',
    Component: ProfileAny,
  },
]

