import { useState } from 'react'
import { useEvent } from 'src/utils/react/useEvent.ts'



export const usePrevState = <T>(currState: T): T | undefined => {
  const [prev, setPrev] = useState<T | undefined>(undefined)
  useEvent(() => {
    if (currState !== prev) setPrev(currState)
  }, [currState])
  return prev
}
