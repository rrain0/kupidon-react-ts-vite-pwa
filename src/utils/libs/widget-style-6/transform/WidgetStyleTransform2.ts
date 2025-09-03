import { StringU } from '@utils/common/StringU.ts'
import { FlatStyleTf1 } from '@libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { WidgetProp, WidgetTransformer } from '@libs/widget-style-6/WidgetEntity.ts'
import uncapitalize = StringU.uncapitalize
import camelCaseToKebabCase = StringU.camelCaseToKebabCase





// TODO Style split 'selP' by capital letters and check using 'in' operator
// TODO Style Парсить свойство по чатсям (разделение по словам): bg: { image: '', size: '' }




export type EntitiesRecordTf2 = Record<string, WidgetTransformer>
export type EntitiesRecordArrayTf2 = Array<EntitiesRecordTf2 | undefined>


// Indexes of slots for various contexts

// Search by ===
const ctxCommonPropsI = 0
const ctxWidgetPropsI = 1

// Search by startsWith
const ctxCommonStatesI = 2
const ctxWidgetStatesI = 3

const ctxWidgetElementsI = 4
const ctxWidgetElementStatesI = 5 // record of pseudoClasses, attrs
const ctxWidgetElementStateValuesI = 6 // record of attr values
const ctxWidgetElementPropsI = 7 // record of elem props

const ctxLastI = ctxWidgetElementPropsI


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
      
      for (let ctxI = ctxLastI; ctxI >= 0; ctxI--) {
        const context = contextStack[ctxI]
        if (context) for (const [name, entity] of
          // TODO Style - найти место для сортировки
          Object.entries(context).sort(([a], [b]) => b.length - a.length)
        ) {
          
          if (
            (ctxI === ctxCommonPropsI || ctxI === ctxWidgetPropsI) && sProp === name
            || (ctxI !== ctxCommonPropsI && ctxI !== ctxWidgetPropsI) && sProp.startsWith(name)
          ) {
            sProp = sProp.slice(name.length)
            
            // found widget transformer
            if (entity.type === 'widget') {
              data.push(entity)
              contextStack[ctxWidgetElementStatesI] = entity.states
              contextStack[ctxWidgetElementStateValuesI] = entity.values
              contextStack[ctxWidgetElementPropsI] = entity.props
            }
            // found elem
            else if (entity.type === 'elem') {
              data.push(entity)
              contextStack[ctxWidgetElementStatesI] = entity.states
              contextStack[ctxWidgetElementStateValuesI] = undefined
              contextStack[ctxWidgetElementPropsI] = entity.props
            }
            // found elem state (multistate, attr, pseudoClass)
            else if (entity.type === 'state' || entity.type === 'attr') {
              data.push(entity)
              contextStack[ctxWidgetElementStateValuesI] = entity.values
            }
            // found elem state (pseudoClass)
            else if (entity.type === 'pseudo') {
              data.push(entity)
              contextStack[ctxWidgetElementStateValuesI] = undefined
            }
            // found elem state (pseudoElement)
            else if (entity.type === 'pseudoElem') {
              data.push(entity)
              contextStack[ctxWidgetElementStateValuesI] = undefined
            }
            // found state value (attr value)
            else if (ctxI === ctxWidgetElementStateValuesI) {
              data.push({ value: name, type: 'stateValue' })
            }
            // found prop - must be last in selector
            else if (entity.type === 'prop') {
              if (!sProp) {
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

