import { useEffect } from 'react'
import { ArrayU } from 'src/util/common/ArrayU'
import { TypeU } from 'src/util/common/TypeU'
import { useFirstRender } from 'src/util/react-state/useFirstRender'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import Callback = TypeU.Callback




// Triggers only once if deps changed:
// ● Does not trigger twice via react dev double rerender
// ● Does not trigger at all until deps values change
// ● Can skip first render triggering

export const useEvent = (
  onEvent: Callback,
  deps: any[] | undefined = undefined,
  triggerOnMount = false,
) => {
  
  const isMount = useFirstRender()
  const [getPrev, setPrev] = useRefGetSet<any[] | undefined>(undefined)
  
  useEffect(() => {
    if (deps === undefined || !ArrayU.eq(deps, getPrev())) {
      if (!(!triggerOnMount && isMount)) {
        onEvent()
      }
    }
    setPrev(deps)
  }, deps)
  
}


