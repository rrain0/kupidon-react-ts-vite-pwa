import React, { useCallback, useRef } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import Getter = TypeU.Getter



export const useElemRef = <T = HTMLDivElement>(initialValue: T | null = null) => {
  const ref = useRef<T>(initialValue)
  const get = useCallback(() => ref.current, [])
  return [ref, get] as readonly [React.RefObject<T>, Getter<T | null>]
}
