import { useCallback, useState } from 'react'

import { useRefGetSet } from 'src/utils/react/state/useRefGetSet.ts'
import { Setter } from 'src/utils/base/typeUtils.ts'
import { ValueOrProducer } from 'src/utils/base/typeUtils.ts'
import { Updater } from 'src/utils/base/typeUtils.ts'
import { SetterOrUpdater } from 'src/utils/base/typeUtils.ts'
import { isfunction } from 'src/utils/base/typeUtils.ts'



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
