import { useBoolStateSync } from '@util/react/useBoolStateSync.ts'
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




export type UseBottomSheetStateRenderProps = {
  setClosing: Callback
  sheetProps: UseBottomSheetOptions
}
export type UseBottomSheetStateProps = {
  isOpen: boolean
  onClosed: Callback
  children: (props: UseBottomSheetStateRenderProps)=>React.ReactNode
} & PartialUndef<{
  defaultOpenIdx: number
  snapPoints: SheetSnapPoints
  closeable: boolean
}>



const UseBottomSheetState =
React.memo(
(props: UseBottomSheetStateProps)=>{
  const {
    isOpen: isOpenExternal,
    onClosed,
    defaultOpenIdx = DefaultSheetOpenIdx,
    snapPoints = DefaultSheetSnaps,
    closeable = true,
  } = props
  
  
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [snapIdx, setSnapIdx] = useState<SheetSnapIdx>(defaultOpenIdx)
  
  
  
  const setOpenExternal = (isOpen: boolean) => isOpen ? undefined : onClosed()
  const isOpen = !(['closed','closing','close',null] as SheetState[]).includes(sheetState)
  const setOpen = (isOpen: boolean)=>{
    if (isOpen) {
      setSheetState('opening')
      setSnapIdx(defaultOpenIdx)
    }
    else {
      setSheetState('closing')
    }
  }
  
  useBoolStateSync(isOpenExternal, setOpenExternal, isOpen, setOpen)
  
  
  
  const setClosing = useCallback(()=>{
    console.log('setClosing')
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
  return props.children({
    setClosing,
    sheetProps,
  })
})
export default UseBottomSheetState