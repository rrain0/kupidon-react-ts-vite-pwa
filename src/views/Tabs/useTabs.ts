import { useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types'
import React, {
  useCallback,
  useEffect,
  useMemo, useRef,
  useState,
} from 'react'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { ElemProps } from 'src/utils/common/ElemProps'
import { MathUtils } from 'src/utils/common/NumberUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import { useNoSelect } from 'src/utils/react/useNoSelect'
import PartialUndef = TypeUtils.PartialUndef
import { useStateAndRef } from 'src/utils/react/useStateAndRef'
import Setter = TypeUtils.Setter
import fitRange2 = MathUtils.fitRange
import Callback = TypeUtils.Callback
import findLastBy = ArrayUtils.findLastBy
import notExists = TypeUtils.notExists
import last = ArrayUtils.last





export const DefaultTabIdx = 0


// % ширины viewport в секунду
const speedThreshold = 35
const defaultAutoAnimationDuration = 400
// 'cubic-bezier(0.17,0.84,0.44,1)'
//import BezierEasing from 'bezier-easing'
//const animationEasing = BezierEasing(0.17,0.84,0.44,1)



const dragStartInitialValue = {
  scrollLeft: 0,
  canStart: true,
  isDragging: false,
  lastSpeed: null as number|null,
}


export type TabsStableState =
  |'opened' // showing some tab
export type TabsIntermediateState =
  |'snap' // request to snap to instantly (to tab index)
  
  |'snapping' // request to snap animated / playing snapping animation
  
  |'dragging' // user is dragging tabs
  |'adjusting' // set state & snap according current scrollLeft coordinate
export type TabsState = TabsStableState | TabsIntermediateState


export type TabIdx = number


export type ComputedTabsDimens = {
  frameWidth: number,
}


export type UseTabsOptions = {
  tabsState: TabsState
  setTabsState: Setter<TabsState>
  tabIdx: TabIdx
  setTabIdx: Setter<TabIdx>
} & PartialUndef<{
  animationDuration: number
  defaultOpenIdx: number
}>



export const useTabs = (
  tabsFrameRef: React.RefObject<HTMLElement>,
  options: UseTabsOptions,
) => {
  const getTabsFrame = ()=>tabsFrameRef.current
  const getTabsContainer = ()=>getTabsFrame()?.firstElementChild?.firstElementChild
  
  
  const [isReady, setReady] = useState(false)
  
  const [computedTabsDimens, setComputedTabsDimens, computedTabsDimensRef] =
    useStateAndRef<ComputedTabsDimens>({
      frameWidth: 0
    })
  
  
  const updateComputedTabsDimens = useCallback(
    ()=>{
      const tabsFrame = getTabsFrame()
      if (tabsFrame){
        const frameD = new ElemProps(tabsFrame)
        setComputedTabsDimens({
          frameWidth: frameD.width,
        })
      }
    },
    [getTabsFrame()]
  )
  
  
  useEffect(
    ()=>{
      const tabsFrame = getTabsFrame()
      updateComputedTabsDimens()
      if (tabsFrame){
        const resizeObserver = new ResizeObserver(()=>updateComputedTabsDimens())
        resizeObserver.observe(tabsFrame)
        return ()=>resizeObserver.disconnect()
      }
    },
    [getTabsFrame()]
  )
  
  
  
  const [tabsCnt, setTabsCnt] = useState(0) // 0..+inf
  useEffect(
    ()=>{
      const tabsContainer = getTabsContainer()
      if (tabsContainer){
        setTabsCnt(tabsContainer.childElementCount)
        const callback: MutationCallback = (mutationList)=>{
          const hasChildrenMutation = mutationList.some(mutation=>mutation.type==='childList')
          if (hasChildrenMutation) setTabsCnt(tabsContainer.childElementCount)
        }
        const observer = new MutationObserver(callback)
        observer.observe(tabsContainer, { childList: true })
        return ()=>observer.disconnect()
      }
    },
    [getTabsContainer()]
  )
  //console.log('tabsCnt',tabsCnt)
  
  
  const [
    snapPointsPx, // non-zero len
    realDefaultOpenIdx, // 0..+inf
    lastTabIdx, // 0..+inf
    maxScrollLeft, // 0..+inf
  ] =
  useMemo<[
    number[],
    number,
    number,
    number,
  ]>(
    ()=>{
      const lastTabIdx = Math.max(0,tabsCnt-1)
      
      const snapPointsPx = ArrayUtils.ofIndices(Math.max(tabsCnt,1))
        .map(tab=>tab*computedTabsDimens.frameWidth)
        
      const realDefaultOpenIdx = function(){
        if (notExists(options.defaultOpenIdx)) return DefaultTabIdx
        return fitRange2(
          options.defaultOpenIdx,[0,lastTabIdx]
        )
      }()
      
      const maxScrollLeft = last(snapPointsPx)
      
      return [snapPointsPx, realDefaultOpenIdx, lastTabIdx, maxScrollLeft] as const
    },
    [tabsCnt, options.defaultOpenIdx, computedTabsDimens.frameWidth]
  )
  
  
  const [prevState, setPrevState] = useState<TabsState>('opened')
  const [prevTabIdx, setPrevTabIdx] = useState<TabIdx>(0)
  const [prevSnapPointsPx, setPrevSnapPointsPx] = useState([0])
  
  const newState = options.tabsState
  const setNewState = options.setTabsState
  const newTabIdx = options.tabIdx
  const setNewTabIdx = options.setTabIdx
  
  const animationDuration = options.animationDuration ?? defaultAutoAnimationDuration
  
  
  const dragStartRef = useRef({...dragStartInitialValue})
  const [tabContainerSpring, tabContainerSpringApi] = useSpring(()=>({ scrollLeft: 0 }))
  
  
  
  
  const runAnimation = useCallback(
    (endScrollLeft: number, lastSpeed: number|null, onFinish: Callback)=>{
      const duration = function(){
        //console.log('lastSpeed',lastSpeed)
        if (notExists(lastSpeed)) return animationDuration
        const startScrollLeft = tabContainerSpring.scrollLeft.get()
        const pathPercent = pathProgressPercent(startScrollLeft, endScrollLeft)
        return pathPercent/lastSpeed*1.2*1000
      }()
      ;(async()=>{
        const animation = await tabContainerSpring.scrollLeft.start(
          endScrollLeft,
          {
            /* config: {
              duration: duration,
              easing: animationEasing,
            }, */
            config: {
              mass: 1 * duration / 100,
              tension: 500,
              friction: 24,
              clamp: true,
            },
          }
        )
        //console.log('animation',animation)
        if (animation.finished) onFinish()
      })()
    },
    [animationDuration]
  )
  
  
  
  const reactOnState = useEffectEvent(
    ()=>{
      const currState = prevState
      const currTab = prevTabIdx
      const currScrollLeft = tabContainerSpring.scrollLeft.get()
      
      //console.log({ newState, prevState, toTab, prevTabIdx })
      
      // prevent unnecessary state changes
      if (newState===currState
        && newTabIdx===currTab
        && snapPointsPx===prevSnapPointsPx
      ) return
      
      
      const toTab = function(){
        if (newState==='adjusting')
          return getTabIdxToAdjust(currScrollLeft, snapPointsPx)
        return fitRange2(newTabIdx, [0,lastTabIdx])
      }()
      
      const toScrollLeft = snapPointsPx[toTab]
      
      
      
      
      
      const toDragging = newState==='dragging'
      const toAnimated =
        (['snapping','adjusting'] as TabsState[]).includes(newState)
      const lastSpeed = function(){
        if (currState!=='dragging') return null
        return dragStartRef.current.lastSpeed
      }()
      
      
      
      
      const setStateAndIndex = (s: TabsState, index: TabIdx)=>{
        if (s!=='dragging') {
          dragStartRef.current.canStart = false
          dragStartRef.current.isDragging = false
        }
        if (isReady){
          setNewState(s)
          setNewTabIdx(index)
        }
        setPrevState(s)
        setPrevTabIdx(index)
        setPrevSnapPointsPx(prevSnapPointsPx)
        //console.log('setStateAndIndex:',s,index)
      }
      
      
      //console.log('i',i)
      //console.log({ canClose })
      //console.log({ isOpened, isClosed, toOpened, toClosed })
      
      
      if (toDragging){
        setStateAndIndex('dragging', currTab)
        return
      }
      else if (!toAnimated){
        tabContainerSpring.scrollLeft.set(toScrollLeft)
        setStateAndIndex('opened', toTab)
        return
      }
      else {
        setStateAndIndex('snapping', toTab)
        runAnimation(toScrollLeft, lastSpeed, ()=>{
          setStateAndIndex('opened', toTab)
        })
        return
      }
    }
  )
  useEffect(
    ()=>reactOnState(),
    [newState, newTabIdx, isReady, snapPointsPx]
  )
  
  
  
  
  
  // You MUST use css 'touch-action: none;' before start dragging
  // to prevent browser gesture handling
  // noinspection JSVoidFunctionReturnValueUsed
  const tabDrag = useDrag(
    gesture=>{
      const {
        first, active, last,
        movement: [mx,my],
        velocity: [spdx,spdy], // px/ms (nonnegative)
        direction: [dirx,diry], // positive for y is from top to bottom
        xy: [vpx,vpy], // viewport scrollLeft, viewport y
      } = gesture
      
      /* console.log(
        'mx:', mx,
        'my:', my,
      ) */
      
      if (first) {
        dragStartRef.current = {...dragStartInitialValue}
        dragStartRef.current.scrollLeft = tabContainerSpring.scrollLeft.get()
      }
      
      // drag threshold, px
      const isMoreRadius = Math.hypot(mx,my) >= 5
      const isToSideways = Math.abs(mx) > Math.abs(my)
      
      const isCanDrag = isMoreRadius && isToSideways
      const isCannotStart = isMoreRadius && !isToSideways
      
      /* console.log({
        isMoreRadius, isToSideways,
        isCanDrag, isCannotStart
      }) */
      
      if (!dragStartRef.current.isDragging){
        if (isCannotStart) dragStartRef.current.canStart = false
      }
      if (dragStartRef.current.canStart){
        if (isCanDrag){
          setNewState('dragging')
          dragStartRef.current.canStart = false
          dragStartRef.current.isDragging = true
        }
      }
      
      const newScrollLeft = fitRange2(
        dragStartRef.current.scrollLeft - mx,
        [0, maxScrollLeft]
      )
      
      if (active && dragStartRef.current.isDragging) {
        tabContainerSpring.scrollLeft.set(newScrollLeft)
      }
      if (last && dragStartRef.current.isDragging){
        // % ширины viewport в секунду
        const speed = pxPerMsToPercentVpHPerS(spdx)
        if (speed>speedThreshold){
          dragStartRef.current.lastSpeed = speed
          if (dirx<0){
            setNewState('snapping')
            setNewTabIdx(Math.min(prevTabIdx+1, lastTabIdx))
          } else {
            setNewState('snapping')
            setNewTabIdx(Math.max(prevTabIdx-1, 0))
          }
        } else {
          setNewState('adjusting')
        }
      }
      
    }
  ) as ()=>ReactDOMAttributes
  
  
  
  
  // forbid content selection for all elements while dragging
  useNoSelect(prevState==='dragging')
  
  
  useEffect(
    ()=>{
      const tabsContainer = getTabsContainer()
      if (tabsContainer) setReady(true)
      else setReady(false)
    },
    [getTabsContainer()]
  )
  
  
  return {
    isReady,
    computedTabsDimens,
    snapPointsPx,
    realDefaultOpenIdx,
    tabContainerSpring,
    tabDrag,
  } as const
}









// px/ms => (percent of viewport height)/s
function pxPerMsToPercentVpHPerS(pxPerMs: number): number {
  return pxPerMs*1000 / window.innerWidth * 100
}
function pathProgressPercent(start: number, end: number): number {
  return Math.abs(end-start)/window.innerWidth*100
}







function getTabIdxToAdjust
(scrollLeft: number, snapPointsPx: number[]): number {
  const snapStart = findLastBy(snapPointsPx, elem=>scrollLeft>=elem).index
  
  const snapPointsPxInf = [Number.NEGATIVE_INFINITY, ...snapPointsPx, Number.POSITIVE_INFINITY]
  const threshold = Math.round(
    (snapPointsPxInf[snapStart+1] + snapPointsPxInf[snapStart+2]) / 2
  )
  if (scrollLeft>threshold) return snapStart+1
  return snapStart
}


