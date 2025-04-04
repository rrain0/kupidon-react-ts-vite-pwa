import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { useEffect, useMemo, useState } from 'react'
import { useMatch, useNavigate, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import use = RouteBuilder.use




const previewTab = {
  pathSegment: RootRoute.profile.id.userId.preview[path],
  route: (userId: string) => RootRoute.profile.id.userId[use](userId).preview,
  i: 0,
}
const profileTab = {
  pathSegment: RootRoute.profile.id.userId.profile[path],
  route: (userId: string) => RootRoute.profile.id.userId[use](userId).profile,
  i: 1,
}
const dateTab = {
  pathSegment: RootRoute.profile.id.userId.tests[path],
  route: (userId: string) => RootRoute.profile.id.userId[use](userId).tests,
  i: 2,
}
const tabs = [previewTab, profileTab, dateTab]

const getTabByPathSegment = (pathSegment: string) => tabs.find(it => it.pathSegment === pathSegment)
const getTabByIndex = (i: number) => tabs.find(it => it.i === i)




export const useProfileTab = () => {
  const navigate = useNavigate()
  const [search] = useSearchParams()
  
  const userIdTabRoute = RootRoute.profile.id.userId[use](':userId').profile[use](':tab')
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
    if (!newTabI) return
    const tabData = getTabByIndex(newTabI)
    if (!tabData) return
    navigate(
      tabData.route(userId)[fullAnySearchParams](search),
      { replace: true },
    )
  }, [newTabI])
  
  
  return [tabI, setNewTabI] as const
}
