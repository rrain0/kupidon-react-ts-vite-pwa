import { useEffect } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import Setter = TypeU.Setter



export const useStateSync =
<T>(
  main: T, secondary: T,
  setMain: Setter<T>, setSecondary: Setter<T>
) => {
  
  /*
  useEffect(()=>{
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
