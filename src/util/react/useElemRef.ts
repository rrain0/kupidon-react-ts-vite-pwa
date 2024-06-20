import React, { useCallback, useRef } from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import Getter = TypeUtils.Getter



export const useElemRef = <T>(initialValue: T | null = null) => {
  const ref = useRef<T>(initialValue)
  const get = useCallback(() => ref.current, [])
  return [get, ref] as readonly [Getter<T | null>, React.RefObject<T>]
}