import { useLayoutEffect } from 'react'
import { useBool0 } from 'src/utils/state/react/useBool0.ts'



// forbid draw to screen before data from element's ref are available
export const useSkipRepaintAfterMount = () => {
  const [ , setMountIsCompleted] = useBool0(false)
  useLayoutEffect(setMountIsCompleted, [])
}
