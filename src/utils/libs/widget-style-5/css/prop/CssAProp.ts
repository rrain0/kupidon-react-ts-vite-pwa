import { CssVarProp } from '@libs/widget-style-5/css/prop/CssVarProp.ts'


export class CssAProp extends CssVarProp {
  
  constructor(
    // Full prop name
    // '--angle'
    name: string,
    readonly syntax: string,
    readonly initialValue: string,
    readonly inherits = false,
  ) {
    super(name)
  }
  
  getDeclaration() {
    return `\
@property ${this.name} {
  syntax: "${this.syntax}";
  inherits: ${this.inherits};
  initial-value: ${this.initialValue};
}`
  }
  
}



export const CssAProps = {
  angle: new CssAProp('--angle', '<angle>', '0turn'),
} as const satisfies Record<string, CssAProp>
