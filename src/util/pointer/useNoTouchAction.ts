import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef } from 'react'
import commonCss from 'src/ui-data/style/common.module.scss'
import { TypeU } from 'src/util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef


const locks: Set<string> = new Set()

const onTouch = (ev: TouchEvent) => {
  if (locks.size) {
    ev.preventDefault()
  }
}

window.addEventListener('touchstart', onTouch, { passive: false })
window.addEventListener('touchmove', onTouch, { passive: false })
window.addEventListener('touchend', onTouch, { passive: false })
window.addEventListener('touchcancel', onTouch, { passive: false })


/*
* Аналогично CSS 'touch-action: none;'
* Может отменить перехват жестов браузером уже ПОСЛЕ появления события.
* Листенеры не должны переприсваиваться и должны быть первее.
* */
export const useNoTouchAction = (isLock = false) => {
  const reactId = useId()
  useEffect(() => {
    return () => void locks.delete(reactId)
  }, [])
  
  const lock = useCallback(() => {
    locks.add(reactId)
  }, [])
  const unlock = useCallback(() => {
    locks.delete(reactId)
  }, [])
  const setLock = useCallback((isLock = false) => {
    if (isLock) lock()
    else unlock()
  }, [])
  
  useMemo(() => {
    setLock(isLock)
  }, [isLock])
  
  return [lock, unlock, setLock]
}
