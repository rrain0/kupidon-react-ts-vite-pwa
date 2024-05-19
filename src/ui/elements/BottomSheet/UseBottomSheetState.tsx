import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
    isOpen,
    onClosed,
    defaultOpenIdx = DefaultSheetOpenIdx,
    snapPoints = DefaultSheetSnaps,
    closeable = true,
  } = props
  
  
  /* useEffect(() => {
    console.log('isOpen', isOpen)
  }, [isOpen]) */
  
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [snapIdx, setSnapIdx] = useState<SheetSnapIdx>(defaultOpenIdx)
  
  
  /* const setSheetState = (s: SheetState)=>{
    console.log('s setSheetState',s)
    try {
      if (s==='closed') throw new Error('s===closed')
    }
    // @ts-ignore
    catch(ex: Error){
      console.log('stack:', ex.stack)
    }
    setSheetState_(s)
  } */
  
  
  const outerTriggered = useRef(false)
  
  useEffect(() => {
    outerTriggered.current = true
    if (isOpen && !(['opened','open','opening',null] as SheetState[]).includes(sheetState)){
      //console.log('opening!!!')
      //console.log('set opening')
      setSheetState('opening')
      //setSheetState('opened')
      setSnapIdx(defaultOpenIdx)
    }
    else if (!isOpen && !(['closed','closing','close',null] as SheetState[]).includes(sheetState)){
      console.log('closing!!!')
      setSheetState('closing')
      //setSheetState('closed')
    }
    
  }, [isOpen])
  
  useEffect(
    ()=>{
      //if (isFirstRender) return
      if (sheetState==='closed' && isOpen && !outerTriggered.current){
        //console.log('onSheetClosed!!!')
        onClosed()
      }
    },
    [sheetState]
  )
  
  useEffect(() => {
    outerTriggered.current = false
  }, [isOpen])
  
  
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