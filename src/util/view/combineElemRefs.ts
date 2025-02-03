import React from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import isfunction = TypeU.isfunction
import isobject = TypeU.isobject



export const combineElemRefs = <T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> => {
  return (instance: T | null) => {
    refs.forEach(ref => {
      if (isfunction(ref)) {
        ref(instance)
      }
      else if (isobject(ref)) {
        (ref as { current: T | null }).current = instance
      }
    })
  }
}
  

