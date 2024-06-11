import { css } from '@emotion/react'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import TopButtonBar from 'src/ui/components/BottomButtonBar/TopButtonBar.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import { MathUtils } from '@util/common/MathUtils.ts'
import { RouteBuilder } from '@util/mini-libs/route-builder/RouteBuilder.tsx'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import PieProgress from 'src/ui/elements/PieProgress/PieProgress.tsx'
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import center = EmotionCommon.center
import mapRange = MathUtils.mapRange





const TestPage =
React.memo(
()=>{
  const [searchParams] = useSearchParams()
  
  
  useLayoutEffect(
    ()=>{
      const onLoad = (ev: Event)=>{
        console.log('page was loaded', ev)
        // @ts-ignore
        console.log('document.wasDiscarded',document.wasDiscarded)
      }
      const onFreeze = (ev: any)=>{
        console.log('page was frozen',ev)
      }
      const onResume = (ev: any)=>{
        console.log('page was resumed',ev)
      }
      const onVisibility = (ev: Event)=>{
        switch (document.visibilityState){
          case 'visible':
            console.log('page is visible',ev)
            break
          case 'hidden':
            console.log('page was hidden',ev)
            /* fetch('https://dev.kupidon.rrain.ydns.eu:50040/ktor/hello',{
              method: 'GET', mode: 'cors', cache: 'no-cache', credentials: 'same-origin',
            })
              .then(resp=>resp.text())
              .then(text=>console.log('response',text)) */
            break
        }
      }
      document.addEventListener('load',onLoad)
      document.addEventListener('visibilitychange',onVisibility)
      document.addEventListener('freeze',onFreeze)
      document.addEventListener('resume',onResume)
      return ()=>{
        document.addEventListener('load',onLoad)
        document.removeEventListener('freeze',onFreeze)
        document.removeEventListener('resume',onResume)
        document.addEventListener('visibilitychange',onVisibility)
      }
    },
    []
  )
  
  
  
  const [progress, setProgress] = useState(0)
  useEffect(
    ()=>{
      const id = setInterval(
        ()=>setProgress(s=>s===0 ? 100 : 0),
        3000
      )
      return ()=>clearInterval(id)
    },
    []
  )
  
  
  
  
  return <>
      
    <Pages.SimplePage>
      <Pages.ContentFill>
    
      
        <div>Test Page</div>
        
        <Link to={RootRoute.test.scrollbar[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigMain}>Scrollbar test</Button>
        </Link>
        <Link to={RootRoute.test.bottomSheet[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigMain}>Bottom Sheet test</Button>
        </Link>
        <Link to={RootRoute.test.resizeObserver[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigMain}>Resize Observer test</Button>
        </Link>
        <Link to={RootRoute.test.moveElementToAnotherView[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigMain}>Move to another view</Button>
        </Link>
        <Link to={RootRoute.test.pointer[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigMain}>Pointer test</Button>
        </Link>
        <Link to={RootRoute.test.tabs[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.filledRectBigMain}>Tabs test</Button>
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
          css={t=>css`
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
            progress={mapRange(progress, [0,100],[5,95])}
          />
        </div>
        
        
        <div
          css={t=>css`
            width: 300px;
            height: 150px;
            padding: 10px;
            border-radius: 16px;
            background: ${t.containerNormal.bgc[0]};
            color:      ${t.containerNormal.content[0]};
          `}
        >
          Контент.<br/>
          Theme.containerNormal
        </div>
        
        <div
          css={t=>css`
            width: 300px;
            height: 150px;
            padding: 10px;
            border-radius: 16px;
            background: ${t.containerNormal.bgc2[0]};
            color:      ${t.containerNormal.content[0]};
          `}
        >
          Контент.<br/>
          Theme.containerNormal2
        </div>
        
        <div
          css={t=>css`
            width: 300px;
            height: 150px;
            padding: 10px;
            border-radius: 16px;
            background: ${t.containerAccent.bgc[0]};
            color:      ${t.containerAccent.content[0]};
          `}
        >
          Контент.<br/>
          Theme.containerAccent
        </div>
        
        
        
        
        
      
      
      </Pages.ContentFill>
    </Pages.SimplePage>
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar settingsBtn/>
    
    
  </>
})
export default TestPage




