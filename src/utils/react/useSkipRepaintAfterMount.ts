import { useLayoutEffect } from 'react'
import { useBool } from 'src/utils/react/state/useBool.ts'



// forbid draw to screen before data from element's ref are available
export const useSkipRepaintAfterMount = () => {
  const [ , setMountIsCompleted] = useBool(false)
  useLayoutEffect(setMountIsCompleted, [])
}
