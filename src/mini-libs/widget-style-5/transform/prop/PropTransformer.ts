import { CssProps } from 'src/mini-libs/widget-style-5/css/prop/CssProp.ts'
import { CssProp } from 'src/mini-libs/widget-style-5/css/prop/CssProp.ts'
import { TransformData } from 'src/mini-libs/widget-style-5/transform/TransformData.ts'



export class PropTransformer {
  
  constructor(
    readonly prop: CssProp,
  ) { }
  
  transform(transformData: TransformData[], value: string): TransformData[] {
    transformData.push({ prop: this.prop.name, value })
    return transformData
  }
  
}



export const PropTransformers = {
  color: new PropTransformer(CssProps.color),
} as const satisfies Record<string, PropTransformer>

