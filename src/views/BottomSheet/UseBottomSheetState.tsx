import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import {
  DefaultSheetOpenIdx, DefaultSheetSnaps,
  SheetSnapIdx,
  SheetSnapPoints,
  SheetState, UseBottomSheetOptions,
} from 'src/views/BottomSheet/useBottomSheet'
import Callback = TypeUtils.Callback
import PartialUndef = TypeUtils.PartialUndef




export type UseBottomSheetStateRenderProps = {
  setClosing: Callback
  sheetProps: UseBottomSheetOptions
}
export type UseBottomSheetStateProps = {
  open: boolean
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
    open,
    onClosed,
    defaultOpenIdx = DefaultSheetOpenIdx,
    snapPoints = DefaultSheetSnaps,
    closeable = true,
  } = props
  
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [snapIdx,setSnapIdx] = useState<SheetSnapIdx>(0)
  
  /* const setSheetState = useCallback(
    (sheetState: ValueOrMapper<SheetState>)=>{
      console.log('sheetState',sheetState)
      setSheetState_(sheetState)
    },
    []
  ) */
  
  const setClosing = useCallback(
    ()=>setSheetState('closing'),
    []
  )
  
  useEffect(
    ()=>{
      if (open){
        //console.log('set opening')
        setSheetState('opening')
        setSnapIdx(defaultOpenIdx)
      }
    },
    [open]
  )
  
  useEffect(
    ()=>{
      if (sheetState==='closed'){
        //console.log('onClosed')
        onClosed()
      }
    },
    [sheetState]
  )
  
  
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
  
  
  if (!open && closeable) return undefined
  return props.children({
    setClosing,
    sheetProps,
  })
})
export default UseBottomSheetState