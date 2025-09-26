import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { ResponseData } from '@libs/api/useFormApiRequest.ts'

import { ValidationActions } from '@libs/form-data/core/ValidationActions.ts'
import { ValidationCore } from '@libs/form-data/core/ValidationCore.ts'
import updateFailures = ValidationActions.updateErrors
import Values = ValidationCore.Values
import FailureType = ValidationCore.FailureType
import Failures = ValidationCore.Failures
import { SetterOrUpdater } from 'src/utils/base/tsUtils.ts'






export type UseFormSubmitProps<Vs extends Values> = {
  errors: Failures<Vs>
  setErrors: SetterOrUpdater<Failures<Vs>>
  errorFields: (keyof Vs)[]
  setValues: SetterOrUpdater<Vs>
  getCanSubmit: (errorFields: (keyof Vs)[]) => boolean
  request: () => void
  isLoading: boolean
  isError: boolean
  response: ResponseData<Vs, any, any> | undefined
  resetResponse: () => void
}
export const useFormSubmit = <Vs extends Values>({
  errors,
  setErrors,
  errorFields,
  setValues,
  getCanSubmit,
  request,
  isLoading,
  isError,
  response,
  resetResponse,
}: UseFormSubmitProps<Vs>) => {
  const [canSubmit, setCanSubmit] = useState(false)
  // Layout Effect is necessary because of Chrome's autofill on Android:
  // when browser pastes login/pwd, failure state does not have time to update
  useLayoutEffect(() => {
    setCanSubmit(getCanSubmit(errorFields))
  }, [errorFields, getCanSubmit])
  
  
  
  const [doSubmit, setDoSubmit] = useState(false)
  const onSubmit = useCallback((ev: React.FormEvent) => {
    ev.preventDefault()
    setDoSubmit(true)
  }, [])
  const submit = useCallback(() => setDoSubmit(true), [])
  
  
  const trySubmit = useCallback(() => {
    if (isLoading) return
    
    resetResponse()
    
    const serverErrors = errors.filter(f => f.type === 'server' && (f.highlight || f.notify))
    if (serverErrors.length) setErrors(s => updateFailures(
      s,
      { errors: serverErrors },
      { highlight: false, notify: false }
    ))
    
    const failsToShow = errors
      .filter(f => (['default', 'normal'] as FailureType[]).includes(f.type))
      .filter(f => !f.highlight || !f.notify || f.isDelayed)
    setErrors(s => updateFailures(
      s,
      { errors: failsToShow },
      { highlight: true, notify: true, delay: 0 }
    ))
    
    if (!canSubmit) return
    
    request()
  }, [isLoading, resetResponse, errors, setErrors, canSubmit, request])
  
  useEffect(() => {
    if (doSubmit) {
      setDoSubmit(false)
      trySubmit()
    }
  }, [doSubmit, trySubmit])
  
  
  
  
  
  
  
  useEffect(() => {
    if (isError && response && !response.isSuccess) {
      resetResponse()
      setValues(vs => ({
        ...vs,
        fromServer: {
          values: response.usedValues,
          error: {
            code: response.error.code,
            msg: response.error.msg,
            extra: response.error.extra,
          },
        },
      }))
    }
  }, [response, resetResponse, setValues, isError])
  
  
  
  
  
  return {
    canSubmit,
    errorFields,
    onSubmit,
    submit,
  }
}
