import { useAsRefGet } from '@util/react-state/useAsRefGet.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import { useCallback, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'




// TODO Close overlay if go to another page from overlay
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
  
  
  const [getHasGoBack, setHasGoBack] = useRefGetSet(false)
  setHasGoBack(false)
  const [getClose] = useAsRefGet(() => {
    if (isLastOpen && !getHasGoBack()) {
      // todo make GoBackRecoil
      navigate(-1)
      setHasGoBack(true)
    }
  })
  
  const close = useCallback(() => getClose()(), [])
  
  
  return { isOpen, open, close }
}
