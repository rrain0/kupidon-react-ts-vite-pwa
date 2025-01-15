import { CssAttr } from 'src/mini-libs/widget-style-5/css/attr/CssAttr.ts'


export class CssEnumAttr extends CssAttr {
  
  constructor(
    // Attr name
    // 'direction'
    name: string,
    // Possible values
    // ['horizontal', 'vertical']
    readonly values: string[],
  ) {
    super(name)
  }
  
  // Attr name-value combiner
  // 'direction=vertical'
  nameValue(value: string = '') {
    const name = this.name
    if (!name) return ''
    if (!value) return name
    return `${name}=${value}`
  }
  
  // Attr selector
  // '[direction=vertical]'
  override select(value: string = '') {
    const nameValue = this.nameValue(value)
    return nameValue && `[${nameValue}]`
  }
  
}



export const CssEnumAttrs = {
  
  empty: new CssEnumAttr('', []),
  
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
  inputType: new CssEnumAttr('type', ['radio', 'checkbox']),
  
} as const satisfies Record<string, CssEnumAttr>
