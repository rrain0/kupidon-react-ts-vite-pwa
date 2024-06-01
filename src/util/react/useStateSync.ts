import { useEffect } from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import Setter = TypeUtils.Setter



export const useStateSync =
<S>
(
  main: S, setMain: Setter<S>,
  secondary: S, setSecondary: Setter<S>
) => {
  
  
  /* useEffect(()=>{
    console.log('main, secondary', main, secondary)
  }, [main, secondary]) */
  
  useEffect(() => {
    //console.log('secondary main, secondary', main, secondary)
    if (secondary !== main) setMain(secondary)
  }, [secondary])
  
  useEffect(() => {
    //console.log('main main, secondary', main, secondary)
    if (main !== secondary) {
      //setMain(main)
      setSecondary(main)
    }
  }, [main])
  
  
}