import { useCallback, useState } from 'react'
import {
  isfunction,
  type Setter,
  type SetterOrUpdater,
  type Updater,
  type ValueOrProducer,
} from 'src/utils/base/tsUtils.ts'
import { useRefGetSet } from 'src/utils/react/state/base/useRefGetSet.ts'



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
