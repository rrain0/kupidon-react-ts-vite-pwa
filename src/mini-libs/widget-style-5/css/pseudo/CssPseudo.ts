

export class CssPseudo {
  
  constructor(
    // Имя псевдо-класса (без ':')
    // 'hover'
    readonly name: string
  ) { }
  
  // Pseudo class selector
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
  // TODO - разбить на отдельные селекторы состояния,
  //  да и hover всё равно должен быть отдельно под медиа.
  //  В общем похоже это лучше в Transformers добавить.
  anyFocus: new CssPseudo('where(:active,:focus,:focus-visible)'),
  // TODO - hover must be under media but focus-visible not
  inFocus: new CssPseudo('where(:hover,:focus-visible)'),
} as const satisfies Record<string, CssPseudo>

