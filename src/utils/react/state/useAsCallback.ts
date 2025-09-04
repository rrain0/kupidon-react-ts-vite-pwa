import { useCallback } from 'react'

import { useAsRefGet } from 'src/utils/react/state/useAsRefGet.ts'
import { anyfun } from 'src/utils/base/math/typeUtils.ts'



export function useAsCallback<F extends anyfun>(fun: F | undefined, deps: any[] = []): F {
  const [getFun] = useAsRefGet(fun)
  const stableFun = useCallback(((...args: Parameters<F>) => {
    return getFun()?.(...args)
  }) as F, deps)
  return stableFun
}

