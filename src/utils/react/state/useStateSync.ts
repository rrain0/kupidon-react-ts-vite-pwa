import { useEffect } from 'react'

import { useRefGetSet } from 'src/utils/react/state/base/useRefGetSet.ts'
import { Setter } from 'src/utils/base/tsUtils.ts'



export const useStateSync = <T>(
  main: T, secondary: T,
  setMain: Setter<T>, setSecondary: Setter<T>
) => {
  
  /*
  useEffect(() => {
    console.log('main, secondary', main, secondary)
  }, [main, secondary])
  */
  
  const [getIsMain, setIsMain] = useRefGetSet(false)
  
  
  useEffect(() => {
    setIsMain(true)
    setSecondary(main)
  }, [main])
  
  useEffect(() => {
    if (!getIsMain()) {
      setMain(secondary)
      //setMainFromSec(secondary)
    }
  }, [secondary])
  
  // по факту выполняется перед эффектами
  setIsMain(false)
  
  
}
