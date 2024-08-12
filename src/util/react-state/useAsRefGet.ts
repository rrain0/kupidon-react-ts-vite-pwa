import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'



export const useAsRefGet = <T>(currentValue: T) => {
  const [get, set, ref] = useRefGetSet(currentValue)
  set(currentValue)
  return [get, ref] as const
}

