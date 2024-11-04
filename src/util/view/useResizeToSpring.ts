import { useSpring } from '@react-spring/web'
import { useCallback } from 'react'
import { TypeU } from 'src/util/common/TypeU'
import { useResizeRef } from 'src/util/view/useResizeRef'
import Mapper = TypeU.Mapper



export const useResizeToSpring = <T extends HTMLElement, P extends object>(
  onResize: Mapper<T | null, P>
) => {
  
  type E = T | null
  
  const [spring, springApi] = useSpring(() => onResize(null) as any)
  
  const onResizeToSpring = useCallback((elem: E) => {
    const props = onResize(elem)
    springApi.set(props)
  }, [springApi, onResize])
  
  const refFunction = useResizeRef<T>(onResizeToSpring)
  
  return [spring, refFunction] as const
}

