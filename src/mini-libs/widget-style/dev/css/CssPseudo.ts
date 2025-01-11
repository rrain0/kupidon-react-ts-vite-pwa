import { CssState } from 'src/mini-libs/widget-style/dev/css/CssState.ts'


export class CssPseudo extends CssState {
  
  constructor(
    // Имя псевдо-класса (то есть без ':')
    // 'hover'
    readonly name: string
  ) {
    super()
  }
  
  // ':hover'
  use() {
    const name = this.name
    if (!name) return ''
    return `:${name}`
  }
  
}




export const CssPseudos = {
  // simple
  empty: new CssPseudo(''),
  checked: new CssPseudo('checked'),
  hover: new CssPseudo('hover'),
  active: new CssPseudo('active'),
  focus: new CssPseudo('focus'),
  focusVisible: new CssPseudo('focus-visible'),
  readOnly: new CssPseudo('read-only'),
  disabled: new CssPseudo('disabled'),
  
  // complex
  anyFocus: new CssPseudo('where(:active,:focus,:focus-visible)'),
  inFocus: new CssPseudo('where(:hover,:focus-visible)'),
} as const satisfies Record<string, CssPseudo>

