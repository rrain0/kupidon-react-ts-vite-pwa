/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Pages } from 'src/components/Page/Pages'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import Tab from 'src/views/Tabs/Tab'
import Tabs from 'src/views/Tabs/Tabs'
import { TabIdx, TabsState } from 'src/views/Tabs/useTabs'
import SimplePage = Pages.SimplePage
import SimpleContent = Pages.SimpleContent






const TabsTestPage = ()=>{
  
  const [tabsState, setTabsState] = useState<TabsState>('opened')
  const [tabIdx, setTabIdx] = useState<TabIdx>(0)
  
  const tabFrameRef = useRef<HTMLDivElement>(null)
  
  const tabsProps = {
    tabsState, setTabsState,
    tabIdx, setTabIdx,
    tabFrameRef,
  }
  
  return <SimplePage>
    <SimpleContent>
      
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
            {ArrayUtils.ofIndices(100).map((it,i)=><div key={i}>Tab 1 ({i+1})</div>)}
          </Tab>
          
          <Tab css={css`
            background: bisque;
            max-height: 800px;
          `}
            width={computedTabsDimens.frameWidth}
          >
            {ArrayUtils.ofIndices(100).map((it,i)=><div key={i}>Tab 2 ({i+1})</div>)}
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
      
    
    </SimpleContent>
  </SimplePage>
}
export default TabsTestPage




