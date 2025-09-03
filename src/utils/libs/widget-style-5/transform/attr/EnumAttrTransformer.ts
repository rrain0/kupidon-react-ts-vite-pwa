import { CssEnumAttr } from '@libs/widget-style-5/css/attr/CssEnumAttr.ts'
import { CssEnumAttrs } from '@libs/widget-style-5/css/attr/CssEnumAttr.ts'
import { TransformData } from '@libs/widget-style-5/transform/TransformData.ts'



export class EnumAttrTransformer {
  
  constructor(
    readonly enumAttr: CssEnumAttr,
  ) { }
  
  transform(transformData: TransformData[], value: string = ''): TransformData[] {
    transformData.push({ state: this.enumAttr.select(value) })
    return transformData
  }
  
}



export const EnumAttrTransformers = {
  // todo ??? type or inputType
  inputType: new EnumAttrTransformer(CssEnumAttrs.inputType),
} as const satisfies Record<string, EnumAttrTransformer>

