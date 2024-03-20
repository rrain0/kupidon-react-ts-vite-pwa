/** @jsxImportSource @emotion/react */
import { animated } from '@react-spring/web'
import React, { useImperativeHandle, useLayoutEffect, useRef } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useFakePointerRef } from 'src/components/ActionProviders/UseFakePointerRef'
import { useLockAppGestures } from 'src/utils/app/useLockAppGestures'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { TabIdx, TabsState, useTabs } from 'src/views/Tabs/useTabs'
import PartialUndef = TypeUtils.PartialUndef
import Setter = TypeUtils.Setter
import row = EmotionCommon.row
import contents = EmotionCommon.contents




export type TabsRenderProps = ReturnType<typeof useTabs>
export type TabsRefsProps = {
  tabFrameRef: React.RefObject<HTMLDivElement>
}
export type TabsCustomProps = {
  tabsState: TabsState
  setTabsState: Setter<TabsState>
  tabIdx: TabIdx
  setTabIdx: Setter<TabIdx>
} & PartialUndef<{
  children: (tabsProps: TabsRenderProps)=>React.ReactNode
}>
export type TabsForwardRefProps = Omit<JSX.IntrinsicElements['div'], 'children'>
export type TabsRefElement = HTMLDivElement
export type TabsProps = TabsRefsProps & TabsCustomProps & TabsForwardRefProps



const Tabs =
React.memo(
React.forwardRef<TabsRefElement, TabsProps>(
(props, forwardedRef)=>{
  const {
    tabsState,
    setTabsState,
    tabIdx,
    setTabIdx,
    
    children,
    
    ...restProps
  } = props
  
  const tabFrameRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(forwardedRef, ()=>tabFrameRef.current!,[])
  
  const isGesturesBusy = useLockAppGestures(tabsState==='dragging')
  useLayoutEffect(
    ()=>{ if (isGesturesBusy) setTabsState('snap')},
    [isGesturesBusy, tabsState]
  )
  
  const {
    isReady,
    computedTabsDimens,
    snapPointsPx,
    realDefaultOpenIdx,
    tabContainerSpring,
    tabDrag,
  } = useTabs(tabFrameRef, {
    tabsState,
    setTabsState,
    tabIdx,
    setTabIdx,
  })
  
  
  useFakePointerRef(tabFrameRef)
  
  
  
  return <TabsFrame css={css`
    ${ !isReady && css`opacity: 0` }
  `}
    {...restProps}
    ref={tabFrameRef}
  >
    <GesturesConsumer {...tabDrag()}>
      <TabsContainer
        style={{ left: tabContainerSpring.scrollLeft.to(v=>-v) }}
      >
        
        { children?.({
          isReady,
          computedTabsDimens,
          snapPointsPx,
          realDefaultOpenIdx,
          tabContainerSpring,
          tabDrag,
        }) }
      
      </TabsContainer>
    </GesturesConsumer>
  </TabsFrame>
}))
export default Tabs






const TabsFrame = styled.article`
  //container: tabs-frame / inline-size;
  width: 100%;
  height: 100%;
  
  ${row};
  align-items: stretch;
  overflow-x: hidden;
`
const GesturesConsumer = styled.div`
  ${contents};
  touch-action: pan-y;
`
const TabsContainer = styled(animated.div)`
  position: relative;
  min-width: fit-content;
  width: fit-content;
  ${row};
  align-items: stretch;
  overflow: hidden;

  //translate: -100cqw 0;
`

