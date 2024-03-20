import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import commonCss from 'src/styles/common.module.scss'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef







/*
* Аналогично CSS 'touch-action: none;'
* Может отменить перехват жестов браузером уже ПОСЛЕ появления события.
* */
export const useNoTouchAction = (
  lock: boolean = false,
  options: PartialUndef<{
    element: Element,
    elementRef: React.RefObject<Element>,
  }> = {},
)=>{
  const refElem = options.elementRef?.current
  
  
  // Листенеры не должны переприсваиваться при изменении lock, поэтому она в рефе,
  // иначе они то ли успевают сработать, то ли порядок листенеров имеет значение
  // и надо чтобы они были первее.
  const preventDefault = useRef(false)
  useLayoutEffect(
    ()=>{
      preventDefault.current = lock
    },
    [lock]
  )
  
  const onTouch = useCallback(
    (ev: Event)=>{
      //console.log('preventDefault.current',preventDefault.current)
      if (preventDefault.current) {
        ev.preventDefault()
      }
    },
    []
  )
  
  useLayoutEffect(
    ()=>{
      const target = function(){
        if (options.element) return options.element
        if (refElem) return null
        return window
      }()
      if (target){
        target.addEventListener('touchstart',onTouch,{ passive: false })
        target.addEventListener('touchmove',onTouch,{ passive: false })
        target.addEventListener('touchend',onTouch,{ passive: false })
        target.addEventListener('touchcancel',onTouch,{ passive: false })
        return ()=>{
          target.removeEventListener('touchstart',onTouch)
          target.removeEventListener('touchmove',onTouch)
          target.removeEventListener('touchend',onTouch)
          target.removeEventListener('touchcancel',onTouch)
        }
      }
      /* else {
        window.removeEventListener('touchstart',onTouch)
        window.removeEventListener('touchmove',onTouch)
      } */
    },
    [options.element]
  )
  
  useEffect(
    ()=>{
      const target = function(){
        if (options.element) return null
        if (refElem) return refElem
        return null
      }()
      if (target){
        console.log('elemRef')
        target.addEventListener('touchstart',onTouch,{ passive: false })
        target.addEventListener('touchmove',onTouch,{ passive: false })
        target.addEventListener('touchend',onTouch,{ passive: false })
        target.addEventListener('touchcancel',onTouch,{ passive: false })
        return ()=>{
          target.removeEventListener('touchstart',onTouch)
          target.removeEventListener('touchmove',onTouch)
          target.removeEventListener('touchend',onTouch)
          target.removeEventListener('touchcancel',onTouch)
        }
      }
      /* else {
        window.removeEventListener('touchstart',onTouch)
        window.removeEventListener('touchmove',onTouch)
      } */
    },
    [refElem]
  )
  
  
  
  useLayoutEffect(
    ()=>{
      const target = function(){
        if (options.element) return options.element
        if (options.elementRef) return options.elementRef.current
        return document.documentElement // get html
      }()
      if (target && lock) {
        target.classList.add(commonCss.noTouchAction)
        return ()=>{
          target.classList.remove(commonCss.noTouchAction)
        }
      }
      /* else {
       target.classList.remove(commonCss.noTouchAction)
      } */
    },
    [lock, options.element, options.elementRef?.current]
  )
  
  
  
}