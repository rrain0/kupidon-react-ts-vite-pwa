import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path

const TestPage = React.lazy(() => import('src/ui/2-pages/DevTest/DevTestPage.tsx'))

const ScrollbarTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/pages/ScrollbarTestPage.tsx'))
const BottomSheetTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/views/BottomSheetTestPage.tsx'))
const SelectItemTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/views/SelectItemTestPage.tsx'))
const RippleTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/views/RippleTestPage.tsx'))
const ButtonsTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/views/ButtonsTestPage.tsx'))
const SliderTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/views/SliderTestPage.tsx'))
const ImageTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/views/ImageTestPage.tsx'))

const ResizeObserverTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/pages/ResizeObserverTestPage.tsx'))
const MoveElementToAnotherViewTestPage = React.lazy(
  () => import('src/ui/2-pages/DevTest/pages/MoveElementToAnotherViewTestPage.tsx')
)
const PointerTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/pages/PointerTestPage.tsx'))
const StateTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/pages/StateTestPage.tsx'))
const PageLifecycleTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/pages/PageLifecycleTestPage.tsx'))
const UseEventTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/pages/UseEventTestPage.tsx'))
const ElemRefTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/pages/ElemRefTestPage.tsx'))
const ElemStyleTestPage = React.lazy(() => import('src/ui/2-pages/DevTest/pages/ElemStyleTestPage.tsx'))
const OldProfileOptionsPage = React.lazy(() => import('src/ui/2-pages/DevTest/pages/OldProfileOptionsTestPage.tsx'))
const EmulatedScroll = React.lazy(
  () => import('src/ui/2-pages/DevTest/pages/EmulatedScrollTestPage/EmulatedScrollTestPage.tsx')
)
const ShadowDOMTestPage = React.lazy(
  () => import('src/ui/2-pages/DevTest/pages/ShadowDOMTestPage.tsx')
)


// TODO refactor - rename ...Routing to routing...

// path: 'dev-test / bottomSheet / ...'
const testBottomSheetTestPageRouting: RouteObject[] = [
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
const testScrollbarTestPageRouting: RouteObject[] = [
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
const viewsSelectItemRouting: RouteObject[] = [
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
const rippleRouting: RouteObject[] = [
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
// path: 'dev-test / buttons / ...'
const buttonsRouting: RouteObject[] = [
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
// path: 'dev-test / slider / ...'
const sliderRouting: RouteObject[] = [
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
const imageRouting: RouteObject[] = [
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
const testResizeObserverTestPageRouting: RouteObject[] = [
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
const testMoveElementToAnotherViewRouting: RouteObject[] = [
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
const testPointerRouting: RouteObject[] = [
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
const testStateRouting: RouteObject[] = [
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
const pageLifecycleRouting: RouteObject[] = [
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
const useEventRouting: RouteObject[] = [
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
const elemRefRouting: RouteObject[] = [
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
const elemStyleRouting: RouteObject[] = [
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
const oldProfileOptionsRouting: RouteObject[] = [
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
const emulatedScrollRouting: RouteObject[] = [
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
    path: RootRoute.devTest.bottomSheet[path]+'/*',
    children: testBottomSheetTestPageRouting,
  },
  {
    path: RootRoute.devTest.scrollbar[path]+'/*',
    children: testScrollbarTestPageRouting,
  },
  {
    path: RootRoute.devTest.viewsSelectItem[path]+'/*',
    children: viewsSelectItemRouting,
  },
  {
    path: RootRoute.devTest.ripple[path]+'/*',
    children: rippleRouting,
  },
  {
    path: RootRoute.devTest.buttons[path]+'/*',
    children: buttonsRouting,
  },
  {
    path: RootRoute.devTest.slider[path]+'/*',
    children: sliderRouting,
  },
  {
    path: RootRoute.devTest.image[path]+'/*',
    children: imageRouting,
  },
  
  
  
  {
    path: RootRoute.devTest.resizeObserver[path]+'/*',
    children: testResizeObserverTestPageRouting,
  },
  {
    path: RootRoute.devTest.moveElementToAnotherView[path]+'/*',
    children: testMoveElementToAnotherViewRouting,
  },
  {
    path: RootRoute.devTest.pointer[path]+'/*',
    children: testPointerRouting,
  },
  {
    path: RootRoute.devTest.state[path]+'/*',
    children: testStateRouting,
  },
  {
    path: RootRoute.devTest.pageLifecycle[path]+'/*',
    children: pageLifecycleRouting,
  },
  {
    path: RootRoute.devTest.useEvent[path]+'/*',
    children: useEventRouting,
  },
  {
    path: RootRoute.devTest.elemRef[path]+'/*',
    children: elemRefRouting,
  },
  {
    path: RootRoute.devTest.elemStyle[path]+'/*',
    children: elemStyleRouting,
  },
  {
    path: RootRoute.devTest.oldProfileOptions[path]+'/*',
    children: oldProfileOptionsRouting,
  },
  {
    path: RootRoute.devTest.emulatedScroll[path]+'/*',
    children: emulatedScrollRouting,
  },
  {
    path: RootRoute.devTest.shadowDOMTest[path]+'/*',
    children: routingShadowDOM,
  },
  clearUnknownPathEnding,
]




