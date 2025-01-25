import { ArrayU } from '@util/common/ArrayU.ts'
import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { FlatStyleTf1 } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { WidgetProp, WidgetTransformer } from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import uncapitalize = StringU.uncapitalize
import lastI = ArrayU.lastI
import isobject = TypeU.isobject
import camelCaseToKebabCase = StringU.camelCaseToKebabCase





// TODO Style split 'selP' by capital letters and check using 'in' operator
// TODO Style Парсить свойство по чатсям (разделение по словам): bg: { image: '', size: '' }




export type EntitiesRecordTf2 = Record<string, WidgetTransformer>
export type EntitiesRecordArrayTf2 = Array<EntitiesRecordTf2 | undefined>


// slot indexes for context entities
const ctxCommonI = 0
const ctxElementsI = 1
const ctxStatesI = 2 // record of pseudoClasses, attrs
const ctxStateValuesI = 3 // record of attr values
const ctxElemPropI = 4 // record of elem props


export function transform2(
  style: FlatStyleTf1,
  baseContextStack: EntitiesRecordArrayTf2,
): WidgetTransformer[][] {
  const dataList: WidgetTransformer[][] = []
  
  for (const [selectProp, value] of style) {
    const contextStack: EntitiesRecordArrayTf2 = [...baseContextStack]
    const data: WidgetTransformer[] = []
    let sProp = selectProp
    
    pLoop: while (sProp) {
      sProp = uncapitalize(sProp)
      
      for (let ctxI = lastI(contextStack); ctxI >= 0; ctxI--) {
        const context = contextStack[ctxI]
        if (context) for (const [name, entity] of Object.entries(context)) {
          
          if (ctxI !== ctxCommonI && sProp.startsWith(name)
            || ctxI === ctxCommonI && sProp === name
          ) {
            sProp = sProp.slice(name.length)
            
            // found widget transformer
            if (entity.type === 'widget') {
              data.push(entity)
              contextStack[ctxStatesI] = entity.states
              contextStack[ctxStateValuesI] = entity.values
              contextStack[ctxElemPropI] = entity.props
            }
            // found elem
            else if (entity.type === 'elem') {
              data.push(entity)
              contextStack[ctxStatesI] = entity.states
              contextStack[ctxStateValuesI] = undefined
              contextStack[ctxElemPropI] = entity.props
            }
            // found elem state (multistate, attr, pseudoClass)
            else if (entity.type === 'state' || entity.type === 'attr') {
              data.push(entity)
              contextStack[ctxStateValuesI] = entity.values
            }
            // found elem state (pseudoClass)
            else if (entity.type === 'pseudo') {
              data.push(entity)
              contextStack[ctxStateValuesI] = undefined
            }
            // found elem state (pseudoElement)
            else if (entity.type === 'pseudoElem') {
              data.push(entity)
              contextStack[ctxStateValuesI] = undefined
            }
            // found state value (attr value)
            else if (ctxI === ctxStateValuesI) {
              data.push({ value: name, type: 'stateValue' })
            }
            // found prop - must be last in selector
            else if (entity.type === 'prop') {
              if (!sProp && !isobject(value)) {
                data.push(entity)
                data.push({ value, type: 'propValue' })
                dataList.push(data)
                break pLoop
              }
            }
            
            continue pLoop
          }
        }
      }
      
      // If not found then it is unregistered property
      {
        //throw new Error(`Unknown property: ${sProp}`)
        /* if (isobject(value)) {
          throw new Error(`Found unregistered property '${sProp}' but value is object: ${value}`)
        } */
        const pKebabized = camelCaseToKebabCase(sProp)
        data.push(WidgetProp.ofName(pKebabized))
        data.push({ value, type: 'propValue' })
        dataList.push(data)
        sProp = ''
      }
      
    }
  }
  
  return dataList
}

