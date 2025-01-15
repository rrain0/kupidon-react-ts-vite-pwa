import { CssProp } from 'src/mini-libs/widget-style-5/css/prop/CssProp.ts'


export class CssVarProp extends CssProp {
  
  constructor(
    // Full prop name
    // '--color'
    name: string
  ) {
    super(name)
  }
  
  // 'var(--prop)'
  // 'var(--prop, defaultValue)'
  useGet(defaultValue: string = ''): string {
    const nameAndDefault = [this.name]
    if (defaultValue) nameAndDefault.push(defaultValue)
    return `var(${nameAndDefault.join(', ')})`
  }
  
}




export const CssVarProps = {
  color: new CssVarProp('--color'),
} as const satisfies Record<string, CssVarProp>

