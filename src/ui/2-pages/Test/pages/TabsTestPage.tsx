import React, { useRef, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import Tab from 'src/ui/components/Tabs/Tab.tsx'
import Tabs from 'src/ui/components/Tabs/Tabs.tsx'
import { TabIdx, TabsState } from 'src/ui/components/Tabs/useTabs.ts'






const TabsTestPage = ()=>{
  
  const [tabsState, setTabsState] = useState<TabsState>('opened')
  const [tabIdx, setTabIdx] = useState<TabIdx>(0)
  
  const tabFrameRef = useRef<HTMLDivElement>(null)
  
  const tabsProps = {
    tabsState, setTabsState,
    tabIdx, setTabIdx,
    tabFrameRef,
  }
  
  return <Pages.SimplePage>
    <Pages.ContentFill>
      
      <div>Tabs Test</div>
      
      <div css={css`
        color: black;
      `}>
        
        
        <Tabs css={css`
          width: 100%;
          max-width: 400px;
          min-height: 800px;
          height: fit-content;
          background: darkseagreen;
        `}
          {...tabsProps}
        >{({ tabContainerSpring, computedTabsDimens })=><>
          <Tab css={css`
            background: #8B8B8B;
            max-height: 800px;
          `}
            width={computedTabsDimens.frameWidth}
          >
            {ArrayU.arrOfIndices(100).map((it, i)=><div key={i}>Tab 1 ({i+1})</div>)}
          </Tab>
          
          <Tab css={css`
            background: bisque;
            max-height: 800px;
          `}
            width={computedTabsDimens.frameWidth}
          >
            {ArrayU.arrOfIndices(100).map((it, i)=><div key={i}>Tab 2 ({i+1})</div>)}
          </Tab>
          
          <Tab css={css`
            background: #5ac8fa;
            max-height: 800px;
          `}
            width={computedTabsDimens.frameWidth}
          >
            <div>Tab 3</div>
          </Tab>
          
          <Tab css={css`
            background: darksalmon;
            max-height: 800px;
          `}
            width={computedTabsDimens.frameWidth}
          >
            <div>Tab 4</div>
          </Tab>
        </>}</Tabs>
        
        
      </div>
      
    
    </Pages.ContentFill>
  </Pages.SimplePage>
}
export default TabsTestPage




