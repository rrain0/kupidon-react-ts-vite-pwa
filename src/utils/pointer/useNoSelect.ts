import { useCallback, useEffect, useId, useMemo } from 'react'
import commonCss from 'src/ui-data/style/common.module.scss'
import { TypeU } from 'src/utils/common/TypeU.ts'
import isdef = TypeU.isdef




const locks: Set<string> = new Set()


export const useNoSelect = (noSelect?: boolean) => {
  const reactId = useId()
  
  const lock = useCallback(() => {
    const sizeBefore = locks.size
    locks.add(reactId)
    const sizeAfter = locks.size
    if (sizeBefore === 0 && sizeAfter === 1) {
      // add class to html element
      document.documentElement.classList.add(commonCss.noSelect)
    }
  }, [])
  const unlock = useCallback(() => {
    const sizeBefore = locks.size
    locks.delete(reactId)
    const sizeAfter = locks.size
    if (sizeBefore === 1 && sizeAfter === 0) {
      // add class to html element
      document.documentElement.classList.remove(commonCss.noSelect)
    }
  }, [])
  const setLock = useCallback((noSelect = false) => {
    noSelect ? lock() : unlock()
  }, [])
  
  // Instant effect
  useMemo(() => {
    if (isdef(noSelect)) setLock(noSelect)
  }, [noSelect])
  
  useEffect(unlock, [])
  
  return {
    allowToSelect: unlock,
    forbidToSelect: lock,
    setNoSelect: setLock,
  }
}
