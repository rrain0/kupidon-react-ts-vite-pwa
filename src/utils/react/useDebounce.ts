import { useCallback, useEffect, useState } from 'react'


export const useDebounce =
(callback: (...args: any[])=>any, delay: number, deps: any[] | undefined = []) => {
  
  const [start, setStart] = useState(()=>+new Date())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>setStart(+new Date()), deps)
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cb = useCallback(callback,deps)
  
  useEffect(()=>{
    const timerId = setTimeout(cb,delay - (+new Date() - start))
    return ()=>clearTimeout(timerId)
  },[cb,start,delay])
  
}