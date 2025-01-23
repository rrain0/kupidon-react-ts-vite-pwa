import { SelectPropValueBatchTf5 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform5.ts'





export const transform6 = (selectPropValueBatch: SelectPropValueBatchTf5[]): string => {
  return selectPropValueBatch.map(batch => {
    const propValues = batch.propValues.join('\n') + '\n'
    
    let selectPropValue = propValues
    batch.selector.toReversed().forEach(sel => {
      selectPropValue = `${sel} {\n${selectPropValue}}`
    })
    
    return selectPropValue
  }).join('\n')
}



