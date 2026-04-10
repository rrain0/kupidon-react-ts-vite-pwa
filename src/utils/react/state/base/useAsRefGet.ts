import { useRefGetSet } from 'src/utils/react/state/base/useRefGetSet.ts'



export const useAsRefGet = <T>(currentValue: T) => {
  const [get, set, ref] = useRefGetSet(currentValue)
  set(currentValue)
  return [get, ref] as const
}

