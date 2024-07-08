import { useRefGetSet } from 'src/util/react-ref/useRefGetSet.ts'



export const useAsRefGetSet = <T>(currentValue: T) => {
  const [get, set] = useRefGetSet(currentValue)
  set(currentValue)
  return get
}

