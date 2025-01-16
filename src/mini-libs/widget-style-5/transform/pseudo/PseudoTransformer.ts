import { CssPseudoClasses } from 'src/mini-libs/widget-style-5/css/pseudo-class/CssPseudoClass.ts'
import { CssPseudoClass } from 'src/mini-libs/widget-style-5/css/pseudo-class/CssPseudoClass.ts'
import { TransformData } from 'src/mini-libs/widget-style-5/transform/TransformData.ts'
import { hoverableMedia } from 'src/mini-libs/widget-style-5/transform/utils.ts'


export class PseudoTransformer {
  
  constructor(
    readonly pseudo: CssPseudoClass,
  ) { }
  
  transform(transformData: TransformData[]): TransformData[] {
    transformData.push({ state: this.pseudo.select() })
    return transformData
  }
  
}



export const PseudoTransformers = {
  focusVisible: new PseudoTransformer(CssPseudoClasses.focusVisible),
  hover: new class extends PseudoTransformer {
    override transform(transformData: TransformData[]): TransformData[] {
      super.transform(transformData)
      transformData.push({ media: hoverableMedia })
      return transformData
    }
  }(
    CssPseudoClasses.hover
  ),
} as const satisfies Record<string, PseudoTransformer>

