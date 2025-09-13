import { css } from '@emotion/react'
import React, { useState } from 'react'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import Gap from '@libs/short-propsed/components/Gap.tsx'
import Grid from '@libs/short-propsed/components/Grid.tsx'
import { Hdrs } from 'src/components/elems/basic-elements/Hdrs.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import AppLink from 'src/components/components/app-router/AppLink.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import CheckboxInput from 'src/components/elems/inputs/CheckboxInput/CheckboxInput.tsx'
import { CheckboxInputStyle } from 'src/components/elems/inputs/CheckboxInput/CheckboxInputStyle.ts'
import PieProgress, { PieProgressCssProps } from 'src/components/elems/PieProgress/PieProgress.tsx'
import { rangeMap } from '@utils/base/math/rangeUtils.ts'
import { useBool } from '@utils/state/react/base/useBool.ts'
import { useInterval } from '@utils/react/useInterval.ts'
import RootRoute = AppRoutes.RootRoute
import checkmarkBold from '@ic/normal/ui/checkmark-bold.svg'






const DevTestPage = React.memo(() => {
  
  
  const [isChecked, , , toggleIsChecked] = useBool(false)
  
  const [onEventVal, , , toggleOnEventVal] = useBool(false)
  
  
  //console.log('TestPage render')
  
  return (
    <>
      
      <PageLayout col css={{ '*': { userSelect: 'text' } }}>
        <PageContentLayout col>
          
          
          <Grid cols='38px 1fr 38px' stretch>
            <Flex centerStart m={-13}><BackButton/></Flex>
            {/* TODO Translation */}
            <Flex center><Hdrs.Page>{'Тестовая страница'}</Hdrs.Page></Flex>
            <Gap w={38}/>
          </Grid>
          
          <Gap h={30}/>
          
          <div>Views:</div>
          
          <Grid w='full' cols='repeat(auto-fit, minmax(200px, 400px))' g={10}>
            <AppLink toFull={RootRoute.devTest.theme}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Theme
              </Button>
            </AppLink>
            <AppLink toFull={RootRoute.devTest.icons}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Icons
              </Button>
            </AppLink>
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
            <AppLink toFull={RootRoute.devTest.cssTest}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                Css Test
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
          
          
          <Flex row wrap w={300} h={150} p={10} g={10} rad={16}
            css={t => ({ background: t.boxDefault2.bg, color: t.boxDefault2.ct })}
          >
            
            <CheckboxInput
              css={CheckboxInputStyle.roundNormalNormal}
              checked={isChecked}
              onChange={toggleIsChecked}
            />
            
            <Flex sz={50} center>
              <Flex sz={22} rad={4}
                css={{
                  border: '2px solid black',
                }}
              />
            </Flex>
            
            <Flex sz={50} center>
              <Flex sz={22} rad={4}
                css={{
                  //border: '2px solid black',
                  backgroundColor: 'black',
                  maskImage: `linear-gradient(to left, black, black), url("${checkmarkBold}")`,
                  //maskOrigin: 'content-box',
                  maskPosition: 'center',
                  maskSize: 'contain',
                  maskComposite: 'exclude',
                }}
              />
            </Flex>
            
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
        
        
        </PageContentLayout>
      </PageLayout>
      
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
        progress={rangeMap(progress, [0, 100], [5, 95])}
      />
    </Flex>
  )
})

