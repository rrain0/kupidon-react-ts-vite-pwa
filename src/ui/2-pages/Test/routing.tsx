import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { clearUnknownPathEnding } from 'src/util/ReactRouterUtils.tsx'
import PageLifecycle from 'src/ui/2-pages/Test/pages/PageLifecycle'
import PointerTestPage from 'src/ui/2-pages/Test/pages/PointerTestPage.tsx'
import EmulatedScroll from 'src/ui/2-pages/Test/SimulatedScroll/EmulatedScroll'
import StateTestPage from 'src/ui/2-pages/Test/pages/StateTestPage.tsx'
import TabsTestPage from 'src/ui/2-pages/Test/pages/TabsTestPage.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import TestPage from 'src/ui/2-pages/Test/TestPage.tsx'
import ScrollbarTestPage from 'src/ui/2-pages/Test/pages/ScrollbarTestPage.tsx'
import ResizeObserverTestPage from 'src/ui/2-pages/Test/pages/ResizeObserverTestPage.tsx'
import BottomSheetTest from 'src/ui/2-pages/Test/views/BottomSheetTest.tsx'
import MoveElementToAnotherViewTestPage from 'src/ui/2-pages/Test/pages/MoveElementToAnotherViewTestPage.tsx'
import ListItem1AddItemTest from 'src/ui/2-pages/Test/views/ListItem1AddItemTest'
import ListItem2Test from 'src/ui/2-pages/Test/views/ListItem2Test'
import RippleTest from 'src/ui/2-pages/Test/views/RippleTest'



// path: 'test / scrollbar / <check here>'
const testScrollbarTestPageRouting: RouteObject[] = [
  {
    path: '',
    Component: ScrollbarTestPage,
  },
  clearUnknownPathEnding,
]
// path: 'test / resizeObserver / <check here>'
const testResizeObserverTestPageRouting: RouteObject[] = [
  {
    path: '',
    Component: ResizeObserverTestPage,
  },
  clearUnknownPathEnding,
]
// path: 'test / bottomSheet / <check here>'
const testBottomSheetTestPageRouting: RouteObject[] = [
  {
    path: '',
    Component: BottomSheetTest,
  },
  clearUnknownPathEnding,
]
// path: 'test / moveElementToAnotherView / <check here>'
const testMoveElementToAnotherViewRouting: RouteObject[] = [
  {
    path: '',
    Component: MoveElementToAnotherViewTestPage,
  },
  clearUnknownPathEnding,
]
// path: 'test / pointer / <check here>'
const testPointerRouting: RouteObject[] = [
  {
    path: '',
    Component: PointerTestPage,
  },
  clearUnknownPathEnding,
]
// path: 'test / tabs / <check here>'
const testTabsRouting: RouteObject[] = [
  {
    path: '',
    Component: TabsTestPage,
  },
  clearUnknownPathEnding,
]
// path: 'test / state / <check here>'
const testStateRouting: RouteObject[] = [
  {
    path: '',
    Component: StateTestPage,
  },
  clearUnknownPathEnding,
]
// path: 'test / page-lifecycle / <check here>'
const pageLifecycleRouting: RouteObject[] = [
  {
    path: '',
    Component: PageLifecycle,
  },
  clearUnknownPathEnding,
]


// path: 'test / emulated-scroll / <check here>'
const emulatedScrollRouting: RouteObject[] = [
  {
    path: '',
    Component: EmulatedScroll,
  },
  clearUnknownPathEnding,
]


// path: 'test / views-list-item-1-add-item / <check here>'
const viewsListItem1AddItemRouting: RouteObject[] = [
  {
    path: '',
    Component: ListItem1AddItemTest,
  },
  clearUnknownPathEnding,
]
// path: 'test / views-list-item-2 / <check here>'
const viewsListItem2Routing: RouteObject[] = [
  {
    path: '',
    Component: ListItem2Test,
  },
  clearUnknownPathEnding,
]
// path: 'test / ripple-test / <check here>'
const rippleTestRouting: RouteObject[] = [
  {
    path: '',
    Component: RippleTest,
  },
  clearUnknownPathEnding,
]



// path: 'test / <check here>'
export const testRouting: RouteObject[] = [
  {
    path: '',
    Component: TestPage,
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
    children: pageLifecycleRouting,
  },
  {
    path: RootRoute.test.pageLifecycle[path]+'/*',
    children: testStateRouting,
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
    children: rippleTestRouting,
  },
  clearUnknownPathEnding,
]




