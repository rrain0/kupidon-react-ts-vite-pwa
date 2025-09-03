import React from 'react'

import { isfunction } from 'src/utils/base/TypeUtils.ts'
import { isobject } from 'src/utils/base/TypeUtils.ts'



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
  

