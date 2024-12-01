import { useCallback, useEffect, useId, useLayoutEffect, useRef } from 'react'
import commonCss from 'src/ui-data/style/common.module.scss'
import { TypeU } from 'src/util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef


const prevent: string[] = []

const onTouch = (ev: Event) => {
  if (prevent.length) {
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
export const useNoTouchAction = () => {
  const reactId = useId()
  useEffect(() => {
    return () => void prevent.splice(prevent.findIndex(el => el === reactId), 1)
  }, [])
  
  const lock = useCallback(() => {
    prevent.push(reactId)
  }, [])
  const unlock = useCallback(() => {
    prevent.splice(prevent.findIndex(el => el === reactId), 1)
  }, [])
  
  return [lock, unlock]
}
