import {
  WidgetAtomicTransformer,
  WidgetAttr, WidgetStateValue, WidgetElem,
  WidgetMedia,
  WidgetProp, WidgetPropValue, WidgetPseudo, WidgetPseudoElem,
} from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'




export interface StatePseudoElemTf3 {
  type: 'pseudoElem'
  pseudoElem: WidgetPseudoElem
}
export interface StatePseudoTf3 {
  type: 'pseudo'
  pseudo: WidgetPseudo
}
export interface StateAttrValueTf3 {
  type: 'attr'
  attr: WidgetAttr
  value?: WidgetStateValue
}
export interface ElemStateTf3 {
  type: 'elem'
  elem: WidgetElem | undefined
  states: (StatePseudoElemTf3 | StatePseudoTf3 | StateAttrValueTf3)[]
}

export interface PropValueTf3 {
  type: 'prop'
  prop?: WidgetProp
  value?: WidgetPropValue
}


export type Transformed3 = {
  medias: WidgetMedia[]
  elems: ElemStateTf3[]
  prop: PropValueTf3
}

export function transform3(dataList: WidgetAtomicTransformer[][]): Transformed3[] {
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


