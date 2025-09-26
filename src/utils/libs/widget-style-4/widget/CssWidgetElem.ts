
import { CssElem, StateToValue } from '@libs/widget-style-4/css/CssElem.ts'
import { CssProp } from '@libs/widget-style-4/css/CssProp.ts'
import { CssState } from '@libs/widget-style-4/css/CssState.ts'
import { RecordRo } from 'src/utils/base/tsUtils.ts'



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
  
  get isRoot() { return !this.upElement }
  
  // get element
  get e() { return this.element }
  
  // get element props
  get ps() { return this.element.props }
  
  use() {
    return `${this.upSelector}${this.element.use()}`
  }
  
  useState(state: StateToValue<Ss> = { }) {
    return `${this.upSelector}${this.element.useState(state)}`
  }
  
  useStateUnderRoot(state: StateToValue<Ss> = { }) {
    if (!this.upElement) {
      return this.element.useOnlyState(state)
    }
    return `${this.upElement.useStateUnderRoot()}${this.upSelector}${this.element.useState(state)}`
  }
  
  useWithRootStateSelector(underRootStateSelector: string, state: StateToValue<Ss> = { }) {
    if (!this.upElement) return `${this.useState(state)}${underRootStateSelector}`
    return `${this.upElement.useWithRootStateSelector(underRootStateSelector)}${this.useState(state)}`
  }
  
}

