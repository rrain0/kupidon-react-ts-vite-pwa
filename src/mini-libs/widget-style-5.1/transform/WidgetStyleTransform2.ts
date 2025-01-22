import { TypeU } from '@util/common/TypeU.ts'
import {
  AtomicTransformer1,
  AttrTransformer1,
  MediaTransformer1,
  MultiPropTransformer1,
  MultiStateTransformer1, PropTransformer1,
  Transformer1List,
} from 'src/mini-libs/widget-style-5.1/transform/WidgetStyleTransform1.ts'
import isArray = TypeU.isArray





export function transform2(
  dataList: Transformer1List,
  transformed: AtomicTransformer1[][] = [],
  baseMedia: MediaTransformer1[] = [],
  baseData: AtomicTransformer1[] = [],
): AtomicTransformer1[][] {
  dataList.forEach(data => {
    const m = [...baseMedia]
    const d = [...baseData]
    
    let state: MultiStateTransformer1 | AttrTransformer1 | undefined
    let prop: MultiPropTransformer1 | PropTransformer1 | undefined
    
    for (let dataI = 0; dataI < data.length; dataI++) {
      const entity = data[dataI]
      
      if (isArray(entity)) {
        return transform2(
          entity.map(e => [...e, ...data.slice(dataI + 1)]),
          transformed, m, d
        )
      }
      
      const processState = (value?: string) => {
        if (state) {
          if (state.type === 'attr') {
            const stateData: AtomicTransformer1[] = [state]
            if (value) stateData.push({ value, type: 'stateValue' })
            d.push(...stateData)
          }
          else if (state.type === 'state') {
            const nextI = entity.type === 'stateValue' ? dataI + 1 : dataI
            return transform2(
              state.transform(value).map(e => [...e, ...data.slice(nextI)]),
              transformed, m, d
            )
          }
        }
      }
      
      if (entity.type === 'media') {
        m.push(entity)
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
        if (processState(entity.value)) return
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
            d.push(prop, entity)
          }
          else {
            return transform2(
              prop.transform(entity.value).map(e => [...e, ...data.slice(dataI + 1)]),
              transformed, m, d
            )
          }
        }
        state = undefined
        prop = undefined
      }
      
      // last must be value after prop so no need to check 'state' & 'prop'
      if (dataI === data.length - 1) transformed.push([...m, ...d])
    }
  })
  
  return transformed
}




