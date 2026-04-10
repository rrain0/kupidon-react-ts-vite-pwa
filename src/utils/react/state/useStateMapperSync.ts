import { useEffect } from 'react'
import type { Mapper2, Setter } from 'src/utils/base/tsUtils.ts'
import { useRefGetSet } from 'src/utils/react/state/base/useRefGetSet.ts'



export const useStateMapperSync =
<M, S>(
  main: M, secondary: S,
  setMain: Setter<M>, setSecondary: Setter<S>,
  secondaryToMain: Mapper2<S, M, M>, mainToSecondary: Mapper2<M, S, S>
) => {
  
  /*
  useEffect(() => {
    console.log('main, secondary', main, secondary)
  }, [main, secondary])
  */
  
  const [getHasMainFromSec, setHasMainFromSec] = useRefGetSet(false)
  const [getMainFromSec, setMainFromSec] = useRefGetSet(null as M | null)
  const [getIsMain, setIsMain] = useRefGetSet(false)
  
  
  useEffect(() => {
    if (getHasMainFromSec() && getMainFromSec() === main) {
      setMainFromSec(null)
      setHasMainFromSec(false)
      return
    }
    setIsMain(true)
    const newSecondary = mainToSecondary(main, secondary)
    setSecondary(newSecondary)
  }, [main])
  
  useEffect(() => {
    if (!getIsMain()) {
      const newMain = secondaryToMain(secondary, main)
      setMain(newMain)
      
      setMainFromSec(newMain)
      setHasMainFromSec(true)
    }
  }, [secondary])
  
  // по факту выполняется перед эффектами
  setIsMain(false)
  
  
}
