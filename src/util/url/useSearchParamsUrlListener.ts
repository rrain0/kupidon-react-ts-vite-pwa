import { useEffect } from 'react'
import { parseSearchParams } from 'src/util/url/SearchParamsU.ts'
import { useSearchParamsZustand } from 'src/zustand/url/SearchParamsZustand.ts'



export const useSearchParamsUrlListener = () => {
  
  useEffect(() => {
    const onPopstate = () => {
      const params = parseSearchParams(window.location.search)
      useSearchParamsZustand.setState(params, true)
    }
    window.addEventListener('popstate', onPopstate)
    return () => window.removeEventListener('popstate', onPopstate)
  }, [])
  
}


