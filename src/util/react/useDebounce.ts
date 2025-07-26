import { useEffect } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useAsCallback } from 'src/util/react-state/useAsCallback.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import Callback = TypeU.Callback




export const useDebounce = ({
  callback, // supports unstable
  delay,
  cancelOnUnmount = true,
  deps = [],
}: {
  callback: Callback
  delay: number
  cancelOnUnmount?: boolean | undefined
  deps?: any[] | undefined
}) => {
  const cb = useAsCallback(callback)
  const [getTimerId, setTimerId] = useRefGetSet<any>(undefined)
  
  const debounce = () => {
    clearTimeout(getTimerId())
    const id = setTimeout(cb, delay)
    setTimerId(id)
  }
  useEffect(debounce, deps)
  const debouncedCallback = useAsCallback(debounce)
  
  const tryCancelOnUnmount = useAsCallback(() => {
    if (cancelOnUnmount) clearTimeout(getTimerId())
  })
  useEffect(() => tryCancelOnUnmount, [])
  
  return debouncedCallback // stable
}
