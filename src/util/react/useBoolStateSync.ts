import { useEffect, useState } from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import Setter = TypeUtils.Setter



export const useBoolStateSync =
(
  boolMain: boolean, setBoolMain: Setter<boolean>,
  boolSecondary: boolean, setBoolSecondary: Setter<boolean>
) => {
  
  const [isFirstRender, setIsFirstRender] = useState(true)
  
  useEffect(() => {
    if (boolMain !== boolSecondary) setBoolSecondary(boolMain)
  }, [boolMain])
  
  useEffect(() => {
    if (boolSecondary !== boolMain && !isFirstRender) setBoolMain(boolSecondary)
  }, [boolSecondary])
  
  useEffect(() => {
    setIsFirstRender(false)
  }, [])
  
}