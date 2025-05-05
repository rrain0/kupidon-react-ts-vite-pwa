import React from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import Callback1 = TypeU.Callback1
import Setter = TypeU.Setter
import Getter = TypeU.Getter



export const useElemRefGetSet = <T extends HTMLElement = HTMLDivElement>(
  onSet?: Callback1<T | null>,
  initialValue: T | null = null,
) => {
  return useRefGetSet(initialValue, onSet) as [
    Getter<T | null>, Setter<T | null>, React.RefObject<T | null>
  ]
}
