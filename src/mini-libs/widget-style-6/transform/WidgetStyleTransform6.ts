import { ArrayU } from '@util/common/ArrayU.ts'
import { SelectPropValueTf5 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform5.ts'








export type SelectPropValueBatchTf6 = { selector: string[], propValues: string[] }

export const transform6 = (selectPropValue: SelectPropValueTf5[]): SelectPropValueBatchTf6[] => {
  const batches: SelectPropValueBatchTf6[] = []
  selectPropValue.forEach(selPropVal => {
    const prevBatch = batches.at(-1)
    if (prevBatch && ArrayU.eq(prevBatch.selector, selPropVal.selector)) prevBatch.propValues.push(selPropVal.propValue)
    else batches.push({ selector: selPropVal.selector, propValues: [selPropVal.propValue] })
  })
  return batches
}





