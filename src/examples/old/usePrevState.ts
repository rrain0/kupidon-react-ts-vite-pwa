import { Dispatch, useCallback, useState } from 'react';


export const usePrevState = <S>(initialState: S | (() => S)) => {
  // @ts-ignore
  const initialValue: S = typeof initialState==='function' ? initialState() : initialState
  const [container, setContainer] = useState<{ now: S, prev: S }>(
    { now: initialValue, prev: initialValue }
  )
  
  const setValue: Dispatch<S | ((state: S, prevState: S) => S)> = useCallback((value) => {
    setContainer(oldV=>{
      const newValue: S = typeof value==='function'
        //@ts-ignore
        ? value(oldV.now, oldV.prev) 
        : value
      if (newValue===oldV.now) return oldV
      return { now: newValue, prev: oldV.now }
    })
  },[])
  
  return [container.now, container.prev, setValue] as const
}