import { SelectPropValueBatchTf6 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform6.ts'





export const transform7 = (selectPropValueBatch: SelectPropValueBatchTf6[]): string => {
  return selectPropValueBatch.map(batch => {
    const propValues = batch.propValues.join('\n') + '\n'
    
    let selectPropValue = propValues
    batch.selector.toReversed().forEach(sel => {
      if (sel) selectPropValue = `${sel} {\n${selectPropValue}}`
    })
    
    return selectPropValue
  }).join('\n')
}



