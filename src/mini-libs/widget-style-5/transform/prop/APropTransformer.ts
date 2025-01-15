import { CssAProps } from 'src/mini-libs/widget-style-5/css/prop/CssAProp.ts'
import { CssAProp } from 'src/mini-libs/widget-style-5/css/prop/CssAProp.ts'
import { TransformData } from 'src/mini-libs/widget-style-5/transform/TransformData.ts'



export class APropTransformer {
  
  constructor(
    readonly aProp: CssAProp,
  ) { }
  
  transform(transformData: TransformData[], value: string): TransformData[] {
    transformData.push({ prop: this.aProp.name, value, aProp: this.aProp })
    return transformData
  }
  
}



export const APropTransformers = {
  angle: new APropTransformer(CssAProps.angle),
} as const satisfies Record<string, APropTransformer>

