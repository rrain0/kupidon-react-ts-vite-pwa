import { ArrayU } from '@utils/base/ArrayU.ts'

import { useEffect, useId, useMemo, useState, useTransition } from 'react'
import { NavBarPlace } from 'src/components/widgets/NavBar/NavBar.tsx'
import { navStack } from 'src/components/widgets/NavBar/navStack.ts'
import { NavBarStore, useNavBarZustand } from 'src/zustand/app/navBarZustand.ts'
import { Pu } from '@utils/base/typeUtils.ts'



export type UseNavBarProps = Pu<{
  hide: boolean
  place: NavBarPlace
}>


export const useNavBar = (props?: UseNavBarProps) => {
  //const [isPending, startTransition] = useTransition()
  
  const setNavBar = useNavBarZustand(s => s.setNavBar)
  
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


