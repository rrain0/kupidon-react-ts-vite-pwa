import { Action } from '@remix-run/router'
import React, { useLayoutEffect } from 'react'
import { useBlocker } from 'react-router-dom'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import Callback = TypeUtils.Callback
import PartialUndef = TypeUtils.PartialUndef



// todo remove
export type UseBrowserBackProps = PartialUndef<{
  children: React.ReactNode
  onBack: Callback
}>
const UseBrowserBack =
React.memo(
(props: UseBrowserBackProps)=>{
  const { onBack, children } = props
  const blocker = useBlocker(
    transition => transition.historyAction===Action.Pop
  )
  
  useLayoutEffect(
    ()=>{
      if (blocker.state==='blocked'){
        blocker.reset()
        onBack?.()
      }
    },
    [blocker, onBack]
  )
  
  return children
})
export default UseBrowserBack