import { useEffect } from 'react'
import { useBool } from 'src/utils/state/react/base/useBool.ts'



export const useIsMount = () => {
  
  const [isMount, , setIsNotMount] = useBool(true)
  
  useEffect(setIsNotMount, [])
  
  return isMount
}

