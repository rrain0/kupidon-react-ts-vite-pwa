import { useLayoutEffect } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty
import cmcss from 'src/styles/common.module.scss'







function eventPreventDefault(ev){
  ev.preventDefault()
}


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = [37,38,39,40]
function preventDefaultForScrollKeys(ev) {
  if (keys.includes(ev.keyCode)) {
    eventPreventDefault(ev)
    return false;
  }
}


let scrollLeft = 0
let scrollTop = 0
function onWindowScroll(this: Window, ev: Event){
  window.scrollTo(scrollLeft,scrollTop)
}


// Modern Chrome requires { passive: false } when adding event.
// Check if browser uses { passive: false }.
let supportsPassive = false
try {
  (window.addEventListener as any)(
    'test',
    null,
    // @ts-ignore
    { get passive(){ supportsPassive = true } },
  )
} catch(e) {}




// call this to disable window scroll
function disableScroll(){
  window.addEventListener('DOMMouseScroll', eventPreventDefault, false) // older FF
  window.addEventListener(
    'mousewheel',
    eventPreventDefault,
    supportsPassive && { passive: false }
  ) // modern desktop
  window.addEventListener(
    'wheel',
    eventPreventDefault,
    supportsPassive && { passive: false }
  ) // modern desktop
  /* window.addEventListener(
    'touchmove',
    eventPreventDefault,
    supportsPassive && { passive: false }
  ) // mobile */
  window.addEventListener('keydown', preventDefaultForScrollKeys, false)
  
  document.body.classList.add(cmcss.noScroll)
  
  // if scroll happened after all
  scrollLeft = window.scrollX
  scrollTop = window.scrollY
  window.addEventListener('scroll', onWindowScroll, false)
}



// call this to enable window scroll
function enableScroll(){
  window.removeEventListener('DOMMouseScroll', eventPreventDefault, false) // older FF
  window.removeEventListener(
    'mousewheel',
    eventPreventDefault,
  ) // modern desktop
  window.removeEventListener(
    'wheel',
    eventPreventDefault,
  ) // modern desktop
  /* window.removeEventListener(
    'touchmove',
    eventPreventDefault,
  ) // mobile */
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
  
  document.body.classList.remove(cmcss.noScroll)
  
  // if scroll happened after all
  window.removeEventListener('scroll', onWindowScroll, false)
}



export const useWindowScrollLock = (lock?: boolean | empty)=>{
  useLayoutEffect(()=>{
    if (lock){
      disableScroll()
      return enableScroll
    }
  },[lock])
}