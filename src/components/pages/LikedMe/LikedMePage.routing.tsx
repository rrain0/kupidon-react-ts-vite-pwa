import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import React, { Suspense, useState } from 'react'
import { RouteObject, useSearchParams } from 'react-router'
import { MockData } from 'src/_mock-data/MockData.ts'
import { userPhotosAToMedias } from 'src/models/api/UserPhotoA.ts'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'
import FindPairPage from 'src/components/pages/FindPair/FindPairPage.tsx'
import { LikedMeCardItem } from 'src/components/pages/LikedMe/parts/LikedMeCard.tsx'
import CheckAuth from 'src/components/components/app-router/CheckAuth.tsx'

const LikedMePage = React.lazy(
  () => import('src/components/pages/LikedMe/LikedMePage.tsx')
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
  photos: userPhotosAToMedias(it.photos),
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
  return (
    <CheckAuth>
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <LikedMePageWithItems/>
      </Suspense>
    </CheckAuth>
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

