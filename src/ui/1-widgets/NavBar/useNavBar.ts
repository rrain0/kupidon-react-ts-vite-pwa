import { ArrayU } from '@util/common/ArrayU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useEffect, useId, useMemo, useState, useTransition } from 'react'
import { NavBarPlace } from 'src/ui/1-widgets/NavBar/NavBar.tsx'
import { navStack } from 'src/ui/1-widgets/NavBar/navStack.ts'
import { NavBarStore, useZustand } from 'src/zustand/ZustandStore.ts'
import Puro = TypeU.Puro



export type UseNavBarProps = Puro<{
  hide: boolean
  place: NavBarPlace
}>


export const useNavBar = (props?: UseNavBarProps) => {
  //const [isPending, startTransition] = useTransition()
  
  const setNavBar = useZustand(s => s.setNavBar)
  
  const navState = useMemo(() => {
    let navState: NavBarStore
    
    if (!props) navState = { show: false, place: undefined }
    else {
      const { hide, place } = props
      navState = { show: !hide, place }
    }
    
    navStack.push(navState)
    return navState
  }, [props?.hide, props?.place])
  
  
  useEffect(() => {
    setNavBar(navStack.at(-1))
    
    return () => {
      console.log('navStack before', [...navStack])
      ArrayU.remove(navStack, navState)
      console.log('navStack', [...navStack])
      setNavBar(navStack.at(-1))
    }
  }, [navState])
}


