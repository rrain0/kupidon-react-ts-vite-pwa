

export class CssProp {
  
  constructor(
    // Prop name
    // 'color'
    readonly name: string
  ) { }
  
  
  // color: value;
  useSet(value: string): string {
    return `${this.name}: ${value};`
  }
  
}




export const CssProps = {
  color: new CssProp('color'),
  background: new CssProp('background'),
} as const satisfies Record<string, CssProp>

