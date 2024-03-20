import React, { useRef } from 'react'



export const useAsRef = <T>(value: T): React.MutableRefObject<T> => {
  const valueRef = useRef(value)
  valueRef.current = value
  return valueRef
}