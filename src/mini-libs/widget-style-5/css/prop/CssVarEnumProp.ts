import { CssVarProp } from 'src/mini-libs/widget-style-5/css/prop/CssVarProp.ts'


export class CssVarEnumProp extends CssVarProp {
  
  constructor(
    // Full prop name
    // '--color'
    name: string,
    readonly values: string[]
  ) {
    super(name)
  }
  
}



export const CssVarEnumProps = {
  dir: new CssVarEnumProp('--dir', ['row', 'column']),
} as const satisfies Record<string, CssVarEnumProp>
