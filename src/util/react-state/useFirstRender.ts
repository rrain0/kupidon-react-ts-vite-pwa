import { useEffect } from 'react'
import { useBool } from 'src/util/react-state/useBool'



export const useFirstRender = () => {
  
  const [isFirst, , setNotFirst] = useBool(true)
  
  useEffect(setNotFirst, [])
  
  return isFirst
}

