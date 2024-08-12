import { useEffect, useRef, useState } from 'react'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'


export const useStateAndRef = <S>(initialState: S | (() => S)) => {
  const [state, setState] = useState(initialState)
  
  const stateRef = useRef<S>(state)
  const [getRef, setRef, ref] = useRefGetSet(state)
  useEffect(() => setRef(state), [state])
  
  return [state, setState, getRef, stateRef] as const
}
