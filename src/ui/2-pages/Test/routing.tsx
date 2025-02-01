import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { clearUnknownPathEnding } from 'src/util/ReactRouterUtils.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path

const TestPage = React.lazy(() => import('src/ui/2-pages/Test/TestPage.tsx'))

const ScrollbarTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/ScrollbarTestPage.tsx'))
const BottomSheetTestPage = React.lazy(() => import('src/ui/2-pages/Test/views/BottomSheetTestPage.tsx'))
const ListItem2TestPage = React.lazy(() => import('src/ui/2-pages/Test/views/ListItem2TestPage.tsx'))
const RippleTestPage = React.lazy(() => import('src/ui/2-pages/Test/views/RippleTestPage.tsx'))
const ButtonsTestPage = React.lazy(() => import('src/ui/2-pages/Test/views/ButtonsTestPage.tsx'))
const SliderTestPage = React.lazy(() => import('src/ui/2-pages/Test/views/SliderTestPage'))
const ResizeObserverTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/ResizeObserverTestPage.tsx'))
const MoveElementToAnotherViewTestPage = React.lazy(
  () => import('src/ui/2-pages/Test/pages/MoveElementToAnotherViewTestPage.tsx')
)
const PointerTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/PointerTestPage.tsx'))
const TabsTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/TabsTestPage.tsx'))
const StateTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/StateTestPage.tsx'))
const PageLifecycleTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/PageLifecycleTestPage.tsx'))
const UseEventTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/UseEventTestPage.tsx'))
const ElemRefTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/ElemRefTestPage.tsx'))
const ElemStyleTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/ElemStyleTestPage.tsx'))
const OldProfileOptionsPage = React.lazy(() => import('src/ui/2-pages/Test/pages/OldProfileOptionsTestPage.tsx'))
const EmulatedScroll = React.lazy(
  () => import('src/ui/2-pages/Test/pages/EmulatedScrollTestPage/EmulatedScrollTestPage.tsx')
)
const ShadowDOMTestPage = React.lazy(
  () => import('src/ui/2-pages/Test/pages/ShadowDOMTestPage.tsx')
)



// path: 'test / bottomSheet / <check here>'
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
// path: 'test / scrollbar / <check here>'
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
// path: 'test / views-list-item-2 / <check here>'
const viewsListItem2Routing: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ListItem2TestPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'test / ripple / <check here>'
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
// path: 'test / buttons / <check here>'
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
// path: 'test / slider / <check here>'
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
// path: 'test / resizeObserver / <check here>'
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
// path: 'test / moveElementToAnotherView / <check here>'
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
// path: 'test / pointer / <check here>'
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
// path: 'test / tabs / <check here>'
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
// path: 'test / state / <check here>'
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
// path: 'test / page-lifecycle / <check here>'
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
// path: 'test / use-event / <check here>'
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
// path: 'test / elem-ref / <check here>'
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
// path: 'test / elem-style / <check here>'
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
// path: 'test / old-profile-options / <check here>'
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
// path: 'test / emulated-scroll / <check here>'
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
// path: 'test / shadow-dom / <check here>'
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




// path: 'test / <check here>'
export const testRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <TestPage />
      </Suspense>
    ),
  },
  
  
  {
    path: RootRoute.test.bottomSheet[path]+'/*',
    children: testBottomSheetTestPageRouting,
  },
  {
    path: RootRoute.test.scrollbar[path]+'/*',
    children: testScrollbarTestPageRouting,
  },
  {
    path: RootRoute.test.viewsListItem2[path]+'/*',
    children: viewsListItem2Routing,
  },
  {
    path: RootRoute.test.rippleTest[path]+'/*',
    children: rippleRouting,
  },
  {
    path: RootRoute.test.buttonsTest[path]+'/*',
    children: buttonsRouting,
  },
  {
    path: RootRoute.test.sliderTest[path]+'/*',
    children: sliderRouting,
  },
  {
    path: RootRoute.test.resizeObserver[path]+'/*',
    children: testResizeObserverTestPageRouting,
  },
  {
    path: RootRoute.test.moveElementToAnotherView[path]+'/*',
    children: testMoveElementToAnotherViewRouting,
  },
  {
    path: RootRoute.test.pointer[path]+'/*',
    children: testPointerRouting,
  },
  {
    path: RootRoute.test.tabs[path]+'/*',
    children: testTabsRouting,
  },
  {
    path: RootRoute.test.state[path]+'/*',
    children: testStateRouting,
  },
  {
    path: RootRoute.test.pageLifecycle[path]+'/*',
    children: pageLifecycleRouting,
  },
  {
    path: RootRoute.test.useEvent[path]+'/*',
    children: useEventRouting,
  },
  {
    path: RootRoute.test.elemRef[path]+'/*',
    children: elemRefRouting,
  },
  {
    path: RootRoute.test.elemStyle[path]+'/*',
    children: elemStyleRouting,
  },
  {
    path: RootRoute.test.oldProfileOptions[path]+'/*',
    children: oldProfileOptionsRouting,
  },
  {
    path: RootRoute.test.emulatedScroll[path]+'/*',
    children: emulatedScrollRouting,
  },
  {
    path: RootRoute.test.shadowDOMTest[path]+'/*',
    children: shadowDOMRouting,
  },
  clearUnknownPathEnding,
]




