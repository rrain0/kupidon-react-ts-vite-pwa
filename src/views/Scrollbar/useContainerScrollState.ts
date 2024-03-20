import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {ElemProps} from "src/utils/common/ElemProps"
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Setter = TypeUtils.Callback1
import Callback = TypeUtils.Callback




export type ScrollProps = {
  clientWidth: number // container width
  scrollLeft: number // ширина проскроленного контента, который слева за границей контейнера
  scrollLeftMax: number // макс ширина проскроленного контента, который слева за границей контейнера
  scrollWidth: number // content width
  clientHeight: number // container height
  scrollTop: number // высота проскроленного контента, который сверху за границей контейнера
  scrollTopMax: number // макс высота проскроленного контента, который сверху за границей контейнера
  scrollHeight: number // content height
}
export type SetScrollProps = Setter<ScrollToOptions>



export type UseContainerScrollStateProps = (
  {
    containerIsWindow: true
    containerRef?: never | undefined
  } | {
    containerIsWindow?: false | undefined
    containerRef: React.RefObject<HTMLElement>
  }
) & {
  contentRef: React.RefObject<HTMLElement>
}



export const useContainerScrollState =
({ containerIsWindow, containerRef, contentRef }: UseContainerScrollStateProps)=>{
  const getContainer = ()=>containerRef?.current
  const getContent = ()=>contentRef.current
  
  const [scrollProps, setScrollProps] = useState<ScrollProps>({
    clientWidth: 0,
    scrollLeft: 0,
    scrollLeftMax: 0,
    scrollWidth: 0,
    clientHeight: 0,
    scrollTop: 0,
    scrollTopMax: 0,
    scrollHeight: 0,
  })
  const updateScrollProps = useCallback(
    () => {
      const container = getContainer()
      const content = getContent()
      const view = containerIsWindow ? window : container
      if (view){
        const containerProps = new ElemProps(view)
        //console.log('containerView.scrollWidth',view.scrollWidth)
        let scrollProps = {
          clientWidth: containerProps.contentWidth,
          scrollLeft: containerProps.scrollLeft,
          scrollLeftMax: containerProps.scrollLeftMax,
          scrollWidth: containerProps.scrollWidth,
          clientHeight: containerProps.contentHeight,
          scrollTop: containerProps.scrollTop,
          scrollTopMax: containerProps.scrollTopMax,
          scrollHeight: containerProps.scrollHeight,
        }
        if (content){
          const contentProps = new ElemProps(content)
          // todo hack fix
          // sometimes these values from container are wrong, so better get them from content
          scrollProps = {
            ...scrollProps,
            scrollLeftMax: Math.max(contentProps.width, containerProps.width) - containerProps.width,
            scrollWidth: Math.max(contentProps.width, containerProps.width),
            scrollTopMax: Math.max(contentProps.height, containerProps.height) - containerProps.height,
            scrollHeight: Math.max(contentProps.height, containerProps.height),
          }
          //console.log('scrollProps',scrollProps)
        }
        setScrollProps(scrollProps)
      }
    },
    [containerIsWindow, getContainer()]
  )
  /* useEffect(
    ()=>console.log('scrollProps', scrollProps),
    [scrollProps]
  ) */
  
  
  
  const [canScrollHorizontally, setCanScrollHorizontally] = useState(false)
  const [canScrollVertically, setCanScrollVertically] = useState(false)
  useLayoutEffect(
    ()=>{
      setCanScrollHorizontally(scrollProps.clientWidth!==scrollProps.scrollWidth)
      setCanScrollVertically(scrollProps.clientHeight!==scrollProps.scrollHeight)
    },
    [scrollProps]
  )
  
  
  useEffect(
    ()=>{
      const container = getContainer()
      const content = getContent()
      updateScrollProps()
      const clearActions = [] as Callback[]
      if (container && (!containerIsWindow || content)){
        const resizeObserver = new ResizeObserver((entries, observer)=>{
          //console.log('entries',entries)
          //console.log('entries[0].target.scrollWidth',entries[0].target.scrollWidth)
          updateScrollProps()
        })
        if (container && !containerIsWindow) resizeObserver.observe(container)
        if (content) resizeObserver.observe(content)
        clearActions.push(()=>resizeObserver.disconnect())
      }
      if (containerIsWindow){
        const onResize = function(this: Window, ev: UIEvent){
          updateScrollProps()
        }
        window.addEventListener('resize',onResize)
        clearActions.push(()=>window.removeEventListener('resize',onResize))
      }
      return ()=>clearActions.forEach(it=>it())
    },
    [containerIsWindow, getContainer(), getContent(), updateScrollProps]
  )
  
  
  const setContainerScroll = useCallback(
    (scroll: ScrollToOptions) => {
      const container = getContainer()
      const view = containerIsWindow ? window : container
      view?.scrollTo(scroll)
    },
    [containerIsWindow, getContainer()]
  )
  
  
  // adds onScroll handler to container
  useEffect(
    ()=>{
      const container = getContainer()
      const view = containerIsWindow ? window : container
      if (view){
        view.addEventListener('scroll', updateScrollProps)
        return ()=>view.removeEventListener('scroll', updateScrollProps)
      }
    },
    [containerIsWindow, getContainer(), updateScrollProps]
  )
  
  
  
  return {
    scrollProps,
    setContainerScroll,
    canScrollHorizontally,
    canScrollVertically,
  } as const
}