import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import { RouteBuilder } from '@libs/route-builder/RouteBuilder.tsx'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path

const TestPage = React.lazy(() => import('src/components/pages/DevTest/DevTestPage.tsx'))

const ThemeTestPage = React.lazy(() => import('src/components/pages/DevTest/views/ThemeTestPage.tsx'))
const IconsTestPage = React.lazy(() => import('src/components/pages/DevTest/views/IconsTestPage.tsx'))
const ButtonsTestPage = React.lazy(() => import('src/components/pages/DevTest/views/ButtonsTestPage.tsx'))
const ScrollbarTestPage = React.lazy(() => import('src/components/pages/DevTest/views/ScrollbarTestPage.tsx'))
const BottomSheetTestPage = React.lazy(() => import('src/components/pages/DevTest/views/BottomSheetTestPage.tsx'))
const SelectItemTestPage = React.lazy(() => import('src/components/pages/DevTest/views/SelectItemTestPage.tsx'))
const RippleTestPage = React.lazy(() => import('src/components/pages/DevTest/views/RippleTestPage.tsx'))
const SliderTestPage = React.lazy(() => import('src/components/pages/DevTest/views/SliderTestPage.tsx'))
const ImageTestPage = React.lazy(() => import('src/components/pages/DevTest/views/ImageTestPage.tsx'))

const ResizeObserverTestPage = React.lazy(() => import('src/components/pages/DevTest/other/ResizeObserverTestPage.tsx'))
const MoveElementToAnotherViewTestPage = React.lazy(() => import(
  'src/components/pages/DevTest/other/MoveElementToAnotherViewTestPage.tsx'
))
const PointerTestPage = React.lazy(() => import('src/components/pages/DevTest/other/PointerTestPage.tsx'))
const StateTestPage = React.lazy(() => import('src/components/pages/DevTest/other/StateTestPage.tsx'))
const PageLifecycleTestPage = React.lazy(() => import('src/components/pages/DevTest/other/PageLifecycleTestPage.tsx'))
const UseEventTestPage = React.lazy(() => import('src/components/pages/DevTest/other/UseEventTestPage.tsx'))
const ElemRefTestPage = React.lazy(() => import('src/components/pages/DevTest/other/ElemRefTestPage.tsx'))
const ElemStyleTestPage = React.lazy(() => import('src/components/pages/DevTest/other/ElemStyleTestPage.tsx'))
const OldProfileOptionsPage = React.lazy(() => import('src/components/pages/DevTest/other/OldProfileOptionsTestPage.tsx'))
const EmulatedScroll = React.lazy(() => import(
  'src/components/pages/DevTest/other/EmulatedScrollTestPage/EmulatedScrollTestPage.tsx'
))
const ShadowDOMTestPage = React.lazy(() => import('src/components/pages/DevTest/other/ShadowDOMTestPage.tsx'))
const CssTestPage = React.lazy(() => import('src/components/pages/DevTest/other/CssTestPage.tsx'))




// path: 'dev-test / theme / ...'
const routingTheme: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <ThemeTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / icons / ...'
const routingIcons: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <IconsTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / buttons / ...'
const routingButtons: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <ButtonsTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / bottomSheet / ...'
const routingTestBottomSheetTestPage: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <BottomSheetTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / scrollbar / ...'
const routingTestScrollbarTestPage: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <ScrollbarTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / views-select-item / ...'
const routingViewsSelectItem: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <SelectItemTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / ripple / ...'
const routingRipple: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <RippleTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / slider / ...'
const routingSlider: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <SliderTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / image / ...'
const routingImage: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <ImageTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]




// path: 'dev-test / resizeObserver / ...'
const routingTestResizeObserverTestPage: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <ResizeObserverTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / moveElementToAnotherView / ...'
const routingTestMoveElementToAnotherView: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <MoveElementToAnotherViewTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / pointer / ...'
const routingTestPointer: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <PointerTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / state / ...'
const routingTestState: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <StateTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / page-lifecycle / ...'
const routingPageLifecycle: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <PageLifecycleTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / use-event / ...'
const routingUseEvent: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <UseEventTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / elem-ref / ...'
const routingElemRef: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <ElemRefTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / elem-style / ...'
const routingElemStyle: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <ElemStyleTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / old-profile-options / ...'
const routingOldProfileOptions: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <OldProfileOptionsPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / emulated-scroll / ...'
const routingEmulatedScroll: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <EmulatedScroll/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / shadow-dom / ...'
const routingShadowDOM: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <ShadowDOMTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev-test / scss / ...'
const routingCss: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <CssTestPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]




// path: 'dev-test / ...'
export const routingDevTest: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <TestPage/>
      </Suspense>
    ),
  },
  
  
  {
    path: `${RootRoute.devTest.theme[path]}/*`,
    children: routingTheme,
  },
  {
    path: `${RootRoute.devTest.icons[path]}/*`,
    children: routingIcons,
  },
  {
    path: `${RootRoute.devTest.buttons[path]}/*`,
    children: routingButtons,
  },
  {
    path: `${RootRoute.devTest.bottomSheet[path]}/*`,
    children: routingTestBottomSheetTestPage,
  },
  {
    path: `${RootRoute.devTest.scrollbar[path]}/*`,
    children: routingTestScrollbarTestPage,
  },
  {
    path: `${RootRoute.devTest.viewsSelectItem[path]}/*`,
    children: routingViewsSelectItem,
  },
  {
    path: `${RootRoute.devTest.ripple[path]}/*`,
    children: routingRipple,
  },
  {
    path: `${RootRoute.devTest.slider[path]}/*`,
    children: routingSlider,
  },
  {
    path: `${RootRoute.devTest.image[path]}/*`,
    children: routingImage,
  },
  
  
  
  {
    path: `${RootRoute.devTest.resizeObserver[path]}/*`,
    children: routingTestResizeObserverTestPage,
  },
  {
    path: `${RootRoute.devTest.moveElementToAnotherView[path]}/*`,
    children: routingTestMoveElementToAnotherView,
  },
  {
    path: `${RootRoute.devTest.pointer[path]}/*`,
    children: routingTestPointer,
  },
  {
    path: `${RootRoute.devTest.state[path]}/*`,
    children: routingTestState,
  },
  {
    path: `${RootRoute.devTest.pageLifecycle[path]}/*`,
    children: routingPageLifecycle,
  },
  {
    path: `${RootRoute.devTest.useEvent[path]}/*`,
    children: routingUseEvent,
  },
  {
    path: `${RootRoute.devTest.elemRef[path]}/*`,
    children: routingElemRef,
  },
  {
    path: `${RootRoute.devTest.elemStyle[path]}/*`,
    children: routingElemStyle,
  },
  {
    path: `${RootRoute.devTest.oldProfileOptions[path]}/*`,
    children: routingOldProfileOptions,
  },
  {
    path: `${RootRoute.devTest.emulatedScroll[path]}/*`,
    children: routingEmulatedScroll,
  },
  {
    path: `${RootRoute.devTest.shadowDOMTest[path]}/*`,
    children: routingShadowDOM,
  },
  {
    path: `${RootRoute.devTest.cssTest[path]}/*`,
    children: routingCss,
  },
  clearUnknownPathEnding,
]




