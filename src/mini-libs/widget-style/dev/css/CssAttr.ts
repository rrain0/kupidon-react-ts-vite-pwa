import { CssState } from 'src/mini-libs/widget-style/dev/css/CssState.ts'


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
  
}




export const CssAttrs = {
  empty: new CssAttr(''),
  dataError: new CssAttr('data-error'),
  dataSelected: new CssAttr('data-selected'),
} as const as Record<string, CssAttr>


