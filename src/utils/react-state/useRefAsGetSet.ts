import React, { useCallback } from 'react'



export const useRefAsGetSet = <T>(ref: React.MutableRefObject<T>) => {
  const get = useCallback(() => ref.current, [])
  const set = useCallback((value: T) => { ref.current = value }, [])
  return [get, set, ref] as const
}
