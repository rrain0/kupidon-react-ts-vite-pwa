import { useCallback, useMemo } from 'react'
import { objectMap, objectKeys } from 'src/utils/base/ObjectU.ts'
import { ValidationCore } from '@libs/form-data/core/ValidationCore.ts'
import Values = ValidationCore.Values
import Failures = ValidationCore.Failures
import { Cb } from 'src/utils/base/typeUtils.ts'
import { SetterOrUpdater } from 'src/utils/base/typeUtils.ts'




export type FormValueProps = {
  isInitial: boolean
  isDefault: boolean
  isInitialOrDefault: boolean
}
export type FormProps = {
  hasChanges: boolean
  resetUserFields: Cb
}



export const useFormDerivedData = <
  Vs extends Values,
  DVs extends Values,
>(
  values: Vs,
  setValues: SetterOrUpdater<Vs>,
  userDefaultValues: DVs,
  errors: Failures<Vs>
) => {
  
  
  const valuesProps = useMemo(() => {
    const valuesProps = objectMap<Vs, Record<keyof Vs, FormValueProps>>(
      values,
      ([k, v]) => [k, {
        isInitial: false,
        isDefault: false,
        isInitialOrDefault: false,
      }]
    )
    errors.forEach(f => {
      f.errorFields.forEach(field => {
        if (f.type === 'initial') {
          valuesProps[field].isInitial = true
          valuesProps[field].isInitialOrDefault = true
        }
        else if (f.type === 'default') {
          valuesProps[field].isDefault = true
          valuesProps[field].isInitialOrDefault = true
        }
      })
    })
    return valuesProps
  }, [errors, values])
  
  
  const resetUserFields = useCallback(() => setValues(s => {
    if ('initialValues' in s) {
      const initial = s.initialValues as typeof userDefaultValues
      return { ...s, ...initial }
    }
    return s
  }), [])
  
  
  const formProps = useMemo(() => {
    const formProps: FormProps = {
      hasChanges: false,
      resetUserFields,
    }
    objectKeys(userDefaultValues).forEach(k => {
      if (!valuesProps[k].isInitial) formProps.hasChanges = true
    })
    return formProps
  }, [valuesProps, userDefaultValues, resetUserFields])
  
  
  return { formProps, valuesProps }
}