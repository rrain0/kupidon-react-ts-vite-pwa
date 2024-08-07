import { TypeU } from 'src/util/common/TypeU.ts'
import { ValidationCore } from 'src/mini-libs/form-validation/core/ValidationCore.ts'
import React, {
  JSX,
  ReactElement,
  useCallback,
  useEffect, useMemo,
  useState,
} from 'react'
import { useEffectEvent } from 'src/util/react/useEffectEvent.ts'
import Input from 'src/ui/0-elements/inputs/Input/Input.tsx'
import { ValidationActions } from 'src/mini-libs/form-validation/core/ValidationActions.ts'
import Failures = ValidationCore.Failures
import updateFailures = ValidationActions.updateFailures
import awaitDelay = ValidationActions.awaitDelay
import Values = ValidationCore.Values
import SetterOrUpdater = TypeU.SetterOrUpdater
import ValueOrUpdater = TypeU.ValueOrMapper
import trueOrUndef = TypeU.trueOrUndef
import Callback = TypeU.Callback
import Callback1 = TypeU.Callback1
import Mapper = TypeU.Mapper



// todo remove 'render' prop


export type ValidationWrapRenderProps<V> = {
  value: V
  highlight: true | undefined
  setValue: SetterOrUpdater<V>
  onBlur: Callback
  getChecked: Mapper<V, boolean>
  inputProps: {
    value: V
    onChange: Callback1<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
    onBlur: Callback
  }
  radioInputProps: (value:V)=>({
    checked: boolean,
    onChange: Callback1<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>,
  })
}
  
export type ValidationWrapProps
<Vs extends Values, F extends keyof Vs> = {
  values: Vs
  fieldName: F
  failures: Failures<Vs>
  setFailures: SetterOrUpdater<Failures<Vs>>
  setValues: SetterOrUpdater<Vs>
  render?: (props: ValidationWrapRenderProps<Vs[F]>)=>React.ReactNode
  children?: (props: ValidationWrapRenderProps<Vs[F]>)=>React.ReactNode
}



const ValidationWrap =
<Vs extends Values, F extends keyof Vs>
(props: ValidationWrapProps<Vs, F>) => {
  const {
    fieldName,
    values,
    failures,
    setFailures,
    setValues,
    render,
    children,
  } = props
  
  
  const value = values[fieldName]
  
  
  const [highlight, setHighlight] = useState(false)
  useEffect(() => {
    setHighlight(false)
    const stale = [false] as [boolean]
    
    const fs = failures
      .filter(f => f.highlight && f.errorFields.includes(fieldName))
      .filter(f => {
        const usedIdx = f.usedFields.findIndex(f => f===fieldName)
        if (usedIdx>=0) return f.usedValues[usedIdx]===value
        const fromServerIdx = f.usedFields.findIndex(f => f === 'fromServer')
        if (fromServerIdx>=0) {
          const fromServerUsedValues = f.usedValues[fromServerIdx].values as Vs
          return f.errorFields
            .filter(ef => ef!=='fromServer' && f.errorFields.includes(ef))
            .every(ef => values[ef]===fromServerUsedValues[ef])
        }
        return false
      })
    awaitDelay(fs, stale, () => setHighlight(true))
    
    return () => { stale[0] = true }
  }, [failures, fieldName, value, values])
  
  
  const setValueEffectEvent = useEffectEvent(
    (value: ValueOrUpdater<Vs[F]>) => {
      setFailures(f => {
        const update = f.filter(f => (f.notify || f.highlight)
          && f.errorFields.includes(fieldName)
        )
        if (update.length>0)
          return updateFailures(
            failures,
            { failures: update },
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
    }
  )
  const setValue = useCallback(
    (value: ValueOrUpdater<Vs[F]>) => setValueEffectEvent(value),
    []
  )
  
  
  
  const onChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
      setValue(ev.currentTarget.value as any)
    },
    []
  )
  const onBlurEffectEvent = useEffectEvent(() => {
    const failsToUpdate = failures.filter(f =>
      f.errorFields.includes(fieldName)
      && f.highlight
      && f.isDelayed
    )
    if (failsToUpdate.length) setFailures(updateFailures(
      failures,
      { failures: failsToUpdate },
      { delay: 0 },
    ))
  })
  const onBlur = useCallback(() => onBlurEffectEvent(), [])
  const getChecked = useCallback((v: Vs[F]) => v===value, [value])
  
  
  
  const inputProps = useMemo(
    () => ({
      value,
      onChange,
      onBlur,
    }),
    [value]
  )
  const radioInputProps = useCallback(
    (value: Vs[F]) => ({
      checked: getChecked(value),
      onChange,
    }),
    [value, getChecked]
  )
  
  
  if (children) return children({
    value,
    highlight: trueOrUndef(highlight),
    setValue,
    onBlur,
    getChecked,
    
    inputProps,
    radioInputProps,
  })
  if (render) return render({
    value,
    highlight: trueOrUndef(highlight),
    setValue,
    onBlur,
    getChecked,
    
    inputProps,
    radioInputProps,
  })
  return undefined
}
export default React.memo(ValidationWrap) as typeof ValidationWrap







{
  const inputTypeTest = () => {
    type InputType = ReactElement<
      React.InputHTMLAttributes<Element>,
      JSX.ElementType
      /*React.JSXElementConstructor<React.JSX.IntrinsicElements['input']>*/
    >
    let i1: InputType = <input value={'ldksfjl'}/>
    let i2: InputType = <Input value={'ldksfjl'}/>
    
    i1 = React.cloneElement(i1, { name: 'some-name' })
    i2 = React.cloneElement(i2, { name: 'some-name' })
    
    i1 = React.cloneElement(i2, { name: 'some-name' })
    i2 = React.cloneElement(i1, { name: 'some-name' })
  }
}
