import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { useBool } from 'src/util/react/useBool.ts'




export const useOverlay = (overlayName: string) => {
  
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  
  const [isOpen, isLastOpen] = useMemo(
    // ...?overlay=dialog1&overlay=bottomSheet2&...
    ()=>{
      const overlays = search.getAll(AppRoutes.overlayParam)
      return [
        overlays.includes(overlayName),
        !!(overlays.length && overlays.at(-1)===overlayName),
      ] as const
    },
    [search, overlayName]
  )
  
  const open = useCallback(()=>{
    //console.log('isOpen',isOpen)
    if (!isOpen) {
      //console.log('opening... (changing search params to calculate isOpen is true)')
      const newSearch = new URLSearchParams(search)
      newSearch.append(AppRoutes.overlayParam, overlayName)
      setSearch(newSearch)
    }
  }, [isOpen, search, overlayName])
  
  
  const [closing, close, closed] = useBool(false)
  
  useEffect(()=>{
    closed()
    if (isLastOpen && closing) {
      navigate(-1)
    }
  }, [closing])
  
  
  //console.log('search', [...search])
  //console.log('search.getAll(\'overlay\')', search.getAll('overlay'))
  
  
  return [isOpen, open, close] as const
}


