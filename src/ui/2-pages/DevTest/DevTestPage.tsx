import { css } from '@emotion/react'
import { css as cssraw } from '@emotion/css'
import styled from '@emotion/styled'
import React, { useId, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import TopButtonBar from 'src/ui/components/BottomButtonBar/TopButtonBar.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import CheckboxInput from 'src/ui/0-elements/inputs/CheckboxInput/CheckboxInput.tsx'
import { CheckboxInputStyle } from 'src/ui/0-elements/inputs/CheckboxInput/CheckboxInputStyle.ts'
import PieProgress from 'src/ui/0-elements/PieProgress/PieProgress.tsx'
import { RangeU } from '@util/common/RangeU.ts'
import { useBool } from '@util/react-state/useBool.ts'
import { useInterval } from '@util/react/useInterval.ts'
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import flexC = EmotionCommon.flexC



/*
При создании стиля через css, имя его класса можно взять через:
`css-${cssStyle.name}`
Но чтобы стиль был отправлен браузеру, его надо дать элементу.
 */
const cssStyle = css`width: 100%`
//console.log('cssStyle', cssStyle)
console.log('cssStyle.name', cssStyle.name)
console.log('cssStyle.next', cssStyle.next)

const cssStyle2 = css`height: 100%; ${cssStyle}`
console.log('cssStyle2.name', cssStyle2.name)
console.log('cssStyle2.next', cssStyle2.next)

const emcssStyle = cssraw`height: 100%;`
console.log('emcssStyle', emcssStyle)
//console.log('emcssStyle.name', emcssStyle.name)
//console.log('emcssStyle.next', emcssStyle.next)



const DevTestPage = React.memo(() => {
  
  const [searchParams] = useSearchParams()
  
  
  const [isChecked, , , toggleIsChecked] = useBool(false)
  
  const [onEventVal, , , toggleOnEventVal] = useBool(false)
  
  
  //console.log('TestPage render')
  
  return (
    <>
      
      <Pages.Page>
        <Pages.Content>
          
          <div css={cssStyle}>A</div>
          <div className={`css-${cssStyle.name}`}>Test Page</div>
          
          
          <div>Views:</div>
          
          <Items>
            <Link to={RootRoute.devTest.buttons[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Buttons
              </Button>
            </Link>
            <Link to={RootRoute.devTest.ripple[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Ripple
              </Button>
            </Link>
            <Link to={RootRoute.devTest.scrollbar[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Scrollbar test
              </Button>
            </Link>
            <Link to={RootRoute.devTest.bottomSheet[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Bottom Sheet
              </Button>
            </Link>
            <Link to={RootRoute.devTest.viewsSelectItem[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Select Item
              </Button>
            </Link>
            <Link to={RootRoute.devTest.slider[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Slider
              </Button>
            </Link>
            <Link to={RootRoute.devTest.image[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Image
              </Button>
            </Link>
          </Items>
          
          <div style={{ height: 20 }}/>
          
          <div>Other:</div>
          
          <Items>
            <Link to={RootRoute.devTest.resizeObserver[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Resize Observer test
              </Button>
            </Link>
            <Link to={RootRoute.devTest.moveElementToAnotherView[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Move to another view
              </Button>
            </Link>
            <Link to={RootRoute.devTest.pointer[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Pointer test
              </Button>
            </Link>
            <Link to={RootRoute.devTest.state[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                State test
              </Button>
            </Link>
            <Link to={RootRoute.devTest.pageLifecycle[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Page Lifecycle test
              </Button>
            </Link>
            <Link to={RootRoute.devTest.useEvent[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                useEvent test
              </Button>
            </Link>
            <Link to={RootRoute.devTest.elemRef[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Element Ref test
              </Button>
            </Link>
            <Link to={RootRoute.devTest.elemStyle[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Element Style test
              </Button>
            </Link>
            <Link to={RootRoute.devTest.oldProfileOptions[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Old Profile Options
              </Button>
            </Link>
            <Link to={RootRoute.devTest.shadowDOMTest[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Shadow DOM Test
              </Button>
            </Link>
          
          </Items>
          
          <div style={{ height: 20 }}/>
          
          <Items>
            <Link to={RootRoute.devTest.emulatedScroll[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Emulated Scroll
              </Button>
            </Link>
          </Items>
          
          <div style={{ height: 20 }}/>
          
          {/* <button
           onClick={() => toast(<ToastBody type={'danger'}>TOASttt</ToastBody>)}
           >
           toast
           </button> */}
          
          
          {/*<div
           css={css`
           min-height: 2000px;
           height: 2000px;
           `}
           />*/}
          
          
          <PieProgressView/>
          
          
          <div
            css={t => css`
              width: 300px;
              height: 150px;
              padding: 10px;
              border-radius: 16px;
              background: ${t.boxDefault.bg};
              color: ${t.boxDefault.ct};
            `}
          >
            Контент.<br/>
            Theme.boxDefault
          </div>
          
          <div
            css={t => css`
              width: 300px;
              height: 150px;
              padding: 10px;
              border-radius: 16px;
              background: ${t.boxDefault.bg2};
              color: ${t.boxDefault.ct};
            `}
          >
            Контент.<br/>
            Theme.boxNormal2
          </div>
          
          <div
            css={t => css`
              width: 300px;
              height: 150px;
              padding: 10px;
              border-radius: 16px;
              background: ${t.boxAccent4.bg};
              color: ${t.boxAccent4.ct};
            `}
          >
            Контент.<br/>
            Theme.boxAccent4
          </div>
          
          
          <div
            css={t => css`
              width: 300px;
              height: 150px;
              padding: 10px;
              border-radius: 16px;
              background: ${t.boxAccent4.bg};
              color: ${t.boxAccent4.ct};
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
              background: ${t.boxDefault.bg};
              color: ${t.boxDefault.ct};
            `}
          >
            <div>onEvent Test</div>
            <button
              css={css`
                width: 100px;
                height: 50px;
              `}
            >
              Button
            </button>
          </div>
        
        
        </Pages.Content>
      </Pages.Page>
      
      
      <TopButtonBar backBtn/>
      
      <BottomButtonBar settingsBtn/>
    
    
    </>
  )
})
export default DevTestPage


const Items = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
  gap: 10px;
`




const PieProgressView = React.memo(() => {
  
  const [progress, setProgress] = useState(0)
  useInterval(3000, () => setProgress(s => s === 0 ? 100 : 0))
  
  return (
    <div
      css={t => css`
        width: 200px;
        height: 200px;
        ${flexC};
        border-radius: 16px;
        background: ${t.boxDefault.bg};
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
  )
})

