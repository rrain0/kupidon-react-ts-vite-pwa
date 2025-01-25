import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { clearUnknownPathEnding } from 'src/util/ReactRouterUtils.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path

const TestPage = React.lazy(() => import('src/ui/2-pages/Test/TestPage.tsx'))

const ElemRefTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/ElemRefTestPage.tsx'))
const ElemStyleTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/ElemStyleTestPage.tsx'))
const OldProfileOptionsPage = React.lazy(() => import('src/ui/2-pages/Test/pages/OldProfileOptionsPage.tsx'))
const UseEventTest = React.lazy(() => import('src/ui/2-pages/Test/pages/UseEventTest.tsx'))
const PageLifecycle = React.lazy(() => import('src/ui/2-pages/Test/pages/PageLifecycle.tsx'))
const PointerTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/PointerTestPage.tsx'))
const EmulatedScroll = React.lazy(() => import('src/ui/2-pages/Test/EmulatedScroll/EmulatedScroll.tsx'))
const StateTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/StateTestPage.tsx'))
const TabsTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/TabsTestPage.tsx'))
const ScrollbarTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/ScrollbarTestPage.tsx'))
const ResizeObserverTestPage = React.lazy(() => import('src/ui/2-pages/Test/pages/ResizeObserverTestPage.tsx'))
const BottomSheetTest = React.lazy(() => import('src/ui/2-pages/Test/views/BottomSheetTest.tsx'))
const MoveElementToAnotherViewTestPage = React.lazy(
  () => import('src/ui/2-pages/Test/pages/MoveElementToAnotherViewTestPage.tsx')
)
const ListItem1AddItemTest = React.lazy(() => import('src/ui/2-pages/Test/views/ListItem1AddItemTest.tsx'))
const ListItem2Test = React.lazy(() => import('src/ui/2-pages/Test/views/ListItem2Test.tsx'))
const RippleTest = React.lazy(() => import('src/ui/2-pages/Test/views/RippleTest.tsx'))
const ButtonTest = React.lazy(() => import('src/ui/2-pages/Test/views/ButtonTest.tsx'))
const SliderTestPage = React.lazy(() => import('src/ui/2-pages/Test/views/SliderTestPage'))



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
// path: 'test / bottomSheet / <check here>'
const testBottomSheetTestPageRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BottomSheetTest />
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
        <PageLifecycle />
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
        <UseEventTest />
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


// path: 'test / views-list-item-1-add-item / <check here>'
const viewsListItem1AddItemRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ListItem1AddItemTest />
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
        <ListItem2Test />
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
        <RippleTest />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
// path: 'test / button / <check here>'
const buttonRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ButtonTest />
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
    path: RootRoute.test.scrollbar[path]+'/*',
    children: testScrollbarTestPageRouting,
  },
  {
    path: RootRoute.test.resizeObserver[path]+'/*',
    children: testResizeObserverTestPageRouting,
  },
  {
    path: RootRoute.test.bottomSheet[path]+'/*',
    children: testBottomSheetTestPageRouting,
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
    path: RootRoute.test.pageLifecycle[path]+'/*',
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
    path: RootRoute.test.sliderTest[path]+'/*',
    children: sliderRouting,
  },
  
  
  {
    path: RootRoute.test.emulatedScroll[path]+'/*',
    children: emulatedScrollRouting,
  },
  
  
  {
    path: RootRoute.test.viewsListItem1AddItem[path]+'/*',
    children: viewsListItem1AddItemRouting,
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
    path: RootRoute.test.buttonTest[path]+'/*',
    children: buttonRouting,
  },
  {
    path: RootRoute.test.elemStyle[path]+'/*',
    children: elemStyleRouting,
  },
  {
    path: RootRoute.test.oldProfileOptions[path]+'/*',
    children: oldProfileOptionsRouting,
  },
  clearUnknownPathEnding,
]




