import { useBool } from '@util/react/useBool.ts'
import { useBoolStateSync } from '@util/react/useBoolStateSync.ts'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import Setter = TypeUtils.Setter





export type UseOverlayProps = {
  overlayName: string
  isOpen: boolean
  setIsOpen: Setter<boolean>
}
const UseOverlay =
React.memo(
(props: UseOverlayProps)=>{
  const {
    overlayName,
    isOpen: isOpenExternal,
    setIsOpen: setIsOpenExternal,
  } = props
  
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
    //console.log('doOpen')
    if (!isOpen) {
      //console.log('opening... (changing search params to calculate isOpen is true)')
      const newSearch = new URLSearchParams(search)
      newSearch.append(AppRoutes.overlayParam, overlayName)
      setSearch(newSearch)
    }
  }, [isOpen, search, overlayName])
  
  
  
  
  const [needToClose, setNeedToCloseTrue, setNeedToCloseFalse] = useBool(false)
  
  const setIsOpen = useCallback((isOpen: boolean)=>{
    isOpen ? open() : setNeedToCloseTrue()
  },[open, needToClose])
  
  useBoolStateSync(isOpen, setIsOpen, isOpenExternal, setIsOpenExternal)
  
  
  
  
  useEffect(() => {
    setNeedToCloseFalse()
    if (isLastOpen && needToClose) {
      // todo make GoBackRecoil
      navigate(-1)
    }
  }, [needToClose])
  
  
  
  
  return undefined
})
export default UseOverlay