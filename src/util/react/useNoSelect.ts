import { useEffect } from 'react'
import commonCss from 'src/ui-props/styles/common.module.scss'




export const useNoSelect = (lock: boolean|undefined = false)=>{
  useEffect(
    ()=>{
      const root = document.documentElement // get html
      if (lock){
        root.classList.add(commonCss.noSelect)
        return ()=>{
          root.classList.remove(commonCss.noSelect)
        }
      }
    },
    [lock]
  )
}