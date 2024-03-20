import { useId, useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import { AppRecoil } from 'src/recoil/state/AppRecoil'




export const useLockAppGestures = (lock = false)=>{
  const [{ isUsingGestures }, setAppRecoil] = useRecoilState(AppRecoil)
  const reactId = useId()
  
  
  useLayoutEffect(
    ()=>{
      if (lock && isUsingGestures===false){
        setAppRecoil(s=>({...s, isUsingGestures: reactId}))
      }
      if (!lock && isUsingGestures===reactId){
        setAppRecoil(s=>({...s, isUsingGestures: false}))
      }
    },
    [lock]
  )
  
  /* useLayoutEffect(
    ()=>{
      console.log({ isUsingGestures })
    },
    [isUsingGestures]
  ) */
  
  // is busy by other component
  return isUsingGestures!==false && isUsingGestures!==reactId
}