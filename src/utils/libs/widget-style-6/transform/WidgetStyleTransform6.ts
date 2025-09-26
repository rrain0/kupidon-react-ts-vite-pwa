import { arrEq } from 'src/utils/base/arrayUtils.ts'
import { SelectPropValueTf5 } from '@libs/widget-style-6/transform/WidgetStyleTransform5.ts'




export type SelectPropValueBatchTf6 = { selector: string[], propValues: string[] }

export const transform6 = (selectPropValue: SelectPropValueTf5[]): SelectPropValueBatchTf6[] => {
  const batches: SelectPropValueBatchTf6[] = []
  selectPropValue.forEach(selPropVal => {
    if (!selPropVal.propValue) return
    const prevBatch = batches.at(-1)
    if (prevBatch && arrEq(prevBatch.selector, selPropVal.selector)) {
      prevBatch.propValues.push(selPropVal.propValue)
    }
    else batches.push({ selector: selPropVal.selector, propValues: [selPropVal.propValue] })
  })
  return batches
}


