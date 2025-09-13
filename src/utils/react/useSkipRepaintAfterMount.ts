import { useLayoutEffect } from 'react'
import { useBool } from 'src/utils/state/react/base/useBool.ts'



// forbid draw to screen before data from element's ref are available
export const useSkipRepaintAfterMount = () => {
  const [ , setMountIsCompleted] = useBool(false)
  useLayoutEffect(setMountIsCompleted, [])
}
