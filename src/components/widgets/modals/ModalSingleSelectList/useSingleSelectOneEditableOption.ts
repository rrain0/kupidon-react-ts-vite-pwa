import { useCallback, useMemo, useState } from 'react'
import { Option } from 'src/models/ui/Option.ts'

import { Setter } from '@utils/base/math/typeUtils.ts'
import { isdef } from '@utils/base/math/typeUtils.ts'


export const useSingleSelectOneEditableOption = <T extends string>(
  editableOptionId: T,
  options: Option<T>[],
  selected: T,
  setSelected: Setter<T>,
  notSelectedValue?: T | undefined,
) => {
  
  const [customOptionText, setCustomOptionText] = useState('')
  
  const options1 = useMemo(() => {
    return options.map(opt => {
      if (opt.id === editableOptionId) return { ...opt, text: customOptionText }
      return opt
    })
  }, [editableOptionId, options, customOptionText])
  
  const add = useMemo(() => {
    return options1.filter(opt => opt.id === editableOptionId && !opt.text).map(opt => opt.id)
  }, [editableOptionId, options1])
  
  const edit = useMemo(() => {
    return options1.filter(opt => opt.id === editableOptionId).map(opt => opt.id)
  }, [editableOptionId, options1])
  
  const defaultOption = useMemo(() => {
    if (isdef(notSelectedValue)) return notSelectedValue
    return options[0]?.id
  }, [options, notSelectedValue])
  
  const setOptionText = useCallback((opt: Option<T>) => {
    const { id, text: t } = opt
    if (id === editableOptionId) {
      setCustomOptionText(t)
      if (t) setSelected(id)
      else if (selected === id) setSelected(defaultOption)
    }
  }, [editableOptionId, selected, defaultOption])
  
  return { options: options1, add, edit, setOptionText } as const
}
