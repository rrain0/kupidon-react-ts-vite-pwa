import React from 'react'
import { TypeU } from 'src/util/common/TypeU'
import isfunction = TypeU.isfunction
import isobject = TypeU.isobject



export const combineRefs =
  <T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> =>
    (instance: T | null) => {
      refs.forEach(ref => {
        if (isfunction(ref))
          ref(instance)
        else if (isobject(ref))
          (ref.current as T | null) = instance
      })
    }
  

