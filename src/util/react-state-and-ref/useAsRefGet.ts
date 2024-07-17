import { useRefGetSet } from 'src/util/react-state-and-ref/useRefGetSet.ts'



export const useAsRefGet = <T>(currentValue: T) => {
  const [get, set] = useRefGetSet(currentValue)
  set(currentValue)
  return get
}

