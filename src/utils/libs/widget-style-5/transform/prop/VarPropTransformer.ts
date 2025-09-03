import { CssVarProps } from '@libs/widget-style-5/css/prop/CssVarProp.ts'
import { CssVarProp } from '@libs/widget-style-5/css/prop/CssVarProp.ts'
import { PropTransformers } from '@libs/widget-style-5/transform/prop/PropTransformer.ts'
import { TransformData } from '@libs/widget-style-5/transform/TransformData.ts'



export class VarPropTransformer {
  
  constructor(
    readonly varProp: CssVarProp,
  ) { }
  
  transform(transformData: TransformData[], value: string): TransformData[] {
    transformData.push({ prop: this.varProp.name, value })
    return transformData
  }
  
}



export const VarPropTransformers = {
  color: new class extends VarPropTransformer {
    override transform(transformData: TransformData[], value: string): TransformData[] {
      // { prop: '--color', value }
      super.transform(transformData, value)
      // { prop: 'color', value }
      PropTransformers.color.transform(transformData, value)
      return transformData
    }
  }(
    CssVarProps.color
  ),
} as const satisfies Record<string, VarPropTransformer>

