import { SelectPropValueBatchTf5 } from 'src/mini-libs/widget-style-5.1/transform/WidgetStyleTransform5.ts'





export const transform6 = (selectPropValueBatch: SelectPropValueBatchTf5[]): string => {
  let css = ''
  selectPropValueBatch.forEach(batch => {
    const propValues = batch.propValues.join('\n') + '\n'
    
    let selectPropValue = propValues
    batch.selector.toReversed().forEach(sel => {
      selectPropValue = `${sel} {\n${selectPropValue}}`
    })
    
    css += selectPropValue + '\n'
  })
  return css
}



