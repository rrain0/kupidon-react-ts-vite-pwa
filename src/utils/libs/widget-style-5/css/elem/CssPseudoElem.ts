import { CssElem } from '@libs/widget-style-5/css/elem/CssElem.ts'




export class CssPseudoElem extends CssElem {
  
  // double-colon pseudo-elem-name
  // '::after'
  override selectOnlyElem() {
    return this.name && `::${this.name}`
  }
  
}




export const CssPseudoElems = {
  before: new CssPseudoElem('before', { }, { }),
  after: new CssPseudoElem('after', { }, { }),
} as const satisfies Record<string, CssPseudoElem>

