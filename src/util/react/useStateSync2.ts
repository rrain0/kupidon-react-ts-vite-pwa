import { useEffect } from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { useRef2 } from 'src/util/react/useRef2.ts'
import Setter = TypeUtils.Setter
import Mapper2 = TypeUtils.Mapper2



export const useStateSync2 =
<M, S>(
  main: M, secondary: S,
  setMain: Setter<M>, setSecondary: Setter<S>,
  computeMain: Mapper2<M, S, M>, computeSecondary: Mapper2<M, S, S>
) => {
  
  /*
  useEffect(()=>{
    console.log('main, secondary', main, secondary)
  }, [main, secondary])
  */
  
  const [getHasMainFromSec, setHasMainFromSec] = useRef2(false)
  const [getMainFromSec, setMainFromSec] = useRef2(main)
  const [getIsMain, setIsMain] = useRef2(false)
  
  
  useEffect(() => {
    if (getHasMainFromSec() && getMainFromSec() === main) {
      setHasMainFromSec(false)
      return
    }
    setIsMain(true)
    const newSecondary = computeSecondary(main, secondary)
    setSecondary(newSecondary)
  }, [main])
  
  useEffect(() => {
    if (!getIsMain()) {
      const newMain = computeMain(main, secondary)
      setMain(newMain)
      
      setMainFromSec(newMain)
      setHasMainFromSec(true)
    }
  }, [secondary])
  
  // по факту выполняется перед эффектами
  setIsMain(false)
  
  
}