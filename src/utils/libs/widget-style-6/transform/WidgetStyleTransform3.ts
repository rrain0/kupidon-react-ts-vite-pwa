import { TypeU } from '@utils/common/TypeU.ts'
import {
  WidgetAtomicTransformer,
  WidgetAttr,
  WidgetMedia,
  WidgetMultiPropTransformer,
  WidgetMultiStateTransformer, WidgetProp, WidgetStateValue,
  WidgetTransformerList,
} from '@libs/widget-style-6/WidgetEntity.ts'
import isArray = TypeU.isArray





export function transform3(
  dataList: WidgetTransformerList,
  transformed: WidgetAtomicTransformer[][] = [],
  baseMedia: WidgetMedia[] = [],
  baseData: WidgetAtomicTransformer[] = [],
): WidgetAtomicTransformer[][] {
  dataList.forEach(data => {
    const m = [...baseMedia]
    const d = [...baseData]
    
    let state: WidgetMultiStateTransformer | WidgetAttr | undefined
    let prop: WidgetMultiPropTransformer | WidgetProp | undefined
    
    for (let dataI = 0; dataI < data.length; dataI++) {
      const entity = data[dataI]
      
      if (isArray(entity)) {
        return transform3(
          entity.map(e => [...e, ...data.slice(dataI + 1)]),
          transformed, m, d
        )
      }
      
      const processState = (value?: WidgetStateValue) => {
        if (state) {
          if (state.type === 'attr') {
            const stateData: WidgetAtomicTransformer[] = [state]
            if (value) stateData.push({ value: value.value, type: 'stateValue' })
            d.push(...stateData)
          }
          else if (state.type === 'state') {
            if (value) {
              return transform3(
                state.transform(value.value).map(e => [...e, ...data.slice(dataI + 1)]),
                transformed, m, d
              )
            }
            return transform3(
              state.transform().map(e => [...e, ...data.slice(dataI)]),
              transformed, m, d
            )
          }
        }
      }
      
      if (entity.type === 'media') {
        m.push(entity)
      }
      else if (entity.type === 'widget') {
        if (processState()) return
        return transform3(
          entity.transform().map(e => [...e, ...data.slice(dataI + 1)]),
          transformed, m, d
        )
      }
      else if (entity.type === 'elem') {
        if (processState()) return
        d.push(entity)
        state = undefined
        prop = undefined
      }
      else if (entity.type === 'attr' || entity.type === 'state') {
        if (processState()) return
        state = entity
        prop = undefined
      }
      else if (entity.type === 'pseudo') {
        if (processState()) return
        d.push(entity)
        state = undefined
        prop = undefined
      }
      else if (entity.type === 'pseudoElem') {
        if (processState()) return
        d.push(entity)
        state = undefined
        prop = undefined
      }
      else if (entity.type === 'stateValue') {
        if (processState(entity)) return
        state = undefined
        prop = undefined
      }
      else if (entity.type === 'prop') {
        if (processState()) return
        state = undefined
        prop = entity
      }
      else if (entity.type === 'propValue') {
        if (prop) {
          if (prop.isAtomic) {
            transformed.push([...m, ...d, prop, entity])
          }
          else {
            return transform3(
              prop.transform(entity.value).map(e => [...e, ...data.slice(dataI + 1)]),
              transformed, m, d
            )
          }
        }
        state = undefined
        prop = undefined
      }
    }
  })
  
  return transformed
}




