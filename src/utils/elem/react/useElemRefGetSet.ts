import React from 'react'
import type { Cb1, Getter, Setter } from 'src/utils/base/typeUtils.ts'
import { useRefGetSet } from 'src/utils/state/react/base/useRefGetSet.ts'



export const useElemRefGetSet = <T extends HTMLElement = HTMLDivElement>(
  onSet?: Cb1<T | null>,
  initialValue: T | null = null,
) => {
  return useRefGetSet(initialValue, onSet) as [
    Getter<T | null>, Setter<T | null>, React.RefObject<T | null>
  ]
}
