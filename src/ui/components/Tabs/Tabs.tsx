import { animated } from '@react-spring/web'
import React, { useImperativeHandle, useLayoutEffect, useRef } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useLockAppGestures } from '@util/app/useLockAppGestures.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { TabIdx, TabsState, useTabs } from 'src/ui/components/Tabs/useTabs.ts'
import { useElemRef } from 'src/util/react-state/useElemRef'
import Setter = TypeU.Setter
import row = EmotionCommon.row
import contents = EmotionCommon.contents
import Puro = TypeU.Puro




export type TabsRenderProps = ReturnType<typeof useTabs>
export type TabsRefsProps = {
  tabFrameRef: React.RefObject<HTMLDivElement>
}
export type TabsCustomProps = {
  tabsState: TabsState
  setTabsState: Setter<TabsState>
  tabIdx: TabIdx
  setTabIdx: Setter<TabIdx>
} & Puro<{
  children: (tabsProps: TabsRenderProps)=>React.ReactNode
}>
export type TabsForwardRefProps = Omit<React.JSX.IntrinsicElements['div'], 'children'>
export type TabsRefElement = HTMLDivElement
export type TabsProps = TabsRefsProps & TabsCustomProps & TabsForwardRefProps



const Tabs =
React.memo(
React.forwardRef<TabsRefElement, TabsProps>(
(props, forwardedRef) => {
  const {
    tabsState,
    setTabsState,
    tabIdx,
    setTabIdx,
    
    children,
    
    ...restProps
  } = props
  
  const [tabFrameRef] = useElemRef()
  useImperativeHandle(forwardedRef, () => tabFrameRef.current!, [])
  
  const isGesturesBusy = useLockAppGestures(tabsState === 'dragging')
  useLayoutEffect(() => { 
    if (isGesturesBusy) setTabsState('snap')
  }, [isGesturesBusy, tabsState])
  
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
  
  
  
  return <TabsFrame style={{
    opacity: !isReady ? 0 : undefined,
  }}
    {...restProps}
    ref={tabFrameRef}
  >
    <GesturesConsumer {...tabDrag()}>
      <TabsContainer
        // @ts-expect-error
        style={{ left: tabContainerSpring.scrollLeft.to(v => -v) }}
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

