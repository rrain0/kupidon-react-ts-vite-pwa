import { CssState, useThis } from 'src/mini-libs/widget-style-4/css/CssState.ts'


export class CssAttr extends CssState {
  
  constructor(
    // Attr name
    // 'data-error'
    readonly name: string
  ) {
    super()
  }
  
  // Attr selector
  // '[data-error]'
  use() {
    const name = this.name
    if (!name) return ''
    return `[${name}]`
  }
  
  useThis() {
    return useThis(this.use())
  }
  
}




export const CssAttrs = {
  empty: new CssAttr(''),
  dataError: new CssAttr('data-error'),
  dataSelected: new CssAttr('data-selected'),
} as const as Record<string, CssAttr>


