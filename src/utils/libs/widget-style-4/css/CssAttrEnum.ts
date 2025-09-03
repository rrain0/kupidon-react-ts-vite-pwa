import { CssAttr } from '@libs/widget-style-4/css/CssAttr.ts'
import { useThis } from '@libs/widget-style-4/css/CssState.ts'



export class CssAttrEnum<const out V extends string> extends CssAttr {
  
  constructor(
    // Attr name
    // 'direction'
    name: string,
    // Possible values
    // ['horizontal', 'vertical']
    readonly values: readonly V[],
  ) {
    super(name)
  }
  
  // Attr name-value combiner
  // 'direction=vertical'
  nameValue(value: V | '' = '') {
    const name = this.name
    if (!name) return ''
    if (!value) return name
    return `${name}=${value}`
  }
  
  // Attr selector
  // '[direction=vertical]'
  useEnum(value: V | '' = '') {
    const nameValue = this.nameValue(value)
    if (!nameValue) return ''
    return `[${nameValue}]`
  }
  
  // Attr this selector
  // '&[direction=vertical]'
  useEnumThis(value: V | '' = '') {
    return useThis(this.useEnum(value))
  }
  
  toAttr(value: V | '' = '') {
    return new CssAttr(this.nameValue(value))
  }
  
}



export const CssAttrEnums = {
  
  empty: new CssAttrEnum('', []),
  
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
  inputType: new CssAttrEnum('type', ['radio', 'checkbox']),
  
} as const satisfies Record<string, CssAttrEnum<any>>

