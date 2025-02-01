import { ReactU } from '@util/react/ReactU.ts'
import { useBool } from '@util/react-state/useBool.ts'
import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import effectLog = ReactU.effectLog



export const useOverlayUrl = (overlayName: string) => {
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  
  // ...?overlay=dialog1&overlay=bottomSheet2&...
  const [isOpen, isLastOpen] = useMemo(() => {
    const overlays: string[] = search.getAll(AppRoutes.overlayParam)
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
      newSearch.append(AppRoutes.overlayParam, overlayName)
      setSearch(newSearch)
    }
  }, [isOpen, search, setSearch, overlayName])
  
  
  
  
  const [needToClose, setNeedToCloseTrue, setNeedToCloseFalse] = useBool(false)
  
  
  useEffect(() => {
    setNeedToCloseFalse()
    if (isLastOpen && needToClose) {
      // todo make GoBackRecoil
      navigate(-1)
    }
  }, [needToClose])
  
  return { isOpen, open, close: setNeedToCloseTrue }
}
