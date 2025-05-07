import { useCallback } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useAsRefGet } from 'src/util/react-state/useAsRefGet.ts'
import anyfun = TypeU.anyfun



export function useAsCallback<F extends anyfun>(fun: F | undefined, deps: any[] = []): F {
  const [getFun] = useAsRefGet(fun)
  const stableFun = useCallback(((...args: Parameters<F>) => {
    return getFun()?.(...args)
  }) as F, deps)
  return stableFun
}

