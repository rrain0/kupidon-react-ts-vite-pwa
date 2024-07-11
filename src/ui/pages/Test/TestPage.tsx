import { css } from '@emotion/react'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import TopButtonBar from 'src/ui/components/BottomButtonBar/TopButtonBar.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Button from 'src/ui/elements/buttons/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/Button/ButtonStyle.ts'
import CheckboxInput from 'src/ui/elements/inputs/CheckboxInput/CheckboxInput.tsx'
import { CheckboxInputStyle } from 'src/ui/elements/inputs/CheckboxInput/CheckboxInputStyle.ts'
import PieProgress from 'src/ui/elements/PieProgress/PieProgress.tsx'
import Ripple from 'src/ui/elements/Ripple/Ripple.tsx'
import { RangeU } from 'src/util/common/RangeU'
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import center = EmotionCommon.center



const TestPage =
React.memo(
() => {
  
  const [searchParams] = useSearchParams()
  
  
  
  const [progress, setProgress] = useState(0)
  useEffect(
    () => {
      const id = setInterval(
        () => setProgress(s => s === 0 ? 100 : 0),
        3000
      )
      return () => clearInterval(id)
    },
    []
  )
  
  
  
  
  return <>
      
    <Pages.SimplePage>
      <Pages.ContentFill>
        
        
        <div>Test Page</div>
        
        <Link to={RootRoute.test.scrollbar[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigNormal}>Scrollbar test</Button>
        </Link>
        <Link to={RootRoute.test.bottomSheet[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigNormal}>Bottom Sheet test</Button>
        </Link>
        <Link to={RootRoute.test.resizeObserver[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigNormal}>Resize Observer test</Button>
        </Link>
        <Link to={RootRoute.test.moveElementToAnotherView[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigNormal}>Move to another view</Button>
        </Link>
        <Link to={RootRoute.test.pointer[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigNormal}>Pointer test</Button>
        </Link>
        <Link to={RootRoute.test.tabs[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigNormal}>Tabs test</Button>
        </Link>
        <Link to={RootRoute.test.pageLifecycle[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigNormal}>Page Lifecycle test</Button>
        </Link>
        
        <Link to={RootRoute.test.viewsListItem1AddItem[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigNormal}>Views: List Item 1: Add Item</Button>
        </Link>
        
        <Link to={RootRoute.test.viewsListItem2[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigNormal}>Views: List Item 2</Button>
        </Link>
        
        
        {/* <button
         onClick={()=>toast(<ToastBody type={'danger'}>TOASttt</ToastBody>)}
         >
         toast
         </button> */}
        
        
        {/*<div
         css={css`
         min-height: 2000px;
         height: 2000px;
         `}
         />*/}
        
        
        <div
          css={t => css`
            width: 200px;
            height: 200px;
            ${center};
            border-radius: 16px;
            background: ${t.containerNormal.bgc[0]};
          `}
        >
          <PieProgress css={css`
            height: 30%;
            aspect-ratio: 1;
          `}
            progress={RangeU.map(progress, [0, 100], [5, 95])}
          />
        </div>
        
        
        <div
          css={t => css`
            width: 300px;
            height: 150px;
            padding: 10px;
            border-radius: 16px;
            background: ${t.containerNormal.bgc[0]};
            color: ${t.containerNormal.content[0]};
          `}
        >
          Контент.<br/>
          Theme.containerNormal
        </div>
        
        <div
          css={t => css`
            width: 300px;
            height: 150px;
            padding: 10px;
            border-radius: 16px;
            background: ${t.containerNormal.bgc2[0]};
            color: ${t.containerNormal.content[0]};
          `}
        >
          Контент.<br/>
          Theme.containerNormal2
        </div>
        
        <div
          css={t => css`
            width: 300px;
            height: 150px;
            padding: 10px;
            border-radius: 16px;
            background: ${t.containerAccent.bgc[0]};
            color: ${t.containerAccent.content[0]};
          `}
        >
          Контент.<br/>
          Theme.containerAccent
        </div>
        
        
        <div
          css={t => css`
            width: 300px;
            height: 150px;
            padding: 10px;
            border-radius: 16px;
            background: ${t.containerAccent.bgc[0]};
            color: ${t.containerAccent.content[0]};
          `}
        >
          <CheckboxInput css={CheckboxInputStyle.roundNormalNormal}/>
        </div>
        
        
        <div
          css={t => css`
            width: 300px;
            height: 150px;
            position: relative;
            padding: 10px;
            border-radius: 16px;
            background: ${t.containerNormal.bgc[0]};
            color: ${t.containerNormal.content[0]};
          `}
        >
          <div>Ripple Test</div>
          <Ripple rippleColor='black'/>
        </div>
      
      
      </Pages.ContentFill>
    </Pages.SimplePage>
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar settingsBtn/>
  
  
  </>
})
export default TestPage



