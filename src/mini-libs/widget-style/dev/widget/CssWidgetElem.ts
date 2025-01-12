import { TypeU } from '@util/common/TypeU.ts'
import { CssElem } from 'src/mini-libs/widget-style/dev/css/CssElem.ts'
import { CssProp } from 'src/mini-libs/widget-style/dev/css/CssProp.ts'
import { CssState } from 'src/mini-libs/widget-style/dev/css/CssState.ts'
import RecordRo = TypeU.RecordRo



export class CssWidgetElem<
  const out Ss extends RecordRo<string, CssState>,
  const out Ps extends RecordRo<string, CssProp>,
> {
  
  constructor(
    readonly name: string,
    readonly element: CssElem<Ss, Ps>,
    // null if this element is root
    readonly upElement: CssWidgetElem<any, any> | null = null,
    readonly upSelector = '',
  ) { }
  
  // get element
  get e() { return this.element }
  
  // get element props
  get ps() { return this.element.props }
  
  use() {
    return `${this.upSelector}${this.element.use}`
  }
  
}

