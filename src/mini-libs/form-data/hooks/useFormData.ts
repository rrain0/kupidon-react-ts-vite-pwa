import { useLayoutEffect, useState } from 'react'
import { ValidationCore } from 'src/mini-libs/form-data/core/ValidationCore.ts'
import { ValidationValidate } from 'src/mini-libs/form-data/core/ValidationValidate.ts'
import validate = ValidationValidate.validate
import Validators = ValidationCore.Validators
import Values = ValidationCore.Values






export type UseFormDataProps<Vs extends Values> = {
  defaultValues: Vs
  validators: Validators<Vs>
}



export const useFormData = <Vs extends Values>({
  defaultValues,
  validators,
}: UseFormDataProps<Vs>) => {
  const [values, setValues] = useState(defaultValues)
  const [prevValues, setPrevValues] = useState(defaultValues)
  const [errors, setErrors] = useState(() => validate(
    { values: defaultValues, validators: validators }
  ))
  
  
  
  
  const updateFailuresEffectEvent = (values: Vs) => {
    //console.log('I prevValues',prevValues)
    //console.log('II values',values)
    //console.log('III prevFailures',errors)
    const newFailures = validate({
      values,
      prevValues,
      prevFailures: errors,
      validators,
    })
    //console.log('IV newFailures',newFailures)
    setErrors(newFailures)
    setPrevValues(values)
    // todo calculate some error props:
    //  changed fields
    //  if any value changed
    //  method to reset field
    //  method to resst whole form
  }
  // Layout Effect is necessary because of Chrome's autofill on Android:
  // when browser pastes login/pwd, failure state does not have time to update
  useLayoutEffect(() => updateFailuresEffectEvent(values), [values])
  
  
  
  
  const [errorFields, setErrorFields] = useState([] as (keyof Vs)[])
  // Layout Effect is necessary because of Chrome's autofill on Android:
  // when browser pastes login/pwd, failure state does not have time to update
  useLayoutEffect(() => {
    const errorFieldsSet = errors
      .filter(f => f.type !== 'server')
      .reduce(
        (accum, f) => {
          f.errorFields.forEach(f => accum.add(f))
          return accum
        },
        new Set<keyof Vs>()
      )
    const errorFields = [...errorFieldsSet]
    setErrorFields(errorFields)
  }, [errors])
  
  
  return {
    values,
    setValues,
    errors,
    setErrors,
    errorFields,
    
    formFieldWrapProps: {
      values,
      setValues,
      errors,
      setErrors,
    },
  }
}

