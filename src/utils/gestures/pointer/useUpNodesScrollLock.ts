import React, { useLayoutEffect } from 'react'

import commonCss from 'src/styles/common/common.module.scss'
import { Pu } from 'src/utils/base/math/typeUtils.ts'



export const useUpNodesScrollLock = (
  lock: boolean = false,
  options: Pu<{
    element: Element,
    elementRef: React.RefObject<Element | null>,
  }> = { },
) => {
  useLayoutEffect(() => {
    const el = (() => {
      if (options.element) return options.element
      if (options.elementRef) return options.elementRef.current
      return undefined
    })()
    if (lock) {
      // Setting overflow on body passes directly to WINDOW
      const x: Element[] = [document.body]
      const y: Element[] = [document.body]
      if (el) {
        let up = el.parentElement
        while (up) {
          const getComputedStyle = (() => {
            if (up.computedStyleMap as unknown) {
              return (prop: string) => up!.computedStyleMap().get(prop)
            }
            return (prop: string) => window.getComputedStyle(up!)[prop]
          })()
          if (['auto', 'scroll'].includes(getComputedStyle('overflow-x') as any)) {
            x.push(up)
          }
          if (['auto', 'scroll'].includes(getComputedStyle('overflow-y') as any)) {
            y.push(up)
          }
          up = up.parentElement
        }
      }
      
      x.forEach(el => el.classList.add(commonCss.noScrollX))
      y.forEach(el => el.classList.add(commonCss.noScrollY))
      
      return () => {
        x.forEach(el => el.classList.remove(commonCss.noScrollX))
        y.forEach(el => el.classList.remove(commonCss.noScrollY))
      }
    }
  }, [lock, options.element, options.elementRef?.current])
}
