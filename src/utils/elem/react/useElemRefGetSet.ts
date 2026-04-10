import React from 'react'
import type { Cb1, Getter, Setter } from 'src/utils/base/tsUtils.ts'
import { useRefGetSet } from 'src/utils/react/state/base/useRefGetSet.ts'



export const useElemRefGetSet = <T extends HTMLElement = HTMLDivElement>(
  onSet?: Cb1<T | null>,
  initialValue: T | null = null,
) => {
  return useRefGetSet(initialValue, onSet) as [
    Getter<T | null>, Setter<T | null>, React.RefObject<T | null>
  ]
}
