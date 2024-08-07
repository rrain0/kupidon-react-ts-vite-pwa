import { useCallback, useMemo } from 'react'
import { ObjectU } from 'src/util/common/ObjectU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { ValidationCore } from 'src/mini-libs/form-validation/core/ValidationCore.ts'
import Values = ValidationCore.Values
import ObjectMap = ObjectU.ObjectMap
import Failures = ValidationCore.Failures
import ObjectKeys = ObjectU.ObjectKeys
import Callback = TypeU.Callback
import SetterOrUpdater = TypeU.SetterOrUpdater




export type FormValueProps = {
  isInitial: boolean
  isDefault: boolean
  isInitialOrDefault: boolean
}
export type FormProps = {
  hasChanges: boolean
  resetUserFields: Callback
}



export const useFormValuesProps =
<Vs extends Values, DVs extends Values>
(
  formValues: Vs,
  setFormValues: SetterOrUpdater<Vs>,
  userDefaultValues: DVs,
  failures: Failures<Vs>
)=>{
  
  
  const valuesProps = useMemo(
    ()=>{
      const valuesProps = ObjectMap<Vs, Record<keyof Vs, FormValueProps>>(formValues,
        ([k,v])=>[k,{
          isInitial: false,
          isDefault: false,
          isInitialOrDefault: false,
        }]
      )
      failures.forEach(f=>{
        f.errorFields.forEach(field=>{
          if (f.type==='initial'){
            valuesProps[field].isInitial = true
            valuesProps[field].isInitialOrDefault = true
          }
          else if (f.type==='default'){
            valuesProps[field].isDefault = true
            valuesProps[field].isInitialOrDefault = true
          }
        })
      })
      return valuesProps
    },
    [failures, formValues]
  )
  
  
  const resetUserFields = useCallback(
    ()=>setFormValues(s=>{
      if ('initialValues' in s){
        const initial = s.initialValues as typeof userDefaultValues
        return { ...s, ...initial }
      }
      return s
    }),
    []
  )
  
  
  const formProps = useMemo(
    ()=>{
      const formProps: FormProps = {
        hasChanges: false,
        resetUserFields,
      }
      ObjectKeys(userDefaultValues).forEach(k=>{
        if (!valuesProps[k].isInitial) formProps.hasChanges = true
      })
      return formProps
    },
    [valuesProps, userDefaultValues, resetUserFields]
  )
  
  
  return { formProps, valuesProps } as const
}