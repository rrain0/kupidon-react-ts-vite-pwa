import { useLayoutEffect, useMemo, useState } from 'react'
import { ValidationCore } from 'src/mini-libs/form-data/core/ValidationCore.ts'
import { ValidationValidate } from 'src/mini-libs/form-data/core/ValidationValidate.ts'
import validate = ValidationValidate.validate
import Validators = ValidationCore.Validators
import Values = ValidationCore.Values




export type UseFormDataProps<Vs extends Values> = {
  initialValues: Vs
  validators: Validators<Vs>
}



export const useFormData = <Vs extends Values>({
  initialValues,
  validators,
}: UseFormDataProps<Vs>) => {
  const [values, setValues] = useState(initialValues)
  const [prevValues, setPrevValues] = useState(initialValues)
  const [errors, setErrors] = useState(() => validate({
    values: initialValues,
    validators: validators,
  }))
  
  
  const updateFailures = (values: Vs) => {
    const newFailures = validate({
      values,
      prevValues,
      prevFailures: errors,
      validators,
    })
    setErrors(newFailures)
    setPrevValues(values)
    // todo calculate some error props:
    //  1) changed fields
    //  2) if any value changed
    //  3) method to reset field
    //  4) method to reset whole form
  }
  
  // Layout Effect is necessary because of Chrome's autofill on Android:
  // when browser pastes login/pwd, failure state does not have time to update
  useLayoutEffect(() => updateFailures(values), [values])
  
  
  const getErrorFields = () => {
    const errorFieldsSet = errors
      .filter(f => f.type !== 'server')
      .reduce(
        (acc, f) => {
          f.errorFields.forEach(f => acc.add(f))
          return acc
        },
        new Set<keyof Vs>()
      )
    const errorFields = [...errorFieldsSet]
    return errorFields
  }
  
  const errorFields = useMemo<(keyof Vs)[]>(getErrorFields, [errors])
  
  
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

