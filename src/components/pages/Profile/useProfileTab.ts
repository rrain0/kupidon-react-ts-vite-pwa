
import { RouteBuilder } from '@libs/route-builder/RouteBuilder'
import { useEffect, useMemo, useState } from 'react'
import { useMatch, useNavigate, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import use = RouteBuilder.use
import { isundef } from '@utils/base/TypeUtils.ts'




const previewTab = {
  pathSegment: RootRoute.profile.id.userId.tab.preview[path],
  route: (userId: string) => RootRoute.profile.id.userId[use](userId).tab.preview,
  i: 0,
}
const editTab = {
  pathSegment: RootRoute.profile.id.userId.tab.edit[path],
  route: (userId: string) => RootRoute.profile.id.userId[use](userId).tab.edit,
  i: 1,
}
const testsTab = {
  pathSegment: RootRoute.profile.id.userId.tab.tests[path],
  route: (userId: string) => RootRoute.profile.id.userId[use](userId).tab.tests,
  i: 2,
}
const tabs = [previewTab, editTab, testsTab]

const getTabByPathSegment = (pathSegment: string) => tabs.find(it => it.pathSegment === pathSegment)
const getTabByIndex = (i: number) => tabs.find(it => it.i === i)




export const useProfileTab = () => {
  const navigate = useNavigate()
  const [search] = useSearchParams()
  
  const userIdTabRoute = RootRoute.profile.id
    .userId[use](':userId')
    .tab.edit[use](':tab')
  const params = useMatch(userIdTabRoute[full]())!.params!
  const userId = params['userId']!
  const tab = params['tab']!
  
  /* useEffect(() => {
    console.log('tab', tab)
  }, [tab]) */
  
  const tabData = useMemo(() => {
    if (!tab) return undefined
    return getTabByPathSegment(tab)
  }, [tab])
  
  const tabI = tabData?.i
  
  
  const [newTabI, setNewTabI] = useState(tabI)
  
  useEffect(() => setNewTabI(tabI), [tabI])
  
  useEffect(() => {
    if (isundef(newTabI)) return
    const tabData = getTabByIndex(newTabI)
    if (!tabData) return
    navigate(
      tabData.route(userId)[fullAnySearchParams](search),
      { replace: true },
    )
  }, [newTabI])
  
  
  return [tabI, setNewTabI] as const
  //return [newTabI, setNewTabI] as const
}
