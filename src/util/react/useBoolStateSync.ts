import { useEffect } from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import Setter = TypeUtils.Setter



export const useBoolStateSync =
(
  boolMain: boolean, setBoolMain: Setter<boolean>,
  boolSecondary: boolean, setBoolSecondary: Setter<boolean>
) => {
  
  useEffect(()=>{
    console.log('boolMain, boolSecondary', boolMain, boolSecondary)
  }, [boolMain, boolSecondary])
  
  
  useEffect(() => {
    console.log('secondary boolMain, boolSecondary', boolMain, boolSecondary)
    if (boolSecondary !== boolMain) setBoolMain(boolSecondary)
  }, [boolSecondary])
  
  useEffect(() => {
    console.log('main boolMain, boolSecondary', boolMain, boolSecondary)
    if (boolMain !== boolSecondary) {
      setBoolMain(boolMain)
      setBoolSecondary(boolMain)
    }
  }, [boolMain])
  
  
}