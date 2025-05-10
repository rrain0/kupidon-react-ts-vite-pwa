import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef } from 'react'
import commonCss from 'src/ui-data/style/common.module.scss'
import { TypeU } from 'src/util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import isdef = TypeU.isdef


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
export const useNoTouchAction = (isLock?: boolean) => {
  const reactId = useId()
  
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
  
  // Instant effect
  useMemo(() => {
    if (isdef(lock)) setLock(isLock)
  }, [isLock])
  
  useEffect(unlock, [])
  
  return {
    lockTouchAction: lock,
    unlockTouchAction: unlock,
    setLockTouchAction: setLock,
  }
}
