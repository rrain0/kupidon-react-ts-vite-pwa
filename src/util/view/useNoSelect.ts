import { useEffect } from 'react'
import commonCss from 'src/ui-data/style/common.module.scss'




export const useNoSelect = (noSelect: boolean = false) => {
  useEffect(() => {
    const root = document.documentElement // get html
    if (noSelect) {
      root.classList.add(commonCss.noSelect)
      return () => {
        root.classList.remove(commonCss.noSelect)
      }
    }
  }, [noSelect])
}
