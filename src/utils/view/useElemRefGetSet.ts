import React from 'react'

import { useRefGetSet } from 'src/utils/react/state/useRefGetSet.ts'
import { Callback1 } from 'src/utils/base/math/typeUtils.ts'
import { Setter } from 'src/utils/base/math/typeUtils.ts'
import { Getter } from 'src/utils/base/math/typeUtils.ts'



export const useElemRefGetSet = <T extends HTMLElement = HTMLDivElement>(
  onSet?: Callback1<T | null>,
  initialValue: T | null = null,
) => {
  return useRefGetSet(initialValue, onSet) as [
    Getter<T | null>, Setter<T | null>, React.RefObject<T | null>
  ]
}
