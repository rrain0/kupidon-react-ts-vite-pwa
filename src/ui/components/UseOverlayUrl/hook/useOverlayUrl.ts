import { TypeU } from '@util/common/TypeU.ts'
import { useBool } from '@util/react-state/useBool.ts'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import Callback = TypeU.Callback




export const useOverlayUrl = (overlayName: string) => {
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  
  // ...?overlay=dialog1&overlay=bottomSheet2&...
  const [isOpen, isOpenLast] = useMemo(() => {
    const overlays: string[] = search.getAll(AppRoutes.overlayParamName)
    return [
      overlays.includes(overlayName),
      !!(overlays.length && overlays.at(-1) === overlayName),
    ] as const
  }, [search, overlayName])
  
  const open = useCallback(() => {
    //console.log('doOpen')
    if (!isOpen) {
      //console.log('opening... (changing search params to calculate isOpen is true)')
      const newSearch = new URLSearchParams(search)
      newSearch.append(AppRoutes.overlayParamName, overlayName)
      setSearch(newSearch)
    }
  }, [isOpen, search, setSearch, overlayName])
  
  
  
  
  const [needClose, enableClose, disableClose] = useBool(false)
  
  useEffect(() => {
    disableClose()
    if (isOpenLast && needClose) {
      // todo make GoBackRecoil
      navigate(-1)
    }
  }, [needClose])
  
  
  
  const [closeAction, setCloseAction] = useState<undefined | Callback>(undefined)
  
  useEffect(() => {
    if (!isOpen && closeAction) {
      closeAction()
      setCloseAction(undefined)
    }
  }, [isOpen])
  
  
  const close = useCallback(() => {
    enableClose()
  }, [])
  
  const closeWithAction = useCallback((action?: Callback) => {
    enableClose()
    setCloseAction(() => action)
  }, [])
  
  return { isOpen, open, close, closeWithAction } as const
}
