import { useCallback, useState } from 'react'
import { TypeU } from 'src/util/common/TypeU'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import Setter = TypeU.Setter
import ValueOrProducer = TypeU.ValueOrProducer
import Updater = TypeU.Updater
import SetterOrUpdater = TypeU.SetterOrUpdater
import isfunction = TypeU.isfunction



export const useStateAndRef = <S>(initialState: ValueOrProducer<S>) => {
  const [state, setState] = useState(initialState)
  // useState handles initial value for ref to be set
  const [get, setRef, ref] = useRefGetSet(state)
  
  const set: Setter<S> = useCallback(value => {
    setRef(value)
    setState(value)
  }, [])
  
  const update: Updater<S> = useCallback(updater => {
    set(updater(get()))
  }, [])
  
  const setOrUpdate: SetterOrUpdater<S> = useCallback(valueOrUpdater => {
    if (isfunction(valueOrUpdater)) update(valueOrUpdater)
    else set(valueOrUpdater)
  }, [])
  
  return { get, set, update, setOrUpdate, state, ref }
}
