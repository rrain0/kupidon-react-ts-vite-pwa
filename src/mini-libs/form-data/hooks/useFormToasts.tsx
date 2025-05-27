import React, { useEffect, useMemo, useState } from 'react'
import { ErrorUiText } from 'src/ui-data/translations/ErrorUiText.ts'
import { ObjectU } from '@util/common/ObjectU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { ValidationActions } from 'src/mini-libs/form-data/core/ValidationActions.ts'
import { ValidationCore } from 'src/mini-libs/form-data/core/ValidationCore.ts'
import { UiText, UiTextValues } from 'src/mini-libs/ui-text/UiText.ts'
import { ToastMsg, ToastMsgData, useToasts } from 'src/ui/components/Toasts/useToasts.tsx'
import Failure = ValidationCore.Failure
import Values = ValidationCore.Values
import awaitDelay = ValidationActions.awaitDelay
import Failures = ValidationCore.Failures
import updateFailures = ValidationActions.updateErrors
import Updater = TypeU.Updater
import ObjectMap = ObjectU.ObjectMap




export type UseFormToastsProps<Vs extends Values> = {
  isLoading?: boolean | undefined, 
  loadingText?: UiText | undefined,
  isSuccess?: boolean | undefined, 
  successText?: UiText | undefined,
  errors: Failures<Vs>,
  setErrors: Updater<Failures<Vs>>
  errorCodeToUiText?: UiTextValues | undefined,
}
export const useFormToasts = <Vs extends Values>(
  props: UseFormToastsProps<Vs>
) => {
  const {
    isLoading = false,
    loadingText,
    isSuccess = false,
    successText,
    errors,
    setErrors,
    errorCodeToUiText,
  } = props
  
  
  const [userFailure, setUserFailure] = useState<Failure<Vs> | undefined>(undefined)
  const [serverFailure, setServerFailure] = useState<Failure<Vs> | undefined>(undefined)
  
  
  useEffect(() => {
    setUserFailure(undefined)
    setServerFailure(undefined)
    const stale = { v: false }
    
    const userFailures = errors.filter(f => f.type!=='server' && f.notify)
    awaitDelay(userFailures, stale, setUserFailure)
    
    const serverFailures = errors.filter(f => f.type === 'server' && f.notify)
    awaitDelay(serverFailures, stale, setServerFailure)
    
    return () => { stale.v = true }
  }, [errors])
  
  const userFailureMsg = useMemo(() => {
    if (userFailure) return new ToastMsgData({
      type: 'danger',
      msg: (
        <ToastMsg
          uiOption={errorCodeToUiText?.[userFailure.code]}
          defaultText={userFailure.msg}
        />
      ),
      closeOnUnmount: true,
      showCloseButton: true,
      dragToClose: true,
      onClose: () => {
        if (userFailure.notify) setErrors(s => updateFailures(
          s,
          { errors: [userFailure] },
          { notify: false }
        ))
      },
    })
    return undefined
  }, [errorCodeToUiText, userFailure])
  
  const serverFailureMsg = useMemo(() => {
    if (serverFailure) return new ToastMsgData({
      type: 'danger',
      msg: (
        <ToastMsg
          uiOption={function() {
            if (serverFailure.code === 'unknownError') {
              return ObjectMap<
                typeof ErrorUiText.unknownErrorTemplate,
                UiText<keyof typeof ErrorUiText.unknownErrorTemplate>
              >(
                ErrorUiText.unknownErrorTemplate,
                ([key, value]) => [
                  key,
                  value(JSON.stringify(serverFailure.extra.error)),
                ]
              )
            }
            return errorCodeToUiText?.[serverFailure.code]
          }()}
          defaultText={serverFailure.msg}
        />
      ),
      closeOnUnmount: true,
      showCloseButton: true,
      dragToClose: true,
      onClose: () => {
        if (serverFailure.notify) setErrors(s => updateFailures(
          s,
          { errors: [serverFailure] },
          { notify: false }
        ))
      },
    })
    return undefined
  }, [errorCodeToUiText, serverFailure])
  
  const loadingMsg = useMemo(() => new ToastMsgData({
    type: 'loading',
    msg: <ToastMsg uiOption={loadingText}/>,
    closeOnUnmount: true,
  }), [loadingText, isLoading])
  
  const loginSuccessMsg = useMemo(() => new ToastMsgData({
    type: 'ok',
    msg: <ToastMsg uiOption={successText}/>,
    lifetime: 200,
    dragToClose: true,
  }), [successText, isSuccess])
  
  
  useToasts({
    toasts: [
      userFailureMsg,
      isLoading && loadingMsg,
      isSuccess && loginSuccessMsg,
      serverFailureMsg,
    ],
  })
}