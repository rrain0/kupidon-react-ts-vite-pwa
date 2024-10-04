import { useCallback, useMemo, useState } from 'react'
import { Option } from 'src/ui-data/models/Option'
import { ArrayU } from 'src/util/common/ArrayU'
import { TypeU } from 'src/util/common/TypeU'
import Setter = TypeU.Setter


export const useMultiSelectOneEditableOption = <T extends string>(
  editableOptionId: T,
  options: Option<T>[],
  selected: T[],
  setSelected: Setter<T[]>,
) => {
  
  const [customOptionText, setCustomOptionText] = useState('')
  
  const options1 = useMemo(() => {
    return options.map(opt => {
      if (opt.value === editableOptionId) return { ...opt, text: customOptionText }
      return opt
    })
  }, [editableOptionId, options, customOptionText])
  
  const add = useMemo(() => {
    return options1.filter(opt => opt.value === editableOptionId && !opt.text).map(opt => opt.value)
  }, [editableOptionId, options1])
  
  const edit = useMemo(() => {
    return options1.filter(opt => opt.value === editableOptionId).map(opt => opt.value)
  }, [editableOptionId, options1])
  
  const setOptionText = useCallback((opt: Option<T>) => {
    const { value: v, text: t } = opt
    if (v === editableOptionId) {
      setCustomOptionText(t)
      if (t) setSelected(ArrayU.pushUniqToIf(selected, v))
      else setSelected(ArrayU.removeToIf(selected, v))
    }
  }, [editableOptionId, selected])
  
  return { options: options1, add, edit, setOptionText } as const
}
