import {
  AtomicTransformer1,
  AttrTransformer1, StateValueTransformer1, ElemTransformer1,
  MediaTransformer1,
  PropTransformer1, PropValueTransformer1, PseudoTransformer1, PseudoElemTransformer1,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'




export interface StatePseudoElemTf3 {
  type: 'pseudoElem'
  pseudoElem: PseudoElemTransformer1
}
export interface StatePseudoTf3 {
  type: 'pseudo'
  pseudo: PseudoTransformer1
}
export interface StateAttrValueTf3 {
  type: 'attr'
  attr: AttrTransformer1
  value?: StateValueTransformer1
}
export interface ElemStateTf3 {
  type: 'elem'
  elem: ElemTransformer1 | undefined
  states: (StatePseudoElemTf3 | StatePseudoTf3 | StateAttrValueTf3)[]
}

export interface PropValueTf3 {
  type: 'prop'
  prop?: PropTransformer1
  value?: PropValueTransformer1
}


export type Transformed3 = {
  medias: MediaTransformer1[]
  elems: ElemStateTf3[]
  prop: PropValueTf3
}

export function transform3(dataList: AtomicTransformer1[][]): Transformed3[] {
  return dataList.map(data => {
    const tf3: Transformed3 = {
      medias: [],
      elems: [],
      prop: { type: 'prop' },
    }
    data.forEach(d => {
      if (d.type === 'media') {
        tf3.medias.push(d)
      }
      else if (d.type === 'elem') {
        tf3.elems.push({ type: 'elem', elem: d, states: [] })
      }
      else if (d.type === 'pseudoElem') {
        tf3.elems[0] ??= { type: 'elem', elem: undefined, states: [] }
        tf3.elems.at(-1)!.states.push({ type: 'pseudoElem', pseudoElem: d })
      }
      else if (d.type === 'pseudo') {
        tf3.elems[0] ??= { type: 'elem', elem: undefined, states: [] }
        tf3.elems.at(-1)!.states.push({ type: 'pseudo', pseudo: d })
      }
      else if (d.type === 'attr') {
        tf3.elems[0] ??= { type: 'elem', elem: undefined, states: [] }
        tf3.elems.at(-1)!.states.push({ type: 'attr', attr: d })
      }
      else if (d.type === 'prop') {
        tf3.prop.prop = d
      }
      else if (d.type === 'stateValue') {
        const lastState = tf3.elems.at(-1)?.states.at(-1)
        if (lastState?.type === 'attr') lastState.value = d
      }
      else if (d.type === 'propValue') {
        tf3.prop.value = d
      }
    })
    return tf3
  })
}


