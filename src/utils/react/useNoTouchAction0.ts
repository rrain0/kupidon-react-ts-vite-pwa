import { useLayoutEffect } from 'react'
import commonCss from 'src/styles/common.module.scss'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef




const onTouch = (ev: Event)=>{
  ev.preventDefault()
}




/*
* Аналогично CSS 'touch-action: none;'
* Может отменить перехват жестов браузером уже ПОСЛЕ появления события.
* */
export const useNoTouchAction0 = (
  lock: boolean = false,
  options: PartialUndef<{
    element: Element,
    elementRef: React.RefObject<Element>,
  }> = {},
)=>{
  
  
  useLayoutEffect(
    ()=>{
      const target = function(){
        if (options.element) return options.element
        if (options.elementRef) return options.elementRef.current
        return window
      }()
      if (target && lock){
        target.addEventListener('touchstart',onTouch,{ passive: false })
        target.addEventListener('touchmove',onTouch,{ passive: false })
        return ()=>{
          target.removeEventListener('touchstart',onTouch)
          target.removeEventListener('touchmove',onTouch)
        }
      }
      /* else {
        window.removeEventListener('touchstart',onTouch)
        window.removeEventListener('touchmove',onTouch)
      } */
    },
    [lock, options.element, options.elementRef?.current]
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
        return () => {
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