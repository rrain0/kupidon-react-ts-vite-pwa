import { CssProp } from 'src/mini-libs/widget-style-5/css/CssProp.ts'


export class CssPropEnum extends CssProp {
  
  constructor(
    name: string,
    readonly values: string[]
  ) {
    super(name)
  }
  
}
