import { useSpring } from '@react-spring/web'
import { useCallback } from 'react'
import { TypeU } from 'src/util/common/TypeU'
import { useResize } from 'src/util/view/useResize'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
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
  
  const updateElem = useResize<T>(onResizeToSpring)
  
  const [getElem, setElem, refElem] = useRefGetSet<E>(null, updateElem)
  
  return [spring, setElem] as const
}

