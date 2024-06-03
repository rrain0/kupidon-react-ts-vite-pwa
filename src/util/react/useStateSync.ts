import { useEffect } from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { useRef2 } from 'src/util/react/useRef2.ts'
import Setter = TypeUtils.Setter



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
  
  const [getIsMain, setIsMain] = useRef2(false)
  
  
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