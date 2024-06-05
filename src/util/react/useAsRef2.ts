import React from 'react'
import { useRef2 } from 'src/util/react/useRef2.ts'



export const useAsRef2 = <T>(value: T) => {
  const [getValue, setValue] = useRef2(value)
  setValue(value)
  return getValue
}