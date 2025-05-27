import { useAsRefGet } from '@util/react-state/useAsRefGet.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { ValidationCore } from 'src/mini-libs/form-data/core/ValidationCore.ts'
import React, {
  JSX,
  ReactElement,
  useCallback,
  useEffect, useMemo,
  useState,
} from 'react'
import Input from 'src/ui/0-elements/inputs/Input/Input.tsx'
import { ValidationActions } from 'src/mini-libs/form-data/core/ValidationActions.ts'
import Failures = ValidationCore.Failures
import updateFailures = ValidationActions.updateErrors
import awaitDelay = ValidationActions.awaitDelay
import Values = ValidationCore.Values
import SetterOrUpdater = TypeU.SetterOrUpdater
import ValueOrUpdater = TypeU.ValueOrMapper
import Callback = TypeU.Callback
import Callback1 = TypeU.Callback1
import Mapper = TypeU.Mapper





export type FormFieldWrapRenderProps<V> = {
  value: V
  highlight: boolean
  setValue: SetterOrUpdater<V>
  onBlur: Callback
  getChecked: Mapper<V, boolean>
  inputProps: {
    value: V
    onChange: Callback1<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
    onBlur: Callback
  }
  radioInputProps: (value: V) => ({
    checked: boolean,
    onChange: Callback1<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>,
  })
}
  
export type FormFieldWrapProps<
  Vs extends Values, F extends keyof Vs
> = {
  values: Vs
  fieldName: F
  errors: Failures<Vs>
  setErrors: SetterOrUpdater<Failures<Vs>>
  setValues: SetterOrUpdater<Vs>
  children?: (props: FormFieldWrapRenderProps<Vs[F]>) => React.ReactNode
}



const FormFieldWrap = ReactU.memo(<Vs extends Values, F extends keyof Vs>(
  props: FormFieldWrapProps<Vs, F>
) => {
  const {
    fieldName,
    values,
    errors,
    setErrors,
    setValues,
    children,
  } = props
  
  
  const value = values[fieldName]
  
  
  const [highlight, setHighlight] = useState(false)
  useEffect(() => {
    setHighlight(false)
    const stale = { v: false }
    
    const fs = errors
      .filter(f => f.highlight && f.errorFields.includes(fieldName))
      .filter(f => {
        const usedIdx = f.usedFields.findIndex(f => f === fieldName)
        if (usedIdx>=0) return f.usedValues[usedIdx] === value
        const fromServerIdx = f.usedFields.findIndex(f => f === 'fromServer')
        if (fromServerIdx>=0) {
          const fromServerUsedValues = f.usedValues[fromServerIdx].values as Vs
          return f.errorFields
            .filter(ef => ef!=='fromServer' && f.errorFields.includes(ef))
            .every(ef => values[ef] === fromServerUsedValues[ef])
        }
        return false
      })
    awaitDelay(fs, stale, () => setHighlight(true))
    
    return () => { stale.v = true }
  }, [errors, fieldName, value, values])
  
  
  const [getSetValue] = useAsRefGet((value: ValueOrUpdater<Vs[F]>) => {
    setErrors(f => {
      const update = f.filter(f => (f.notify || f.highlight)
        && f.errorFields.includes(fieldName)
      )
      if (update.length>0)
        return updateFailures(
          errors,
          { errors: update },
          { notify: false, highlight: false }
        )
      return f
    })
    setValues(s => {
      const newFieldValue = function() {
        if (value instanceof Function) return value(s[fieldName])
        return value
      }()
      return {
        ...s,
        [fieldName]: newFieldValue,
      }
    })
  })
  const setValue = useCallback((value: ValueOrUpdater<Vs[F]>) => {
    getSetValue()(value)
  }, [])
  
  
  
  const onChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(ev.currentTarget.value as any)
    },
    []
  )
  const [getOnBlur] = useAsRefGet(() => {
    const failsToUpdate = errors.filter(f =>
      f.errorFields.includes(fieldName)
      && f.highlight
      && f.isDelayed
    )
    if (failsToUpdate.length) setErrors(updateFailures(
      errors,
      { errors: failsToUpdate },
      { delay: 0 },
    ))
  })
  const onBlur = useCallback(() => getOnBlur()(), [])
  const getChecked = useCallback((v: Vs[F]) => v === value, [value])
  
  
  
  const inputProps = useMemo(() => ({
    value,
    onChange,
    onBlur,
  }), [value])
  const radioInputProps = useCallback(
    (value: Vs[F]) => ({
      checked: getChecked(value),
      onChange,
    }),
    [value, getChecked]
  )
  
  
  return children?.({
    value,
    highlight,
    setValue,
    onBlur,
    getChecked,
    
    inputProps,
    radioInputProps,
  })
})
// @ts-expect-error
FormFieldWrap.displayName = 'FormFieldWrap'
export default FormFieldWrap



