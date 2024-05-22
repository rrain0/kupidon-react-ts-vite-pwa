import { useEffect } from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import Setter = TypeUtils.Setter



export const useStateSync =
<S>
(
  boolMain: S, setBoolMain: Setter<S>,
  boolSecondary: S, setBoolSecondary: Setter<S>
) => {
  
  /* useEffect(()=>{
    console.log('boolMain, boolSecondary', boolMain, boolSecondary)
  }, [boolMain, boolSecondary]) */
  
  useEffect(() => {
    //console.log('secondary boolMain, boolSecondary', boolMain, boolSecondary)
    if (boolSecondary !== boolMain) setBoolMain(boolSecondary)
  }, [boolSecondary])
  
  useEffect(() => {
    //console.log('main boolMain, boolSecondary', boolMain, boolSecondary)
    if (boolMain !== boolSecondary) {
      //setBoolMain(boolMain)
      setBoolSecondary(boolMain)
    }
  }, [boolMain])
  
  
}