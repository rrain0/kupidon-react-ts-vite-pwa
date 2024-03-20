import React, { useLayoutEffect } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import commonCss from 'src/styles/common.module.scss'
import PartialUndef = TypeUtils.PartialUndef




export const useUpNodesInstantScroll = (
  lock: boolean = false,
  options: PartialUndef<{
    element: Element,
    elementRef: React.RefObject<Element>,
  }> = {},
)=>{
  useLayoutEffect(
    ()=>{
      const el = function(){
        if (options.element) return options.element
        if (options.elementRef) return options.elementRef.current
        return undefined
      }()
      if (lock){
        const elems: Element[] = [document.documentElement, document.body]
        if (el){
          let up = el.parentElement
          while (up) {
            const getComputedStyle = function(){
              if (up.computedStyleMap as unknown)
                return (prop: string)=>up!.computedStyleMap().get(prop)
              return (prop: string)=>window.getComputedStyle(up!)[prop]
            }()
            if (['auto','scroll'].includes(
              getComputedStyle('overflow') as any
            )) elems.push(up)
            up = up.parentElement
          }
        }
        
        elems.forEach(el=>el.classList.add(commonCss.instantScroll))
        return ()=>{
          elems.forEach(el=>el.classList.remove(commonCss.instantScroll))
        }
      }
    },
    [lock, options.element, options.elementRef?.current]
  )
}