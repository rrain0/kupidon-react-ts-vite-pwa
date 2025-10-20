import { useEffect } from 'react'
import { useBool } from 'src/utils/state/react/useBool.ts'



export const useIsMount = () => {
  
  const { value: isMount, setFalse: setIsNotMount } = useBool(true)
  
  useEffect(setIsNotMount, [])
  
  return isMount
}

