import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import PointerTestPage from 'src/ui/pages/Test/PointerTestPage.tsx'
import StateTestPage from 'src/ui/pages/Test/StateTestPage.tsx'
import TabsTestPage from 'src/ui/pages/Test/TabsTestPage.tsx'
import { RouteBuilder } from '@util/mini-libs/route-builder/RouteBuilder.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import TestPage from 'src/ui/pages/Test/TestPage.tsx'
import ScrollbarTestPage from 'src/ui/pages/Test/ScrollbarTestPage.tsx'
import ResizeObserverTestPage from 'src/ui/pages/Test/ResizeObserverTestPage.tsx'
import BottomSheetTestPage from 'src/ui/pages/Test/BottomSheetTestPage.tsx'
import MoveElementToAnotherViewTestPage from 'src/ui/pages/Test/MoveElementToAnotherViewTestPage.tsx'



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
    Component: BottomSheetTestPage,
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
    path: RootRoute.test.state[path]+'/*',
    children: testStateRouting,
  },
  clearUnknownPathEnding,
]




