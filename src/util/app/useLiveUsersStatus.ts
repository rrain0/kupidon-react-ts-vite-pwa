import { useEffect } from 'react'
import { UserStatus, useUsersStatusZustand } from 'src/zustand/status/UsersStatusZustand.ts'



export const useLiveUsersStatus = (
  consumerName: string,
  usersStatus?: UserStatus[],
) => {
  const usedUserIdsHash = JSON.stringify(usersStatus?.map(it => it.id))
  useEffect(() => {
    useUsersStatusZustand.setState({
      [consumerName]: {
        map: new Map(usersStatus?.map(it => [it.id, it])),
      },
    })
    return () => {
      useUsersStatusZustand.setState(s => {
        const newS = { ...s }
        delete newS[consumerName]
        return newS
      })
    }
  }, [usedUserIdsHash])
  
  const liveUsersStatus = useUsersStatusZustand(s => s[consumerName])
  
  return liveUsersStatus
}

