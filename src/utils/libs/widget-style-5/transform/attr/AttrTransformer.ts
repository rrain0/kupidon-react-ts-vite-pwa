import { CssAttrs } from '@libs/widget-style-5/css/attr/CssAttr.ts'
import { CssAttr } from '@libs/widget-style-5/css/attr/CssAttr.ts'
import { TransformData } from '@libs/widget-style-5/transform/TransformData.ts'


export class AttrTransformer {
  
  constructor(
    readonly attr: CssAttr,
  ) { }
  
  transform(transformData: TransformData[]): TransformData[] {
    transformData.push({ state: this.attr.select() })
    return transformData
  }
  
}



export const AttrTransformers = {
  error: new AttrTransformer(CssAttrs.dataError),
} as const satisfies Record<string, AttrTransformer>

