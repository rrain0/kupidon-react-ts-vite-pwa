import { css } from '@emotion/react'

import { isdef } from 'src/utils/base/typeUtils.ts'



export class CssProp {
  
  constructor(
    // Full prop name
    // '--color'
    readonly name: string
  ) { }
  
  // --prop: value;
  useSet(value: string): string {
    return `${this.name}: ${value};`
  }
  // var(--prop)
  // var(--prop, defaultValue)
  useGet(defaultValue?: string): string {
    const nameAndDefault = [this.name]
    if (isdef(defaultValue)) nameAndDefault.push(defaultValue)
    return `var(${nameAndDefault.join(', ')})`
  }
  
}




export const CssProps = {
  
  color: new class extends CssProp {
    // --color: value; color: value;
    override useSet(value: string): string {
      return `${super.useSet(value)} color: ${value};`
    }
  }('--color') as CssProp,
  
} as const satisfies Record<string, CssProp>




{
  function cssPropExample() {
    const prop = new CssProp('--prop')
    
    const cssPropStyleExample = css`
      // --prop: value;
      ${prop.name}: value;
      // --prop: var(--prop);
      ${prop.name}: ${prop.useGet()};
      // --prop: var(--prop, default-value);
      ${prop.name}: ${prop.useGet('default-value')};
    `
  }
}
