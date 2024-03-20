import React from 'react'
import { useRef, useState } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { TabIdx, TabsState } from 'src/views/Tabs/useTabs'
import PartialUndef = TypeUtils.PartialUndef
import SetterOrUpdater = TypeUtils.SetterOrUpdater




export type UseTabsStateRenderProps = {
  tabsState: TabsState
  setTabsState: SetterOrUpdater<TabsState>
  tabIdx: TabIdx
  setTabIdx: SetterOrUpdater<TabIdx>
  tabFrameRef: React.RefObject<HTMLDivElement>
}
export type UseTabsStateProps = PartialUndef<{
  initialIdx: number
  initialState: TabsState
  children: (props: UseTabsStateRenderProps)=>React.ReactNode
}>



const UseTabsState =
React.memo(
(props: UseTabsStateProps)=>{
  const [tabsState, setTabsState] = useState<TabsState>(props.initialState ?? 'opened')
  const [tabIdx, setTabIdx] = useState<TabIdx>(props.initialIdx ?? 0)
  const tabFrameRef = useRef<HTMLDivElement>(null)
  const tabsProps = {
    tabsState, setTabsState,
    tabIdx, setTabIdx,
    tabFrameRef,
  } as const
  
  return props.children?.(tabsProps)
})
export default UseTabsState