


export class CssAttr {
  
  constructor(
    // Attr name
    // 'data-error'
    readonly name: string
  ) { }
  
  // Attr selector
  // '[data-error]'
  select() { return this.name && `[${this.name}]` }
  
}




export const CssAttrs = {
  empty: new CssAttr(''),
  dataError: new CssAttr('data-error'),
  dataSelected: new CssAttr('data-selected'),
} as const as Record<string, CssAttr>

