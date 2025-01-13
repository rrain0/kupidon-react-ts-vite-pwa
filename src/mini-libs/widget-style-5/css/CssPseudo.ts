

export class CssPseudo {
  
  constructor(
    // Имя псевдо-класса (без ':')
    // 'hover'
    readonly name: string
  ) { }
  
  // ':hover'
  select() { return this.name && `:${this.name}` }
  
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
  // TODO - hover must be under media but focus-visible not
  inFocus: new CssPseudo('where(:hover,:focus-visible)'),
} as const satisfies Record<string, CssPseudo>

