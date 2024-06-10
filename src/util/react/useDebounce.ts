import { useCallback, useEffect, useState } from 'react'


export const useDebounce =
(callback: Function, delay: number, deps: any[] | undefined = []) => {
  
  const [start, setStart] = useState(() => +new Date())
  useEffect(() => setStart(+new Date()), deps)
  
  const cb = useCallback(callback, deps)
  
  useEffect(() => {
    const timerId = setTimeout(cb,delay - (+new Date() - start))
    return () => clearTimeout(timerId)
  },[cb, start, delay])
  
}