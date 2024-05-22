import { useStateSync } from '@util/react/useStateSync.ts'
import React, { useCallback, useMemo, useState } from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import {
  DefaultSheetOpenIdx, DefaultSheetSnaps,
  SheetSnapIdx,
  SheetSnapPoints,
  SheetState, UseBottomSheetOptions,
} from 'src/ui/elements/BottomSheet/useBottomSheet.ts'
import Callback = TypeUtils.Callback
import PartialUndef = TypeUtils.PartialUndef




export type UseBottomSheetStateProps = {
  isOpen: boolean
} & PartialUndef<{
  close: Callback
  defaultOpenIdx: number
  snapPoints: SheetSnapPoints
  closeable: boolean
  children: (props: UseBottomSheetStateRenderProps)=>React.ReactNode
}>



const UseBottomSheetState =
React.memo(
(props: UseBottomSheetStateProps)=>{
  const {
    isOpen: isOpenExternal,
    close,
    defaultOpenIdx = DefaultSheetOpenIdx,
    snapPoints = DefaultSheetSnaps,
    closeable = true,
  } = props
  
  
  const [sheetState, setSheetState] = useState<SheetState>(
    isOpenExternal ? 'opened' : 'closed'
  )
  const [snapIdx, setSnapIdx] = useState<SheetSnapIdx>(defaultOpenIdx)
  
  
  
  /* useEffect(() => {
    console.log('isOpenExternal', isOpenExternal)
  }, [isOpenExternal])
  
  useEffect(() => {
    console.log('sheetState', sheetState)
  }, [sheetState]) */
  
  
  const setOpenExternal = (isOpen: boolean) => isOpen ? undefined : close?.()
  const isOpen = !(['closed','closing','close',null] as SheetState[]).includes(sheetState)
  const setOpen = (isOpen: boolean)=>{
    if (isOpen) {
      //console.log('setOpening')
      setSheetState('opening')
      setSnapIdx(defaultOpenIdx)
    }
    else {
      //console.log('setClosing')
      setSheetState('closing')
    }
  }
  
  useStateSync(isOpenExternal, setOpenExternal, isOpen, setOpen)
  
  
  
  const setClosing = useCallback(()=>{
    //console.log('setClosing')
    setSheetState('closing')
  }, [])
  
  
  const sheetProps = useMemo<UseBottomSheetOptions>(
    ()=>({
      sheetState,
      setSheetState,
      snapIdx,
      setSnapIdx,
      
      snapPoints,
      closeable,
      defaultOpenIdx,
    }),
    [sheetState, snapIdx, snapPoints, closeable, defaultOpenIdx]
  )
  
  
  if (sheetState==='closed') return undefined
  return props.children?.({
    setClosing,
    sheetProps,
  })
})
export default UseBottomSheetState


export type UseBottomSheetStateRenderProps = {
  setClosing: Callback
  sheetProps: UseBottomSheetOptions
}