import { useStateSync } from 'src/util/react-state-and-ref/useStateSync.ts'
import React, { useEffect, useMemo } from 'react'
import { useRef, useState } from 'react'
import { TypeU } from '@util/common/TypeU.ts'
import { TabIdx, TabsState } from 'src/ui/components/Tabs/useTabs.ts'
import PartialUndef = TypeU.PartialUndef
import SetterOrUpdater = TypeU.SetterOrUpdater
import Setter = TypeU.Setter




export type UseTabsStateProps = PartialUndef<{
  initialIdx: number
  idx: number
  setIdx: Setter<number>
  children: (props: UseTabsStateRenderProps)=>React.ReactNode
}>

const UseTabsState =
React.memo(
(props: UseTabsStateProps)=>{
  const {
    idx: tabIdxExt,
    setIdx: setTabIdxExt,
    initialIdx,
  } = props
  
  const [tabIdxExtLocal, setTabIdxExtLocal] = useState(initialIdx ?? tabIdxExt ?? 0)
  useEffect(() => {
    if (tabIdxExt!==undefined) setTabIdxExtLocal(tabIdxExt)
  }, [tabIdxExt])
  const setAvailableTabIdxExt = (idx: number)=>{
    if (setTabIdxExt) setTabIdxExt(idx)
    else setTabIdxExtLocal(idx)
  }
  
  const [tabIdx, setTabIdx] = useState<TabIdx>(tabIdxExtLocal)
  
  useStateSync(tabIdxExtLocal, tabIdx, setAvailableTabIdxExt, setTabIdx)
  
  
  const [tabsState, setTabsState] = useState<TabsState>('opened')
  const tabFrameRef = useRef<HTMLDivElement>(null)
  
  const tabsProps = useMemo<UseTabsStateRenderProps>(() => ({
    tabsState, setTabsState,
    tabIdx, setTabIdx,
    tabFrameRef,
  }), [tabsState, tabIdx])
  
  return props.children?.(tabsProps)
})
export default UseTabsState



export type UseTabsStateRenderProps = {
  tabsState: TabsState
  setTabsState: SetterOrUpdater<TabsState>
  tabIdx: TabIdx
  setTabIdx: SetterOrUpdater<TabIdx>
  tabFrameRef: React.RefObject<HTMLDivElement>
}