import { css } from '@emotion/react'
import { css as emcss } from '@emotion/css'
import numeral from 'numeral'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
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
import { RangeU } from 'src/util/common/RangeU'
import { useBool } from 'src/util/react-state/useBool'
import { useInterval } from 'src/util/react/useInterval'
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import flexC = EmotionCommon.flexC
import Txt = EmotionCommon.Txt
import col = EmotionCommon.col
import row = EmotionCommon.row



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

const emcssStyle = emcss`height: 100%;`
console.log('emcssStyle', emcssStyle)
//console.log('emcssStyle.name', emcssStyle.name)
//console.log('emcssStyle.next', emcssStyle.next)



const TestPage = React.memo(() => {
  
  /*
   const rf = (v: number) => {
   console.log('log from rf', v, typeof v)
   return +v
   }
   console.log('numeral(12.53).format(\'0.0\')', numeral(12.53).format('0.0', rf))
   console.log('numeral(12.55).format(\'0.0\')', numeral(12.55).format('0.0', rf))
   console.log('numeral(12.58).format(\'0.0\')', numeral(12.58).format('0.0', rf))
   
   console.log('numeral(-12.53).format(\'0.0\')', numeral(-12.53).format('0.0', rf))
   console.log('numeral(-12.55).format(\'0.0\')', numeral(-12.55).format('0.0', rf))
   console.log('numeral(-12.58).format(\'0.0\')', numeral(-12.58).format('0.0', rf))
   */
  
  const [searchParams] = useSearchParams()
  
  
  const [progress, setProgress] = useState(0)
  useInterval(3000, () => setProgress(s => s === 0 ? 100 : 0))
  
  
  const [isChecked, , , toggleIsChecked] = useBool(false)
  
  const [onEventVal, , , toggleOnEventVal] = useBool(false)
  
  //console.log('TestPage render')
  
  return (
    <>
      
      <Pages.SimplePage>
        <Pages.ContentFill>
          
          <div css={cssStyle}>A</div>
          <div className={`css-${cssStyle.name}`}>Test Page</div>
          
          <div>Views:</div>
          
          <Items>
            <Link to={RootRoute.test.scrollbar[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Scrollbar test
              </Button>
            </Link>
            <Link to={RootRoute.test.bottomSheet[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Bottom Sheet
              </Button>
            </Link>
            <Link to={RootRoute.test.viewsListItem2[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                List Item 2
              </Button>
            </Link>
            <Link to={RootRoute.test.rippleTest[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Ripple
              </Button>
            </Link>
            <Link to={RootRoute.test.buttonsTest[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Buttons
              </Button>
            </Link>
            <Link to={RootRoute.test.sliderTest[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Slider
              </Button>
            </Link>
          </Items>
          
          <div style={{ height: 20 }} />
          
          <div>Other:</div>
          
          <Items>
            <Link to={RootRoute.test.resizeObserver[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Resize Observer test
              </Button>
            </Link>
            <Link to={RootRoute.test.moveElementToAnotherView[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Move to another view
              </Button>
            </Link>
            <Link to={RootRoute.test.pointer[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Pointer test
              </Button>
            </Link>
            <Link to={RootRoute.test.tabs[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Tabs test
              </Button>
            </Link>
            <Link to={RootRoute.test.state[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                State test
              </Button>
            </Link>
            <Link to={RootRoute.test.pageLifecycle[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Page Lifecycle test
              </Button>
            </Link>
            <Link to={RootRoute.test.useEvent[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                useEvent test
              </Button>
            </Link>
            <Link to={RootRoute.test.elemRef[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Element Ref test
              </Button>
            </Link>
            <Link to={RootRoute.test.elemStyle[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Element Style test
              </Button>
            </Link>
            <Link to={RootRoute.test.oldProfileOptions[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Old Profile Options
              </Button>
            </Link>
            <Link to={RootRoute.test.shadowDOMTest[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Shadow DOM Test
              </Button>
            </Link>
          
          </Items>
          
          <div style={{ height: 20 }} />
          
          <Items>
            <Link to={RootRoute.test.emulatedScroll[fullAnySearchParams](searchParams)}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Emulated Scroll
              </Button>
            </Link>
          </Items>
          
          <div style={{ height: 20 }} />
          
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
            css={css`
              width: fit-content;
              height: fit-content;
              //background-color: #4d9f0c55;
              border: 3px solid #4d9f0c55;
              padding: 6px 10px;
              display: grid;
              place-items: center;
              border-radius: 999999px;
              ${Txt.md14};
            `}
          >
            Отлично совместимы
          </div>
          
          <div
            css={css`
              width: fit-content;
              height: fit-content;
              //background-color: #EFEE97;
              border: 3px solid #EFEE97;
              padding: 6px 10px;
              display: grid;
              place-items: center;
              border-radius: 999999px;
              ${Txt.md14};
            `}
          >
            Средне совместимы
          </div>
          
          <div
            css={css`
              ${row};
              gap: 12px;
            `}
          >
            <div
              css={css`
                width: fit-content;
                height: fit-content;
                background-color: #DFDFDF;
                padding: 6px 10px;
                display: grid;
                place-items: center;
                border-radius: 999999px;
                ${Txt.md14};
              `}
            >
              INTJ
            </div>
            <div
              css={css`
                width: fit-content;
                height: fit-content;
                background-color: #DFDFDF;
                padding: 6px 10px;
                display: grid;
                place-items: center;
                border-radius: 999999px;
                ${Txt.md14};
              `}
            >
              ENTP
            </div>
          </div>
          
          
          <div
            css={css`
              width: 300px;
              height: fit-content;
              //background-color: #EFEE97;
              border: 3px solid #EFEE97;
              padding: 6px 10px;
              gap: 6px;
              border-radius: 16px;
              ${Txt.md14};
              ${col};
            `}
          >
            <div>Средне совместимы</div>
            
            <div
              css={css`
                ${row};
                gap: 12px;
              `}
            >
              <div
                css={css`
                  width: fit-content;
                  height: fit-content;
                  //background-color: white;
                  background-color: #DFDFDF;
                  padding: 6px 10px;
                  display: grid;
                  place-items: center;
                  border-radius: 999999px;
                  ${Txt.md14};
                `}
              >
                INTJ
              </div>
              <div
                css={css`
                  width: fit-content;
                  height: fit-content;
                  //background-color: white;
                  background-color: #DFDFDF;
                  padding: 6px 10px;
                  display: grid;
                  place-items: center;
                  border-radius: 999999px;
                  ${Txt.md14};
                `}
              >
                ENTP
              </div>
            </div>
          </div>
          
          
          <div
            css={css`
              width: 300px;
              height: fit-content;
              //background-color: #EFEE97;
              //border: 3px solid #EFEE97;
              padding: 6px 10px;
              gap: 6px;
              border-radius: 16px;
              ${Txt.md14};
              ${col};
            `}
          >
            <div>Средне совместимы</div>
            
            <div
              css={css`
                ${row};
                gap: 12px;
              `}
            >
              <div
                css={css`
                  width: fit-content;
                  height: fit-content;
                  //background-color: white;
                  //background-color: #DFDFDF;
                  border: 3px solid #EFEE97;
                  padding: 6px 10px;
                  display: grid;
                  place-items: center;
                  border-radius: 999999px;
                  ${Txt.md14};
                `}
              >
                INTJ
              </div>
              <div
                css={css`
                  width: fit-content;
                  height: fit-content;
                  //background-color: white;
                  //background-color: #DFDFDF;
                  border: 3px solid #EFEE97;
                  padding: 6px 10px;
                  display: grid;
                  place-items: center;
                  border-radius: 999999px;
                  ${Txt.md14};
                `}
              >
                ENTP
              </div>
            </div>
          </div>
          
          
          
          
          <div
            css={t => css`
              width: 200px;
              height: 200px;
              ${flexC};
              border-radius: 16px;
              background: ${t.boxNormal.bg[0]};
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
              background: ${t.boxNormal.bg[0]};
              color: ${t.boxNormal.ct[0]};
            `}
          >
            Контент.<br />
            Theme.boxNormal
          </div>
          
          <div
            css={t => css`
              width: 300px;
              height: 150px;
              padding: 10px;
              border-radius: 16px;
              background: ${t.boxNormal.bg2[0]};
              color: ${t.boxNormal.ct[0]};
            `}
          >
            Контент.<br />
            Theme.boxNormal2
          </div>
          
          <div
            css={t => css`
              width: 300px;
              height: 150px;
              padding: 10px;
              border-radius: 16px;
              background: ${t.boxAccent.bg[0]};
              color: ${t.boxAccent.ct[0]};
            `}
          >
            Контент.<br />
            Theme.boxAccent
          </div>
          
          
          <div
            css={t => css`
              width: 300px;
              height: 150px;
              padding: 10px;
              border-radius: 16px;
              background: ${t.boxAccent.bg[0]};
              color: ${t.boxAccent.ct[0]};
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
              background: ${t.boxNormal.bg[0]};
              color: ${t.boxNormal.ct[0]};
            `}
          >
            <div>onEvent Test</div>
            <button />
          </div>
        
        
        </Pages.ContentFill>
      </Pages.SimplePage>
      
      
      <TopButtonBar backBtn />
      
      <BottomButtonBar settingsBtn />
    
    
    </>
  )
})
export default TestPage


const Items = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
  gap: 10px;
`

