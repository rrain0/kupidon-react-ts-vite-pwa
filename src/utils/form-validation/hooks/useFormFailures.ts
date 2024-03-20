import { useLayoutEffect, useState } from 'react'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { ValidationValidate } from 'src/utils/form-validation/ValidationValidate'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import validate = ValidationValidate.validate
import Validators = ValidationCore.Validators
import Values = ValidationCore.Values






export type UseFormFailuresProps
<Vs extends Values>
= {
  defaultValues: Vs
  validators: Validators<Vs>
}



export const useFormFailures =
<Vs extends Values>
(props: UseFormFailuresProps<Vs>)=>{
  const {
    defaultValues,
    validators,
  } = props
  
  
  const [values, setValues] = useState(defaultValues)
  const [prevValues, setPrevValues] = useState(defaultValues)
  const [failures, setFailures] = useState(()=>validate(
    { values: defaultValues, validators: validators }
  ))
  
  
  
  
  const updateFailuresEffectEvent = useEffectEvent(
    (values: Vs)=>{
      //console.log('I prevValues',prevValues)
      //console.log('II values',values)
      //console.log('III prevFailures',failures)
      const newFailures = validate({
        values,
        prevValues,
        prevFailures: failures,
        validators
      })
      //console.log('IV newFailures',newFailures)
      setFailures(newFailures)
      setPrevValues(values)
      // todo calculate some error props:
      //  changed fields
      //  if any value changed
      //  method to reset field
      //  method to resst whole form
    }
  )
  // Layout Effect is necessary because of Chrome's autofill on Android:
  // when browser pastes login/pwd, failure state does not have time to update
  useLayoutEffect(
    ()=>updateFailuresEffectEvent(values),
    [values]
  )
  
  
  
  
  const [failedFields, setFailedFields] = useState([] as (keyof Vs)[])
  // Layout Effect is necessary because of Chrome's autofill on Android:
  // when browser pastes login/pwd, failure state does not have time to update
  useLayoutEffect(
    ()=>{
      const failedFieldsSet = failures
        .filter(f=>f.type!=='server')
        .reduce(
          (accum,f)=>{
            f.errorFields.forEach(f=>accum.add(f))
            return accum
          },
          new Set<keyof Vs>()
        )
      const failedFields = [...failedFieldsSet]
      setFailedFields(failedFields)
    },
    [failures]
  )
  
  
  
  
  
  
  
  return {
    formValues: values,
    setFormValues: setValues,
    failures,
    setFailures,
    failedFields,
    
    validationProps: {
      values,
      setValues,
      failures,
      setFailures,
    },
  } as const
}

