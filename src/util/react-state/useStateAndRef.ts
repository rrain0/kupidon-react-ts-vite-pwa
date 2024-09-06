import { useEffect, useState } from 'react'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'


export const useStateAndRef = <S>(initialState: S | (() => S)) => {
  const [state, setState] = useState(initialState)
  
  const [getRefValue, setRefValue, ref] = useRefGetSet(state)
  useEffect(() => setRefValue(state), [state])
  
  return [state, setState, getRefValue, ref] as const
}
