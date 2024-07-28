import React, { useRef } from 'react'



export const useAsRef = <T>(currentValue: T): React.MutableRefObject<T> => {
  const valueRef = useRef(currentValue)
  valueRef.current = currentValue
  return valueRef
}
