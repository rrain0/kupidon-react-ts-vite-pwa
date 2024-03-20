import { useEffect, useRef, useState } from 'react'


export const useStateAndRef = <S>(initialState: S | (() => S)) => {
  const [state, setState] = useState(initialState)
  
  const stateRef = useRef<S>(state)
  useEffect(()=>{ stateRef.current = state },[state])
  
  return [state, setState, stateRef] as const
}