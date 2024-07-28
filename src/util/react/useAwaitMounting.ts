import { useLayoutEffect } from 'react'
import { useBool } from 'src/util/react-state/useBool.ts'



// forbid draw to screen before data from element ref are available
export const useAwaitMounting = () => {
  const [ , setMountIsCompleted] = useBool(false)
  useLayoutEffect(setMountIsCompleted, [])
}
