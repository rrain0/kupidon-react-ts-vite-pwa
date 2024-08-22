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
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import use = RouteBuilder.use
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import ProfilePage from 'src/ui/2-pages/Profile/ProfilePage.tsx'
import SummaryPage from 'src/ui/2-pages/Profile/Summary/SummaryPage'
import full = RouteBuilder.full




const ProfileIdUserIdTab = React.memo(
  () => {
    const [searchParams] = useSearchParams()
    const auth = useRecoilValue(AuthRecoil)
    const authId = auth?.user.id
    const tabRoute = RootRoute.profile.id.userId[use](':userId').profile[use](':tab')
    const params = useMatch(tabRoute[full]()+'/*')?.params
    const urlUserId = params?.['userId']
    const tab = params?.['tab']
    const summary = RootRoute.profile.id.userId.summary[path]
    
    if (urlUserId === authId) {
      if (tab === summary) return <SummaryPage />
      return <ProfilePage />
    }
    
    return (
      <div>
        <div>Просмотр чужого профиля пока что не реализован.</div>
        <Link to={RootRoute.login[fullAllowedNameParams]({
          returnPath: RootRoute.profile[fullAnySearchParams](searchParams),
        })}>
          <button>Войти</button>
        </Link>
      </div>
    )
  }
)



const ProfileIdUserIdAny = React.memo(
  () => {
    const [searchParams] = useSearchParams()
    const userIdRoute = RootRoute.profile.id.userId[use](':userId')
    const urlUserId = useMatch(userIdRoute[full]()+'/*')!.params['userId']!
    
    return (
      <Navigate
        to={RootRoute.profile.id.userId[use](urlUserId).summary[fullAnySearchParams](searchParams)}
        replace={true}
      />
    )
  }
)



// path: 'profile / id / :userId / <check-here>'
const profileIdUserIdRouting: RouteObject[] = [
  {
    path: RootRoute.profile.id.userId.summary[path]+'/*',
    Component: ProfileIdUserIdTab,
  },
  {
    path: RootRoute.profile.id.userId.preview[path]+'/*',
    Component: ProfileIdUserIdTab,
  },
  {
    path: RootRoute.profile.id.userId.profile[path]+'/*',
    Component: ProfileIdUserIdTab,
  },
  {
    path: RootRoute.profile.id.userId.date[path]+'/*',
    Component: ProfileIdUserIdTab,
  },
  {
    path: '*',
    Component: ProfileIdUserIdAny,
  },
]




const ProfileIdEmpty = React.memo(
  () => {
    const [searchParams] = useSearchParams()
    const auth = useRecoilValue(AuthRecoil)
    const authId = auth?.user.id
    
    if (!authId) return (
      <Navigate
        to={RootRoute.login[fullAllowedNameParams]({
          returnPath: RootRoute.profile[fullAnySearchParams](searchParams),
        })}
        replace={true}
      />
    )
    
    return (
        <Navigate
        to={RootRoute.profile.id.userId[use](authId)[fullAnySearchParams](searchParams)}
        replace={true}
      />
    )
  }
)



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





const ProfileAny = React.memo(
  () => {
    const [searchParams] = useSearchParams()
    return (
      <Navigate
        to={RootRoute.profile.id[fullAnySearchParams](searchParams)}
        replace={true}
      />
    )
  }
)



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

