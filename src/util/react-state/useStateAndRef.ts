import { useCallback, useEffect, useState } from 'react'
import { TypeU } from 'src/util/common/TypeU'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import isfunction = TypeU.isfunction
import Setter = TypeU.Setter
import ValueOrGenerator = TypeU.ValueOrGenerator


export const useStateAndRef = <S>(initialState: ValueOrGenerator<S>) => {
  const [state, setState] = useState(initialState)
  // useState handles initial value for ref to be set
  const [getRefValue, setRefValue, ref] = useRefGetSet(state)
  
  // Only Setter, if you need Updater, then use Setter + getRefValue()
  const set: Setter<S> = useCallback(value => {
    setRefValue(value)
    setState(value)
  }, [])
  
  return [state, getRefValue, set, ref] as const
}
