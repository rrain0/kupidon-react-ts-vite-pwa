import { ServiceWorkerU } from '@util/app/ServiceWorkerU.ts'
import { ArrayU } from '@util/common/ArrayU.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import React, { useLayoutEffect } from 'react'



type PageState =
  | null
  | 'Active' // page visible + has viewport focus
  | 'Passive' // page visible
  | 'Hidden' // page not visible
  | 'Frozen' // page not visible + has frozen
  | 'Discarded' // page is unloaded to conserve resources
  | 'Terminated' // page has started being unloaded and cleared from memory

type PageEvent =
  | null
  | 'load'
  | 'pageshow'
  | 'windowfocus'
  | 'windowblur'
  | 'visibilitychange'
  | 'resume'
  | 'freeze'
  | 'pagehide'


let pageState: PageState = (() => {
  if (document.hasFocus()) return 'Active'
  else if (document.visibilityState === 'visible') return 'Passive'
  else if (document.visibilityState === 'hidden') return 'Hidden'
  return null
})()
let pageEvent: PageEvent = null

type OnPageState = (pageState: PageState) => void

const pageStateListeners: OnPageState[] = []
const addPageStateListener = (onPageState: OnPageState) => {
  pageStateListeners.push(onPageState)
}
const removePageStateListener = (onPageState: OnPageState) => {
  ArrayU.remove(pageStateListeners, onPageState)
}


const getActiveOrPassiveOrHidden = (): PageState => {
  if (document.visibilityState === 'hidden') return 'Hidden'
  if (document.hasFocus()) return 'Active'
  return 'Passive'
}


const updatePageState = (newPageEvent: PageEvent) => {
  console.log('newPageEvent', newPageEvent)
  const newPageState: PageState = (() => {
    if (newPageEvent === 'load') {
      if (document['wasDiscarded']) return 'Discarded'
      return pageState
    }
    else if (newPageEvent === 'pageshow') return getActiveOrPassiveOrHidden()
    else if (newPageEvent === 'windowfocus') return getActiveOrPassiveOrHidden()
    else if (newPageEvent === 'windowblur') return getActiveOrPassiveOrHidden()
    else if (newPageEvent === 'visibilitychange') return getActiveOrPassiveOrHidden()
    else if (newPageEvent === 'pagehide') return pageState
    else if (newPageEvent === 'freeze') return 'Hidden'
    else if (newPageEvent === 'resume') {
      if (document.visibilityState === 'hidden') return 'Hidden'
      return pageState
    }
    
    console.warn(`Undefined page next state from ` +
      `curr state: ${pageState} and new page event: ${newPageEvent}`
    )
    return getActiveOrPassiveOrHidden()
  })()
  const isNewPageState = pageState !== newPageState
  const isNewPageEvent = pageEvent !== newPageEvent
  pageState = newPageState
  pageEvent = newPageEvent
  if (isNewPageEvent) {
    console.log('pageEvent', pageEvent)
  }
  if (isNewPageState) {
    console.log('pageState', pageState)
    pageStateListeners.forEach(listener => listener(pageState))
  }
}



document.addEventListener('load', () => updatePageState('load'))
document.addEventListener('pageshow', () => updatePageState('pageshow'))
// лучше на этих эвентах делать фокус / расфокус  Active / Passive
window.addEventListener('focus', () => updatePageState('windowfocus'))
window.addEventListener('blur', () => updatePageState('windowblur'))
//document.addEventListener('focusin', () => updatePageState('focusin'))
//document.addEventListener('focusout', () => updatePageState('focusout'))
document.addEventListener('pagehide', () => updatePageState('pagehide'))
document.addEventListener('visibilitychange', () => updatePageState('visibilitychange'))
document.addEventListener('freeze', () => updatePageState('freeze'))
document.addEventListener('resume', () => updatePageState('resume'))




const UsePageLifecycle = React.memo(() => {
  
  const [getIsOnline, setIsOnline] = useRefGetSet(false)
  
  useLayoutEffect(() => {
    const onPageState = (pageState: PageState) => {
      console.log('onPageState', pageState)
      const onlineStates: PageState[] = ['Active', 'Passive']
      const isOnline = onlineStates.includes(pageState)
      const isOnlineChanged = getIsOnline() !== isOnline
      setIsOnline(isOnline)
      if (isOnlineChanged) {
        if (isOnline) {
          ServiceWorkerU.sendMsgAndAwaitAnswer({ type: 'BECAME_ONLINE' }).catch(() => undefined)
        }
        else {
          ServiceWorkerU.sendMsgAndAwaitAnswer({ type: 'BECAME_OFFLINE' }).catch(() => undefined)
        }
      }
    }
    onPageState(pageState)
    addPageStateListener(onPageState)
    return () => removePageStateListener(onPageState)
  }, [])
  
  return undefined
})
UsePageLifecycle.displayName = 'UsePageLifecycle'
export default UsePageLifecycle

