import { TypeU } from '@util/common/TypeU.ts'
import { CssEnumAttr } from 'src/mini-libs/widget-style-5/css/attr/CssEnumAttr.ts'
import { CssVarProp } from 'src/mini-libs/widget-style-5/css/prop/CssVarProp.ts'
import { CssState } from 'src/mini-libs/widget-style-5/css/CssState.ts'
import RecordRo = TypeU.RecordRo




export type ElemStateValue = undefined | '' | true | string



export class CssElem {
  
  constructor(
    // classname
    // 'rruiButton'
    readonly name: string,
    // stateName -> CssState
    readonly states: RecordRo<string, CssState>,
    // propName -> CssProp
    readonly props: RecordRo<string, CssVarProp>,
  ) { }
  
  static newEmpty() {
    return new CssElem('', { }, { })
  }
  static newOnlyName(name: string) {
    return new CssElem(name, { }, { })
  }
  
  // dot classname
  // '.rruiButton'
  selectOnlyClass() {
    if (!this.name) return ''
    return `.${this.name}`
  }
  
  // state selector
  // ':hover[error]'
  selectOnlyState(state: RecordRo<string, ElemStateValue> = { }) {
    let used = ''
    Object.entries(state).forEach(([name, state]) => {
      if (state === undefined) return
      if (state === true) state = ''
      const s = this.states[name]
      if (s instanceof CssEnumAttr) used += s.select(state)
      else used += s.select()
    })
    return used
  }
  
  // dot classname + state selector
  // '.rruiButton:hover[error]'
  select(state: RecordRo<string, ElemStateValue> = { }) {
    return this.selectOnlyClass() + this.selectOnlyState(state)
  }
  
}

