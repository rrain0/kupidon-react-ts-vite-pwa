import { ArrayU } from '@util/common/ArrayU.ts'
import { SelectPropValueTf4 } from 'src/mini-libs/widget-style-5.1/transform/WidgetStyleTransform4.ts'








export type SelectPropValueBatchTf5 = { selector: string[], propValues: string[] }
export const transform5 = (selectPropValue: SelectPropValueTf4[]): SelectPropValueBatchTf5[] => {
  const batches: SelectPropValueBatchTf5[] = []
  selectPropValue.forEach(selPropVal => {
    const prevBatch = batches.at(-1)
    if (prevBatch && ArrayU.eq(prevBatch.selector, selPropVal.selector)) prevBatch.propValues.push(selPropVal.propValue)
    else batches.push({ selector: selPropVal.selector, propValues: [selPropVal.propValue] })
  })
  return batches
}





