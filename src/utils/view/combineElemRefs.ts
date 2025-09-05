import React from 'react'

import { isfunction } from 'src/utils/base/typeUtils.ts'
import { isobject } from 'src/utils/base/typeUtils.ts'



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
  

