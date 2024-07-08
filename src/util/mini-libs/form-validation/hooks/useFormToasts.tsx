import React, { useEffect, useMemo, useState } from 'react'
import { ErrorUiText } from 'src/ui-props/ui-values/ErrorUiText.ts'
import { ObjectU } from 'src/util/common/ObjectU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { ValidationActions } from 'src/util/mini-libs/form-validation/core/ValidationActions.ts'
import { ValidationCore } from 'src/util/mini-libs/form-validation/core/ValidationCore.ts'
import { UiTemplate, UiText, UiTextValues } from 'src/util/ui-text/UiText.ts'
import { ToastMsg, ToastMsgData, useToasts } from 'src/ui/components/Toasts/useToasts.tsx'
import Failure = ValidationCore.Failure
import Values = ValidationCore.Values
import awaitDelay = ValidationActions.awaitDelay
import Failures = ValidationCore.Failures
import updateFailures = ValidationActions.updateFailures
import Updater = TypeU.Updater
import ObjectMap = ObjectU.ObjectMap



export type UseFormToastsProps
<Vs extends Values>
= {
  isLoading?: boolean | undefined, 
  loadingText?: UiText | undefined,
  isSuccess?: boolean | undefined, 
  successText?: UiText | undefined,
  failures: Failures<Vs>,
  setFailures: Updater<Failures<Vs>>
  failureCodeToUiText?: UiTextValues | undefined,
}
export const useFormToasts =
<Vs extends Values>
(props: UseFormToastsProps<Vs>)=>{
  const {
    isLoading = false,
    loadingText,
    isSuccess = false,
    successText,
    failures,
    setFailures,
    failureCodeToUiText,
  } = props
  
  
  const [userFailure, setUserFailure] =
    useState(undefined as undefined|Failure<Vs>)
  const [serverFailure, setServerFailure] =
    useState(undefined as undefined|Failure<Vs>)
  
  
  useEffect(()=>{
    setUserFailure(undefined)
    setServerFailure(undefined)
    const stale: [boolean] = [false]
    
    const userFailures = failures
      .filter(f=>f.type!=='server' && f.notify)
    awaitDelay(userFailures, stale, setUserFailure)
    
    const serverFailures = failures
      .filter(f=>f.type==='server' && f.notify)
    awaitDelay(serverFailures, stale, setServerFailure)
    
    return ()=>{ stale[0]=true }
  },[failures])
  
  const userFailureMsg = useMemo(
    ()=>{
      if (userFailure) return new ToastMsgData({
        type: 'danger',
        msg: <ToastMsg
          uiOption={failureCodeToUiText?.[userFailure.code]}
          defaultText={userFailure.msg}
        />,
        closeOnUnmount: true,
        showCloseButton: true,
        dragToClose: true,
        onClose: ()=>{
          if (userFailure.notify) setFailures(s=>updateFailures(
            s,
            { failures: [userFailure] },
            { notify: false }
          ))
        }
      })
      return undefined
    },
    [failureCodeToUiText, userFailure]
  )
  const serverFailureMsg = useMemo(
    ()=>{
      if (serverFailure) return new ToastMsgData({
        type: 'danger',
        msg: <ToastMsg
          uiOption={function(){
            if (serverFailure.code==='unknown-error') {
              return ObjectMap<
                typeof ErrorUiText.unknownErrorTemplate,
                UiText<keyof typeof ErrorUiText.unknownErrorTemplate>
              >(
                ErrorUiText.unknownErrorTemplate,
                ([key, value])=>[key, value(JSON.stringify(serverFailure.extra.error))]
              )
            }
            return failureCodeToUiText?.[serverFailure.code]
          }()}
          defaultText={serverFailure.msg}
        />,
        closeOnUnmount: true,
        showCloseButton: true,
        dragToClose: true,
        onClose: ()=>{
          if (serverFailure.notify) setFailures(s=>updateFailures(
            s,
            { failures: [serverFailure] },
            { notify: false }
          ))
        }
      })
      return undefined
    },
    [failureCodeToUiText, serverFailure]
  )
  const loadingMsg = useMemo(
    ()=>new ToastMsgData({
      type: 'loading',
      msg: <ToastMsg uiOption={loadingText}/>,
      closeOnUnmount: true,
    }),
    [loadingText, isLoading]
  )
  const loginSuccessMsg = useMemo(
    ()=>new ToastMsgData({
      type: 'ok',
      msg: <ToastMsg uiOption={successText}/>,
      lifetime: 200,
      dragToClose: true,
    }),
    [successText, isSuccess]
  )
  
  
  useToasts({ toasts: [
    userFailureMsg,
    isLoading && loadingMsg,
    isSuccess && loginSuccessMsg,
    serverFailureMsg,
  ]})
  
  
}