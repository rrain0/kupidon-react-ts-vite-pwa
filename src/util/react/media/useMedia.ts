import { useLayoutEffect, useState } from 'react'


export const useMedia = (media: string) => {
  
  const [mediaQuery, setMediaQuery] = useState(()=>window.matchMedia(media))
  
  useLayoutEffect(()=>{
    setMediaQuery(window.matchMedia(media))
  },[media])
  
  const [matches, setMatches] = useState(mediaQuery.matches)
  
  useLayoutEffect(()=>{
    const onChange = ()=>setMatches(mediaQuery.matches)
    mediaQuery.onchange = onChange
    return ()=>{mediaQuery.onchange = null}
  },[mediaQuery])
  
  return matches
}


