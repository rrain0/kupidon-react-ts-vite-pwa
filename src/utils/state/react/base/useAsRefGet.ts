import { useRefGetSet } from 'src/utils/state/react/base/useRefGetSet.ts'



export const useAsRefGet = <T>(currentValue: T) => {
  const [get, set, ref] = useRefGetSet(currentValue)
  set(currentValue)
  return [get, ref] as const
}

