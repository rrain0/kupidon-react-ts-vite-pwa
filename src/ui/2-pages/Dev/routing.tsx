import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path

const TestPage = React.lazy(() => import('src/ui/2-pages/Dev/DevPage.tsx'))

const ScrollbarTestPage = React.lazy(() => import('src/ui/2-pages/Dev/pages/ScrollbarTestPage.tsx'))
const BottomSheetTestPage = React.lazy(() => import('src/ui/2-pages/Dev/views/BottomSheetTestPage.tsx'))
const SelectItemTestPage = React.lazy(() => import('src/ui/2-pages/Dev/views/SelectItemTestPage.tsx'))
const RippleTestPage = React.lazy(() => import('src/ui/2-pages/Dev/views/RippleTestPage.tsx'))
const ButtonsTestPage = React.lazy(() => import('src/ui/2-pages/Dev/views/ButtonsTestPage.tsx'))
const SliderTestPage = React.lazy(() => import('src/ui/2-pages/Dev/views/SliderTestPage.tsx'))
const ImageTestPage = React.lazy(() => import('src/ui/2-pages/Dev/views/ImageTestPage.tsx'))

const ResizeObserverTestPage = React.lazy(() => import('src/ui/2-pages/Dev/pages/ResizeObserverTestPage.tsx'))
const MoveElementToAnotherViewTestPage = React.lazy(
  () => import('src/ui/2-pages/Dev/pages/MoveElementToAnotherViewTestPage.tsx')
)
const PointerTestPage = React.lazy(() => import('src/ui/2-pages/Dev/pages/PointerTestPage.tsx'))
const TabsTestPage = React.lazy(() => import('src/ui/2-pages/Dev/pages/TabsTestPage.tsx'))
const StateTestPage = React.lazy(() => import('src/ui/2-pages/Dev/pages/StateTestPage.tsx'))
const PageLifecycleTestPage = React.lazy(() => import('src/ui/2-pages/Dev/pages/PageLifecycleTestPage.tsx'))
const UseEventTestPage = React.lazy(() => import('src/ui/2-pages/Dev/pages/UseEventTestPage.tsx'))
const ElemRefTestPage = React.lazy(() => import('src/ui/2-pages/Dev/pages/ElemRefTestPage.tsx'))
const ElemStyleTestPage = React.lazy(() => import('src/ui/2-pages/Dev/pages/ElemStyleTestPage.tsx'))
const OldProfileOptionsPage = React.lazy(() => import('src/ui/2-pages/Dev/pages/OldProfileOptionsTestPage.tsx'))
const EmulatedScroll = React.lazy(
  () => import('src/ui/2-pages/Dev/pages/EmulatedScrollTestPage/EmulatedScrollTestPage.tsx')
)
const ShadowDOMTestPage = React.lazy(
  () => import('src/ui/2-pages/Dev/pages/ShadowDOMTestPage.tsx')
)



// path: 'dev / bottomSheet / ...'
const testBottomSheetTestPageRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BottomSheetTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / scrollbar / ...'
const testScrollbarTestPageRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ScrollbarTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / views-select-item / ...'
const viewsSelectItemRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SelectItemTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / ripple / ...'
const rippleRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RippleTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / buttons / ...'
const buttonsRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ButtonsTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / slider / ...'
const sliderRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SliderTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / image / ...'
const imageRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ImageTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]




// path: 'dev / resizeObserver / ...'
const testResizeObserverTestPageRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ResizeObserverTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / moveElementToAnotherView / ...'
const testMoveElementToAnotherViewRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <MoveElementToAnotherViewTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / pointer / ...'
const testPointerRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PointerTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / tabs / ...'
const testTabsRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <TabsTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / state / ...'
const testStateRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <StateTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / page-lifecycle / ...'
const pageLifecycleRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PageLifecycleTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / use-event / ...'
const useEventRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UseEventTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / elem-ref / ...'
const elemRefRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ElemRefTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / elem-style / ...'
const elemStyleRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ElemStyleTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / old-profile-options / ...'
const oldProfileOptionsRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <OldProfileOptionsPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / emulated-scroll / ...'
const emulatedScrollRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <EmulatedScroll />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'dev / shadow-dom / ...'
const shadowDOMRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ShadowDOMTestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]




// path: 'dev / ...'
export const devRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <TestPage />
      </Suspense>
    ),
  },
  
  
  {
    path: RootRoute.dev.bottomSheet[path]+'/*',
    children: testBottomSheetTestPageRouting,
  },
  {
    path: RootRoute.dev.scrollbar[path]+'/*',
    children: testScrollbarTestPageRouting,
  },
  {
    path: RootRoute.dev.viewsSelectItem[path]+'/*',
    children: viewsSelectItemRouting,
  },
  {
    path: RootRoute.dev.ripple[path]+'/*',
    children: rippleRouting,
  },
  {
    path: RootRoute.dev.buttons[path]+'/*',
    children: buttonsRouting,
  },
  {
    path: RootRoute.dev.slider[path]+'/*',
    children: sliderRouting,
  },
  {
    path: RootRoute.dev.image[path]+'/*',
    children: imageRouting,
  },
  
  
  
  {
    path: RootRoute.dev.resizeObserver[path]+'/*',
    children: testResizeObserverTestPageRouting,
  },
  {
    path: RootRoute.dev.moveElementToAnotherView[path]+'/*',
    children: testMoveElementToAnotherViewRouting,
  },
  {
    path: RootRoute.dev.pointer[path]+'/*',
    children: testPointerRouting,
  },
  {
    path: RootRoute.dev.tabs[path]+'/*',
    children: testTabsRouting,
  },
  {
    path: RootRoute.dev.state[path]+'/*',
    children: testStateRouting,
  },
  {
    path: RootRoute.dev.pageLifecycle[path]+'/*',
    children: pageLifecycleRouting,
  },
  {
    path: RootRoute.dev.useEvent[path]+'/*',
    children: useEventRouting,
  },
  {
    path: RootRoute.dev.elemRef[path]+'/*',
    children: elemRefRouting,
  },
  {
    path: RootRoute.dev.elemStyle[path]+'/*',
    children: elemStyleRouting,
  },
  {
    path: RootRoute.dev.oldProfileOptions[path]+'/*',
    children: oldProfileOptionsRouting,
  },
  {
    path: RootRoute.dev.emulatedScroll[path]+'/*',
    children: emulatedScrollRouting,
  },
  {
    path: RootRoute.dev.shadowDOMTest[path]+'/*',
    children: shadowDOMRouting,
  },
  clearUnknownPathEnding,
]




