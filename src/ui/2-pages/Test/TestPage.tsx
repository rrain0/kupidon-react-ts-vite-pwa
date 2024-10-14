import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import TopButtonBar from 'src/ui/components/BottomButtonBar/TopButtonBar.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import CheckboxInput from 'src/ui/0-elements/inputs/CheckboxInput/CheckboxInput.tsx'
import { CheckboxInputStyle } from 'src/ui/0-elements/inputs/CheckboxInput/CheckboxInputStyle.ts'
import PieProgress from 'src/ui/0-elements/PieProgress/PieProgress.tsx'
import { RangeU } from 'src/util/common/RangeU'
import { useBool } from 'src/util/react-state/useBool'
import { useInterval } from 'src/util/react/useInterval'
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import center = EmotionCommon.center




const TestPage = React.memo(
  () => {
    
    const [searchParams] = useSearchParams()
    
    
    const [progress, setProgress] = useState(0)
    useInterval(3000, () => setProgress(s => s === 0 ? 100 : 0))
    
    
    const [isChecked, , , toggleIsChecked] = useBool(false)
    
    const [onEventVal, , , toggleOnEventVal] = useBool(false)
    
    console.log('TestPage render')
    
    return (
      <>
        
        <Pages.SimplePage>
          <Pages.ContentFill>
            
            
            <div>Test Page</div>
            <Items>
              <Link to={RootRoute.test.scrollbar[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Scrollbar test</Button>
              </Link>
              <Link to={RootRoute.test.bottomSheet[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Bottom Sheet test</Button>
              </Link>
              <Link to={RootRoute.test.resizeObserver[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Resize Observer test</Button>
              </Link>
              <Link to={RootRoute.test.moveElementToAnotherView[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Move to another view</Button>
              </Link>
              <Link to={RootRoute.test.pointer[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Pointer test</Button>
              </Link>
              <Link to={RootRoute.test.tabs[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Tabs test</Button>
              </Link>
              <Link to={RootRoute.test.state[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>State test</Button>
              </Link>
              <Link to={RootRoute.test.pageLifecycle[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Page Lifecycle test</Button>
              </Link>
              <Link to={RootRoute.test.useEvent[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>useEvent test</Button>
              </Link>
              <Link to={RootRoute.test.elemRef[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Element Ref test</Button>
              </Link>
              <Link to={RootRoute.test.elemStyle[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Element Style test</Button>
              </Link>
              <Link to={RootRoute.test.oldProfileOptions[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Old Profile Options</Button>
              </Link>
              
              
              <Link to={RootRoute.test.emulatedScroll[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Emulated Scroll</Button>
              </Link>
              
              
              <Link to={RootRoute.test.viewsListItem1AddItem[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Views: List Item 1: Add Item</Button>
              </Link>
              <Link to={RootRoute.test.viewsListItem2[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Views: List Item 2</Button>
              </Link>
              <Link to={RootRoute.test.rippleTest[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Views: Ripple</Button>
              </Link>
              <Link to={RootRoute.test.sliderTest[fullAnySearchParams](searchParams)}>
                <Button css={ButtonS.filledRectBigNormal}>Views: Slider</Button>
              </Link>
            </Items>
            
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
                background: ${t.containerNormal.bg[0]};
              `}
            >
              <PieProgress
                css={css`
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
                background: ${t.containerNormal.bg[0]};
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
                background: ${t.containerNormal.bg2[0]};
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
                background: ${t.containerAccent.bg[0]};
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
                background: ${t.containerAccent.bg[0]};
                color: ${t.containerAccent.content[0]};
              `}
            >
              <CheckboxInput
                css={CheckboxInputStyle.roundNormalNormal}
                checked={isChecked}
                onChange={toggleIsChecked}
              />
            </div>
            
            
            <div
              css={t => css`
                width: 300px;
                height: 150px;
                position: relative;
                padding: 10px;
                border-radius: 16px;
                background: ${t.containerNormal.bg[0]};
                color: ${t.containerNormal.content[0]};
              `}
            >
              <div>onEvent Test</div>
              <button></button>
            </div>
          
          
          </Pages.ContentFill>
        </Pages.SimplePage>
        
        
        <TopButtonBar backBtn/>
        
        <BottomButtonBar settingsBtn/>
      
      
      </>
    )
  }
)
export default TestPage



const Items = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
  gap: 10px;
`

