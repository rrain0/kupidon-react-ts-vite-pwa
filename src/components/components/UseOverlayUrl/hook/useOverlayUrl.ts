
import { useBool } from '@utils/react/state/useBool.ts'
import { useSearchParamValue } from '@utils/url/useSearchParamValue.ts'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { Callback } from '@utils/base/TypeUtils.ts'




export const useOverlayUrl = (overlayName: string) => {
  const [paramData, setParam] = useSearchParamValue(overlayName)
  
  const isOpen = !paramData.noParam
  
  /* if (overlayName === 'chatItemsContextMenu') {
    console.log('paramData', paramData)
    console.log('isOpen', isOpen)
  } */
  
  const open = useCallback(() => {
    setParam({ noValue: true })
  }, [])
  const close = useCallback(() => {
    setParam({ noParam: true, back: true })
  }, [])
  
  const [closeAction, setCloseAction] = useState<undefined | Callback>(undefined)
  const closeWithAction = useCallback((action?: Callback) => {
    close()
    setCloseAction(() => action)
  }, [])
  useEffect(() => {
    if (!isOpen && closeAction) {
      closeAction()
      setCloseAction(undefined)
    }
  }, [isOpen])
  
  return { isOpen, open, close, closeWithAction } as const
}



// TODO maybe remove
export const _useOverlayUrl = (overlayName: string) => {
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
      // TODO Route - predefine previous page for each current and go back there
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
