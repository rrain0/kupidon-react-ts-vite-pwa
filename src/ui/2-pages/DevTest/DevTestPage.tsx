import { css } from '@emotion/react'
import { css as cssraw } from '@emotion/css'
import React, { useState } from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Grid from 'src/ui/0-elements/basic-elements/Grid.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import AppLink from 'src/ui/components/app-router/AppLink.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import TopFloatingBar from 'src/ui/components/screen-bars/TopFloatingBar.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import CheckboxInput from 'src/ui/0-elements/inputs/CheckboxInput/CheckboxInput.tsx'
import { CheckboxInputStyle } from 'src/ui/0-elements/inputs/CheckboxInput/CheckboxInputStyle.ts'
import PieProgress, { PieProgressCssProps } from 'src/ui/0-elements/PieProgress/PieProgress.tsx'
import { RangeU } from '@util/common/RangeU.ts'
import { useBool } from '@util/react-state/useBool.ts'
import { useInterval } from '@util/react/useInterval.ts'
import RootRoute = AppRoutes.RootRoute



/*
При создании стиля через css, имя его класса можно взять через:
`css-${cssStyle.name}`
Но чтобы стиль был отправлен браузеру, его надо дать элементу.
 */
const cssStyle = css({ width: '100%' })
//console.log('cssStyle', cssStyle)
console.log('cssStyle.name', cssStyle.name)
console.log('cssStyle.next', cssStyle.next)

const cssStyle2 = css([cssStyle, { height: '100%' }])
console.log('cssStyle2.name', cssStyle2.name)
console.log('cssStyle2.next', cssStyle2.next)

const emcssStyle = cssraw({ height: '100%' })
console.log('emcssStyle', emcssStyle)
//console.log('emcssStyle.name', emcssStyle.name)
//console.log('emcssStyle.next', emcssStyle.next)



const DevTestPage = React.memo(() => {
  
  
  const [isChecked, , , toggleIsChecked] = useBool(false)
  
  const [onEventVal, , , toggleOnEventVal] = useBool(false)
  
  
  //console.log('TestPage render')
  
  return (
    <>
      
      <Pages.Page>
        <Pages.Content>
          
          
          
          <div css={cssStyle}>A</div>
          <div className={`css-${cssStyle.name}`}>Test Page</div>
          
          
          
          <Gap h={30}/>
          
          <div>Views:</div>
          
          <Grid w='full' cols='repeat(auto-fit, minmax(200px, 400px))' g={10}>
            <AppLink toFull={RootRoute.devTest.buttons}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Buttons
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.ripple}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Ripple
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.scrollbar}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Scrollbar test
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.bottomSheet}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Bottom Sheet
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.viewsSelectItem}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Select Item
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.slider}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Slider
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.image}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Image
              </Button>
            </AppLink>
          </Grid>
          
          <Gap h={20}/>
          
          <div>Other:</div>
          
          <Grid w='full' cols='repeat(auto-fit, minmax(200px, 400px))' g={10}>
            <AppLink toFull={RootRoute.devTest.resizeObserver}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Resize Observer test
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.moveElementToAnotherView}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Move to another view
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.pointer}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Pointer test
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.state}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                State test
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.pageLifecycle}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Page Lifecycle test
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.useEvent}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                useEvent test
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.elemRef}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Element Ref test
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.elemStyle}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Element Style test
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.oldProfileOptions}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Old Profile Options
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.shadowDOMTest}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Shadow DOM Test
              </Button>
            </AppLink>
          
          </Grid>
          
          <Gap h={20}/>
          
          <Grid w='full' cols='repeat(auto-fit, minmax(200px, 400px))' g={10}>
            <AppLink toFull={RootRoute.devTest.emulatedScroll}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Emulated Scroll
              </Button>
            </AppLink>
          </Grid>
          
          <Gap h={20}/>
          
          {/*
          <button
            onClick={() => toast(<ToastBody type={'danger'}>TOASttt</ToastBody>)}
          >
            toast
          </button>
          */}
          
          
          <PieProgressView/>
          
          
          <Flex w={300} h={150} p={10} rad={16}
            css={t => ({ background: t.boxDefault.bg, color: t.boxDefault.ct })}
          >
            Контент.<br/>
            Theme.boxDefault
          </Flex>
          
          <Flex w={300} h={150} p={10} rad={16}
            css={t => ({ background: t.boxDefault3.bg, color: t.boxDefault3.ct })}
          >
            Контент.<br/>
            Theme.boxNormal2
          </Flex>
          
          <Flex w={300} h={150} p={10} rad={16}
            css={t => ({ background: t.boxAccent4.bg, color: t.boxAccent4.ct })}
          >
            Контент.<br/>
            Theme.boxAccent4
          </Flex>
          
          
          <Flex w={300} h={150} p={10} rad={16}
            css={t => ({ background: t.boxAccent4.bg, color: t.boxAccent4.ct })}
          >
            <CheckboxInput
              css={CheckboxInputStyle.roundNormalNormal}
              checked={isChecked}
              onChange={toggleIsChecked}
            />
          </Flex>
          
          
          <Flex relative w={300} h={150} p={10} rad={16}
            css={t => ({ background: t.boxDefault.bg, color: t.boxDefault.ct })}
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
          </Flex>
        
        
        </Pages.Content>
      </Pages.Page>
      
      
      <TopFloatingBar backButton/>
      
      <BottomFloatingBar settingsButton/>
    
    
    </>
  )
})
DevTestPage.displayName = 'DevTestPage'
export default DevTestPage




const PieProgressView = React.memo(() => {
  
  const [progress, setProgress] = useState(0)
  useInterval(3000, () => setProgress(s => s === 0 ? 100 : 0))
  
  return (
    <Flex row center sz={200} rad={16}
      css={t => ({ background: t.boxDefault.bg })}
    >
      <PieProgress h='30%' ratio={1}
        css={t => PieProgressCssProps.map({
          colorAccent: t.boxDefault.ct,
          color: 'transparent',
        })}
        progress={RangeU.map(progress, [0, 100], [5, 95])}
      />
    </Flex>
  )
})

