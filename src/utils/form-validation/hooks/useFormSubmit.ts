import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { ResponseData } from 'src/api/useApiRequest'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { ValidationActions } from 'src/utils/form-validation/ValidationActions'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import updateFailures = ValidationActions.updateFailures
import Values = ValidationCore.Values
import FailureType = ValidationCore.FailureType
import Failures = ValidationCore.Failures
import SetterOrUpdater = TypeUtils.SetterOrUpdater






export type UseFormSubmitProps
<Vs extends Values>
= {
  failures: Failures<Vs>
  setFailures: SetterOrUpdater<Failures<Vs>>
  failedFields: (keyof Vs)[]
  setFormValues: SetterOrUpdater<Vs>
  getCanSubmit: (failedFields: (keyof Vs)[])=>boolean
  request: ()=>void
  isLoading: boolean
  isError: boolean
  response: ResponseData<Vs,any,any> | undefined
  resetResponse: ()=>void
}
export const useFormSubmit =
<Vs extends Values>
(props: UseFormSubmitProps<Vs>)=>{
  const {
    failures,
    setFailures,
    failedFields,
    setFormValues,
    getCanSubmit,
    request,
    isLoading,
    isError,
    response,
    resetResponse,
  } = props
  
  
  
  
  
  
  const [canSubmit, setCanSubmit] = useState(false)
  // Layout Effect is necessary because of Chrome's autofill on Android:
  // when browser pastes login/pwd, failure state does not have time to update
  useLayoutEffect(
    ()=>{
      setCanSubmit(getCanSubmit(failedFields))
    },
    [failedFields, getCanSubmit]
  )
  
  
  
  const [doSubmit, setDoSubmit] = useState(false)
  const onFormSubmitCallback = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault()
      setDoSubmit(true)
    },
    []
  )
  const submit = useCallback(
    ()=>setDoSubmit(true),
    []
  )
  
  
  const trySubmit = useCallback(
    ()=>{
      if (isLoading) return
      
      resetResponse()
      
      const serverFailures = failures
        .filter(f=>f.type==='server' && (f.highlight || f.notify))
      if (serverFailures.length) setFailures(s=>updateFailures(
        s,
        { failures: serverFailures },
        { highlight: false, notify: false }
      ))
      
      const failsToShow = failures
        .filter(f=>(['default','normal'] as FailureType[]).includes(f.type))
        .filter(f=>!f.highlight || !f.notify || f.isDelayed)
      setFailures(s=>updateFailures(
        s,
        { failures: failsToShow },
        { highlight: true, notify: true, delay: 0 }
      ))
      
      if (!canSubmit) return
      
      request()
    },
    [isLoading, resetResponse, failures, setFailures, canSubmit, request]
  )
  
  useEffect(
    ()=>{
      if (doSubmit){
        setDoSubmit(false)
        trySubmit()
      }
    },
    [doSubmit, trySubmit]
  )
  
  
  
  
  
  
  
  useEffect(
    ()=>{
      if (isError && response && !response.isSuccess){
        resetResponse()
        setFormValues(vs=>({
          ...vs,
          fromServer: {
            values: response.usedValues,
            error: {
              code: response.error.code,
              msg: response.error.msg,
              extra: response.error.extra,
            }
          }
        }))
      }
    },
    [response, resetResponse, setFormValues, isError]
  )
  
  
  
  
  
  return {
    canSubmit,
    failedFields,
    onFormSubmitCallback,
    submit,
  } as const
}
