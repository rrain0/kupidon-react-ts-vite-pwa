
import { CssAttr } from '@libs/widget-style-4/css/CssAttr.ts'
import { CssAttrEnum } from '@libs/widget-style-4/css/CssAttrEnum.ts'
import { CssProp } from '@libs/widget-style-4/css/CssProp.ts'
import { CssPseudos } from '@libs/widget-style-4/css/CssPseudo.ts'
import { CssSelectable } from '@libs/widget-style-4/css/CssSelectable.ts'
import { CssState, useThis } from '@libs/widget-style-4/css/CssState.ts'
import { isnullundef } from 'src/utils/base/tsUtils.ts'
import { RecordRo } from 'src/utils/base/tsUtils.ts'



export type StateToValue<Ss extends RecordRo<string, CssState>> = {
  [State in keyof Ss]?: undefined | '' | true | (Ss[State] extends CssAttrEnum<infer V> ? V : '')
}


export class CssElem<
  const out Ss extends RecordRo<string, CssState>,
  const out Ps extends RecordRo<string, CssProp>,
> implements CssSelectable {
  
  constructor(
    // classname
    // 'rrainuiButton'
    readonly name: string,
    // stateName -> CssState
    readonly states: Ss,
    // propName -> CssProp
    readonly props: Ps,
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
  
  
  useOnlyState(state: StateToValue<Ss> = { }) {
    let used = ''
    Object.entries(state).forEach(([name, state]) => {
      if (isnullundef(state)) return
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
  
  
  useState(state: StateToValue<Ss> = { }) {
    return this.use() + this.useOnlyState(state)
  }
  
  useStateThis(state: StateToValue<Ss> = { }) {
    return useThis(this.useState(state))
  }
  
}




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

