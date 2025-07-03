import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import React, { Suspense, useState } from 'react'
import { RouteObject, useSearchParams } from 'react-router'
import { MockData } from 'src/_mock-data/MockData.ts'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import FindPairPage from 'src/ui/2-pages/FindPair/FindPairPage.tsx'
import { LikedMeCardItem } from 'src/ui/2-pages/LikedMe/parts/LikedMeCard.tsx'
import { currentUserPhotosToProfilePhotos } from 'src/ui/2-pages/Profile/actions.ts'
import AppNavigate from 'src/ui/components/app-router/AppNavigate.tsx'
import { useCheckAuth } from 'src/ui/components/app-router/useCheckAuth.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute

const LikedMePage = React.lazy(
  () => import('src/ui/2-pages/LikedMe/LikedMePage.tsx')
)




const { users } = MockData


const likedMeItems: LikedMeCardItem[] = users.map(it => ({
  id: it.id,
  picture: it.photos.toSorted((a, b) => a.index - b.index)[0]?.url ?? '',
  name: it.name,
  birthDate: it.birthDate,
}))


const profileCardsItems = users.map(it => ({
  id: it.id,
  photos: currentUserPhotosToProfilePhotos(it.photos),
  name: it.name,
  birthDate: it.birthDate,
  gender: it.gender,
  aboutMe: it.aboutMe,
}))



const LikedMePageWithItems = React.memo(() => {
  
  const [locked, setLocked] = useState(true)
  const [search, setSearch] = useSearchParams()
  
  const mode = search.get('likedMeViewMode')
  const [startI, setStartI] = useState<number | undefined>(undefined)
  
  if (!locked && mode === 'full') return (
    <FindPairPage items={profileCardsItems} startI={startI}/>
  )
  else if (mode !== null) {
    const newSearch = new URLSearchParams(search)
    newSearch.delete('likedMeViewMode')
    setSearch(newSearch)
  }
  
  return (
    <LikedMePage
      items={likedMeItems}
      locked={locked}
      unlock={() => setLocked(false)}
      setSelected={setStartI}
    />
  )
})



const RouteLikedMe = React.memo(() => {
  
  const redirectToLogin = useCheckAuth(RootRoute.likedMe)
  if (redirectToLogin) return redirectToLogin
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <LikedMePageWithItems/>
    </Suspense>
  )
})







// path: 'liked-me / ...'
export const routingLikedMe: RouteObject[] = [
  {
    path: '',
    Component: RouteLikedMe,
  },
  clearUnknownPathEnding,
]

