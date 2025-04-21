import { useCallback, useState } from 'react'
import { TypeU } from 'src/util/common/TypeU'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import Setter = TypeU.Setter
import ValueOrProducer = TypeU.ValueOrProducer



export const useStateAndRef = <S>(initialState: ValueOrProducer<S>) => {
  const [stateValue, setStateValue] = useState(initialState)
  // useState handles initial value for ref to be set
  const [getRefValue, setRefValue, ref] = useRefGetSet(stateValue)
  
  // Only Setter, if you need Updater, then use Setter + getRefValue()
  const set: Setter<S> = useCallback(value => {
    setRefValue(value)
    setStateValue(value)
  }, [])
  
  return [getRefValue, set, stateValue, ref] as const
}
