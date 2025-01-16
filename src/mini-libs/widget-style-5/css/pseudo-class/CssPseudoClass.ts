

export class CssPseudoClass {
  
  constructor(
    // Имя псевдо-класса (без ':')
    // 'hover'
    readonly name: string
  ) { }
  
  // Pseudo class selector
  // ':hover'
  select() { return this.name && `:${this.name}` }
  
}




export const CssPseudoClasses = {
  // simple
  empty: new CssPseudoClass(''),
  checked: new CssPseudoClass('checked'),
  hover: new CssPseudoClass('hover'),
  active: new CssPseudoClass('active'),
  focus: new CssPseudoClass('focus'),
  focusVisible: new CssPseudoClass('focus-visible'),
  readOnly: new CssPseudoClass('read-only'),
  disabled: new CssPseudoClass('disabled'),
  
  
  // complex
  // TODO - разбить на отдельные селекторы состояния,
  //  да и hover всё равно должен быть отдельно под медиа.
  //  В общем похоже это лучше в Transformers добавить.
  anyFocus: new CssPseudoClass('where(:active,:focus,:focus-visible)'),
  // TODO - hover must be under media but focus-visible not
  inFocus: new CssPseudoClass('where(:hover,:focus-visible)'),
} as const satisfies Record<string, CssPseudoClass>

