import { CssPseudos } from 'src/mini-libs/widget-style-5/css/pseudo/CssPseudo.ts'
import { CssPseudo } from 'src/mini-libs/widget-style-5/css/pseudo/CssPseudo.ts'
import { TransformData } from 'src/mini-libs/widget-style-5/transform/TransformData.ts'
import { hoverableMedia } from 'src/mini-libs/widget-style-5/transform/utils.ts'


export class PseudoTransformer {
  
  constructor(
    readonly pseudo: CssPseudo,
  ) { }
  
  transform(transformData: TransformData[]): TransformData[] {
    transformData.push({ state: this.pseudo.select() })
    return transformData
  }
  
}



export const PseudoTransformers = {
  focusVisible: new PseudoTransformer(CssPseudos.focusVisible),
  hover: new class extends PseudoTransformer {
    override transform(transformData: TransformData[]): TransformData[] {
      super.transform(transformData)
      transformData.push({ media: hoverableMedia })
      return transformData
    }
  }(
    CssPseudos.hover
  ),
} as const satisfies Record<string, PseudoTransformer>

