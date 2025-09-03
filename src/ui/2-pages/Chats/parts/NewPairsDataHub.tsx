import { useLiveUsersStatus } from '@utils/app/useLiveUsersStatus.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import React, { useCallback, useEffect, useState } from 'react'
import { UsersApi } from 'src/api/requests/UsersApi.ts'
import { useFormApiRequest } from '@mini-libs/api/useFormApiRequest.ts'
import { UserPairA } from 'src/models/api/UserPairA.ts'
import NewPairsList, { NewPairItem } from 'src/ui/2-pages/Chats/parts/NewPairsList.tsx'
import isdef = TypeU.isdef



const NewPairsDataHub = React.memo(() => {
  
  const [items, setItems] = useState(undefined as UserPairA[] | undefined)
  
  
  const usersStatus = useLiveUsersStatus(
    'chatsPageNewPairsDataHub',
    items?.map(it => ({ id: it.toUser.id, online: it.toUser.online ?? false }))
  )
  
  useEffect(() => {
    if (usersStatus) {
      const m = usersStatus.map
      setItems(s => s?.map(it => {
        const { id, online } = it.toUser
        const us = m.get(id)
        if (us && us.online !== online) {
          return { ...it, toUser: { ...it.toUser, online: us.online } }
        }
        return it
      }))
    }
  }, [usersStatus])
  
  
  const [uiItems, setUiItems] = useState<NewPairItem[]>([])
  
  useEffect(() => {
    if (isdef(items)) {
      setUiItems(items.map(it => {
        return {
          id: it.toUser.id,
          ava: it.toUser.ava,
          name: it.toUser.name,
          online: it.toUser.online,
          createdAt: it.createdAt,
        }
      }))
    }
  }, [items])
  
  
  //wait(500, () => setItems(data))
  
  
  
  const {
    request,
    isLoading, isSuccess, isError,
    response, resetResponse,
  } = useFormApiRequest({
    values: { },
    prepareAndRequest: useCallback(() => {
      return UsersApi.newPairs()
    }, []),
  })
  
  useEffect(() => {
    request()
  }, [])
  
  
  useEffect(() => {
    if (isSuccess && response?.isSuccess) {
      setItems(response.data.newPairs)
    }
  }, [isSuccess])
  
  
  
  return !!uiItems?.length && (
    <NewPairsList newPairItems={uiItems}/>
  )
})
NewPairsDataHub.displayName = 'NewPairsDataHub'
export default NewPairsDataHub