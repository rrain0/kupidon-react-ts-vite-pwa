import { useStateSync } from '@utils/react/state/useStateSync.ts'
import React, { useCallback, useMemo, useState } from 'react'

import {
  SheetSnapIdx,
  SheetSnapPoints, SheetSnapsHalfScreen,
  SheetState, UseBottomSheetOptions,
} from 'src/components/widgets/BottomSheet/useBottomSheet.ts'
import { Callback } from '@utils/base/typeUtils.ts'
import { Pu } from '@utils/base/typeUtils.ts'




export type UseBottomSheetStateProps = {
  isOpen: boolean
} & Pu<{
  onClose: Callback
  defaultOpenIdx: number
  snapPoints: SheetSnapPoints
  closeable: boolean
  children: (props: UseBottomSheetStateRenderProps) => React.ReactNode
}>



const UseBottomSheetState = React.memo((props: UseBottomSheetStateProps) => {
  const {
    isOpen: isOpenExternal,
    onClose,
    snapPoints = SheetSnapsHalfScreen.snapPoints,
    defaultOpenIdx = SheetSnapsHalfScreen.defaultOpenIdx,
    closeable = true,
  } = props
  
  const [sheetState, setSheetState] = useState<SheetState>(
    isOpenExternal ? 'opened' : 'closed'
  )
  const [snapIdx, setSnapIdx] = useState<SheetSnapIdx>(defaultOpenIdx)
  
  //console.log('isOpenExternal', isOpenExternal)
  //console.log('sheetState', sheetState)
  
  
  /* useEffect(() => {
    console.log('isOpenExternal', isOpenExternal)
  }, [isOpenExternal])
  
  useEffect(() => {
    console.log('sheetState', sheetState)
  }, [sheetState]) */
  
  
  const setOpenExternal = (open: boolean) => !open && onClose?.()
  const isOpen = !(['closed', 'closing', 'close', null] as SheetState[]).includes(sheetState)
  const setOpen = (open: boolean) => {
    if (open) {
      //console.log('setOpening')
      setSheetState('opening')
      setSnapIdx(defaultOpenIdx)
    }
    else {
      if (isOpen) {
        //console.log('setClosing')
        setSheetState('closing')
      }
    }
  }
  
  useStateSync(isOpenExternal, isOpen, setOpenExternal, setOpen)
  
  
  
  const setClosing = useCallback(() => {
    //console.log('setClosing')
    setSheetState('closing')
  }, [])
  
  
  const sheetProps = useMemo<UseBottomSheetOptions>(() => ({
    sheetState,
    setSheetState,
    snapIdx,
    setSnapIdx,
    
    snapPoints,
    closeable,
    defaultOpenIdx,
  }), [sheetState, snapIdx, snapPoints, closeable, defaultOpenIdx])
  
  
  if (sheetState === 'closed') return undefined
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
