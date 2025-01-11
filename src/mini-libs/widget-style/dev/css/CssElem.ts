import { TypeU } from '@util/common/TypeU.ts'
import { CssAttr } from 'src/mini-libs/widget-style/dev/css/CssAttr.ts'
import { CssAttrEnum } from 'src/mini-libs/widget-style/dev/css/CssAttrEnum.ts'
import { CssProp } from 'src/mini-libs/widget-style/dev/css/CssProp.ts'
import { CssPseudos } from 'src/mini-libs/widget-style/dev/css/CssPseudo.ts'
import { CssState, useThis } from 'src/mini-libs/widget-style/dev/css/CssState.ts'
import notExists = TypeU.notExists


export type StateToValue<S extends Record<string, CssState>> = {
  [State in keyof S]?: undefined | '' | true | (S[State] extends CssAttrEnum<infer V> ? V : '')
}


export class CssElem<
  const S extends Record<string, CssState>,
  const P extends Record<string, CssProp>,
> {
  
  constructor(
    // classname
    // 'rrainuiButton'
    readonly name: string,
    readonly states: S,
    readonly props: P,
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
    const used = this.use()
    if (!used) return ''
    return `&${used}`
  }
  
  
  useState(state: StateToValue<S> = { }) {
    let used = this.use()
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
  
  useStateThis(state: StateToValue<S> = { }) {
    return useThis(this.useState(state))
  }
  
}




// Examples
{
  const btn = new CssElem('myButton', {
    normal: CssPseudos.empty,
    hover: CssPseudos.hover,
    variant: new CssAttrEnum('variant', ['filled', 'outlined']),
    withBorder: new CssAttr('withBorder'),
  }, { })
  
  // &.myButton:hover[variant=filled][withBorder]
  const btnHoverFilledWithBorderThisSelector = btn.useStateThis({
    hover: true,
    variant: 'filled',
    withBorder: true,
  })
  
  //console.log('CssElem btnHoverFilledWithBorderThisSelector', btnHoverFilledWithBorderThisSelector)
}

