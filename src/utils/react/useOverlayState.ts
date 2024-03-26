import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'




export const useOverlayState = (overlayName: string) => {
  
  const [search, setSearch] = useSearchParams()
  
  const isOpen = useMemo(
    ()=>search.getAll(AppRoutes.overlayParam).includes(overlayName),
    [search, overlayName]
  )
  
  const open = useCallback(()=>{
    if (!isOpen) {
      const newSearch = new URLSearchParams(search)
      newSearch.append(AppRoutes.overlayParam, overlayName)
      setSearch(newSearch)
    }
  }, [isOpen, search, overlayName])
  
  const close = useCallback(()=>{
    if (isOpen) history.back()
  }, [isOpen])
  
  
  //console.log('search', [...search])
  //console.log('search.getAll(\'overlay\')', search.getAll('overlay'))
  
  
  return [isOpen, open, close] as const
}


