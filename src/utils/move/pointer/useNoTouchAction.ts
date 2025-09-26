import { useCallback, useEffect, useId, useMemo } from 'react'

import { isdef } from 'src/utils/base/tsUtils.ts'



const locks: Set<string> = new Set()


const onTouch = (ev: TouchEvent) => {
  if (locks.size) ev.preventDefault()
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
export const useNoTouchAction = (noTouchAction?: boolean) => {
  const reactId = useId()
  
  const lock = useCallback(() => {
    locks.add(reactId)
  }, [])
  const unlock = useCallback(() => {
    locks.delete(reactId)
  }, [])
  const setLock = useCallback((noTouchAction = false) => {
    noTouchAction ? lock() : unlock()
  }, [])
  
  // Instant effect
  useMemo(() => {
    if (isdef(noTouchAction)) setLock(noTouchAction)
  }, [noTouchAction])
  
  useEffect(unlock, [])
  
  return {
    allowTouchAction: unlock,
    forbidTouchAction: lock,
    setNoTouchAction: setLock,
  }
}
