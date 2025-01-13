// TODO replace widget-style-4 by widget-style-5
import { TypeU } from '@util/common/TypeU.ts'
import { CssAttr } from 'src/mini-libs/widget-style-4/css/CssAttr.ts'
import { CssAttrEnum } from 'src/mini-libs/widget-style-4/css/CssAttrEnum.ts'
import { CssProp } from 'src/mini-libs/widget-style-4/css/CssProp.ts'
import { CssPseudos } from 'src/mini-libs/widget-style-4/css/CssPseudo.ts'
import { CssSelectable } from 'src/mini-libs/widget-style-4/css/CssSelectable.ts'
import { CssState } from 'src/mini-libs/widget-style-4/css/CssState.ts'
import RecordRo = TypeU.RecordRo
import notExists = TypeU.notExists
import { useThis } from './utils'



export type ElemStateValue = undefined | '' | true | string

export class CssElem implements CssSelectable {
  
  constructor(
    // classname
    // 'rrainuiButton'
    readonly name: string,
    // stateName -> CssState
    readonly states: RecordRo<string, CssState>,
    // propName -> CssProp
    readonly props: RecordRo<string, CssProp>,
  ) { }
  
  static newEmpty() {
    return new CssElem('', { }, { })
  }
  static newNamed(name: string) {
    return new CssElem(name, { }, { })
  }
  
  // dot classname
  // '.rrainuiButton'
  use() {
    if (!this.name) return ''
    return `.${this.name}`
  }
  
  // & dot classname
  // '&.rrainuiButton'
  useThis() {
    return useThis(this.use())
  }
  
  
  useOnlyState(state: RecordRo<string, ElemStateValue> = { }) {
    let used = ''
    Object.entries(state).forEach(([name, state]) => {
      if (notExists(state)) return
      const s = this.states[name]
      if (s instanceof CssAttrEnum) {
        if (state === true) state = ''
        used += s.useEnum(state)
      }
      else {
        used += s.use()
      }
    })
    return used
  }
  
  
  useState(state: RecordRo<string, ElemStateValue> = { }) {
    return this.use() + this.useOnlyState(state)
  }
  
  useStateThis(state: RecordRo<string, ElemStateValue> = { }) {
    return useThis(this.useState(state))
  }
  
}

/*



// Examples
{
  const btn = new CssElem('rruiButton', {
    normal: CssPseudos.empty,
    hover: CssPseudos.hover,
    variant: new CssAttrEnum('variant', ['filled', 'outlined']),
    withBorder: new CssAttr('withBorder'),
  }, { })
  
  // &.rruiButton:hover[variant=filled][withBorder]
  const btnHoverFilledWithBorderThisSelector = btn.useStateThis({
    hover: true,
    variant: 'filled',
    withBorder: true,
  })
  
  //console.log('CssElem btnHoverFilledWithBorderThisSelector', btnHoverFilledWithBorderThisSelector)
}
*/
