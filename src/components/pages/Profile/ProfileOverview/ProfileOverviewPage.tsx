import React, { useCallback, useEffect, useState } from 'react'
import { TypeU } from '@utils/common/TypeU.ts'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { UserToUserApi } from 'src/api/requests/UserToUserApi.ts'
import { useApiRequest } from '@mini-libs/api/useApiRequest.ts'
import { UserStrangerA } from 'src/models/api/UserA.ts'
import { userPhotosAToMedias } from 'src/models/api/UserPhotoA.ts'
import MediaArrayDownloader from '@mini-libs/media/download/MediaArrayDownloader.tsx'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'
import ProfileCards from 'src/components/widgets/ProfileCards/ProfileCards.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import Pu = TypeU.Pu




export type ProfileOverviewPageProps = Pu<{
  userId: string
}>



const ProfileOverviewPage = React.memo((props: ProfileOverviewPageProps) => {
  const {
    userId,
  } = props
  
  
  const [user, setUser] = useState<UserStrangerA | undefined>(undefined)
  const {
    startRequest,
    isLoading, isFinished, isSuccess, isError,
    data, error,
  } = useApiRequest(() => UserApi.userById(userId ?? ''))
  
  useEffect(() => {
    setUser(undefined)
    if (userId) startRequest()
  }, [userId])
  
  useEffect(() => {
    if (isSuccess) {
      const u = data.user
      setUser(u)
    }
  }, [isSuccess])
  
  
  
  
  // TODO API List - сделать отдельную компоненту для создания фукнций колбэков со входящими данными
  const onLike = useCallback((userId: string) => {
    // TODO API
    UserToUserApi.like({ toUserId: userId })
  }, [])
  
  
  
  return (
    <PageLayout vp
      data-display-name='ProfileOverviewPage'
    >
      <PageContentLayout full>
        <Flex full relative noOverflow>
          {isLoading && (
            <Flex full center>Загрузка...</Flex>
          )}
          {isError && (
            <Flex full center>Ошибка</Flex>
          )}
          {user && (
            <Flex absTlwh>
              <MediaArrayDownloader medias={userPhotosAToMedias(user.photos)}>
                {photos => (
                  <ProfileCards
                    photos={photos}
                    name={user.name}
                    birthDate={user.birthDate}
                    gender={user.gender}
                    aboutMe={user.aboutMe}
                    onAccept={() => onLike(user.id)}
                  />
                )}
              </MediaArrayDownloader>
            </Flex>
          )}
        </Flex>
      </PageContentLayout>
    </PageLayout>
  )
})
ProfileOverviewPage.displayName = 'ProfileOverviewPage'
export default ProfileOverviewPage

