import { useEffect } from 'react'
import { UserStatus, useUsersStatusZustand } from 'src/zustand/status/UsersStatusZustand.ts'



export const useLiveUsersStatus = (
  consumerName: string,
  usersStatus?: UserStatus[],
) => {
  const usedUserIdsHash = JSON.stringify(usersStatus?.map(it => it.id))
  useEffect(() => {
    useUsersStatusZustand.setState(s => ({ ...s,
      [consumerName]: {
        map: new Map(usersStatus?.map(it => [it.id, it])),
      },
    }), true)
    return () => {
      useUsersStatusZustand.setState(s => {
        const newS = { ...s }
        delete newS[consumerName]
        return newS
      }, true)
    }
  }, [usedUserIdsHash])
  
  const liveUsersStatus = useUsersStatusZustand(s => s[consumerName])
  
  return liveUsersStatus
}

