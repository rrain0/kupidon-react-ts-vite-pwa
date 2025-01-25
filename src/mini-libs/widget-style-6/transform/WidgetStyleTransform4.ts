import {
  WidgetAtomicTransformer,
  WidgetAttr, WidgetStateValue, WidgetElem,
  WidgetMedia,
  WidgetProp, WidgetPropValue, WidgetPseudo, WidgetPseudoElem,
} from 'src/mini-libs/widget-style-6/WidgetEntities.ts'




export interface StatePseudoElemTf4 {
  type: 'pseudoElem'
  pseudoElem: WidgetPseudoElem
}
export interface StatePseudoTf4 {
  type: 'pseudo'
  pseudo: WidgetPseudo
}
export interface StateAttrValueTf4 {
  type: 'attr'
  attr: WidgetAttr
  value?: WidgetStateValue
}
export interface ElemStateTf4 {
  type: 'elem'
  elem: WidgetElem | undefined
  states: (StatePseudoElemTf4 | StatePseudoTf4 | StateAttrValueTf4)[]
}

export interface PropValueTf4 {
  type: 'prop'
  prop?: WidgetProp
  value?: WidgetPropValue
}


export type Transformed4 = {
  medias: WidgetMedia[]
  elems: ElemStateTf4[]
  prop: PropValueTf4
}

export function transform4(dataList: WidgetAtomicTransformer[][]): Transformed4[] {
  return dataList.map(data => {
    const tf3: Transformed4 = {
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


