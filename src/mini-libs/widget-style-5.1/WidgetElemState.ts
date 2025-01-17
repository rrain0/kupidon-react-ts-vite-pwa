import { ArrayU } from '@util/common/ArrayU.ts'
import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { CssAProp } from 'src/mini-libs/widget-style-5/css/prop/CssAProp.ts'
import uncapitalize = StringU.uncapitalize
import anyobj = TypeU.anyobj
import lastI = ArrayU.lastI
import ValueOrArr = ArrayU.ValueOrArr
import flatPush = ArrayU.flatPush



type Transformed = {
  elem: anyobj,
  value: string,
  media?: anyobj
}



export type ElemTransformData = { elem: string }
export type MediaTransformData = { media: MediaTf }
export type ElemStateTransformData = { elemState: AbstractStateTf, value?: string | undefined }
export type PropTransformData = { prop: AbstractPropTf, value: StyleValue, aProp?: CssAProp | undefined }

export type TransformData =
  | ElemTransformData
  | MediaTransformData
  | ElemStateTransformData
  | PropTransformData



export type StyleValue =
  | string // pass as is if there are no special values or transformations
  | number // transform to fractions or pixels
  | null // set empty value (background: none, color: transparent)
  | undefined // remove value definition


export abstract class Transformer {
  abstract transform(value?: string): ValueOrArr<TransformData>
}

export abstract class AbstractStateTf extends Transformer {
  abstract readonly values: Record<string, any> | null
}
export abstract class AbstractPropTf extends Transformer {
  abstract override transform(value?: StyleValue): ValueOrArr<TransformData>
}


export class MediaTf extends Transformer {
  constructor(
    // '(hover: hover) and (pointer: fine)'
    readonly media: string
  ) { super() }
  values = null
  override transform(): TransformData {
    return { media: this }
  }
}
export class ElemPseudoTf extends AbstractStateTf {
  constructor(
    // 'hover'
    readonly pseudoClass: string
  ) { super() }
  values = null
  override transform(): TransformData {
    return { elemState: this }
  }
}
export class ElemAttrTf extends AbstractStateTf {
  constructor(
    // 'type'
    readonly attr: string,
    // { radio: '', checkbox: '' }
    readonly values: Record<string, any> | null = null
  ) { super() }
  override transform(value: string = ''): TransformData {
    return { elemState: this, value }
  }
}
export class PropTf extends AbstractPropTf {
  constructor(
    // 'background'
    readonly prop: string
  ) { super() }
  override transform(value: StyleValue = ''): TransformData {
    return { prop: this, value }
  }
}










export const hoverableMedia = '(hover: hover) and (pointer: fine)'






const Medias = {
  hoverable: new MediaTf(hoverableMedia),
}
const PseudoClasses = {
  hover: new ElemPseudoTf('hover'),
}
const Attrs = {
  type: new ElemAttrTf('type', { radio: '', checkbox: '' }),
}
const Props = {
  width: new PropTf('width'),
  height: new PropTf('height'),
  background: new PropTf('background'),
}




const ComplexTransformers = {
  
  hover: new class extends AbstractStateTf {
    values = null
    transform() {
      const props = [] as TransformData[]
      flatPush(props, Medias.hoverable.transform())
      flatPush(props, PseudoClasses.hover.transform())
      return props
    }
  }(),
  
  size: new class extends AbstractPropTf {
    transform(value) {
      const props = [] as TransformData[]
      flatPush(props, Props.width.transform(value))
      flatPush(props, Props.height.transform(value))
      return props
    }
    
  }(),
  
}






export type WidgetStyle = Record<string, StyleValue /* | WidgetStyle */>

const Common = {
  width: Props.width,
  w: Props.width,
  height: Props.height,
  h: Props.height,
  size: ComplexTransformers.size,
  sz: ComplexTransformers.size,
  background: Props.background,
  bg: Props.background,
}
const States = {
  hover: ComplexTransformers.hover,
  type: Attrs.type,
}

export function transform1(style: WidgetStyle) {
  const data: TransformData[][] = []
  
  type EntityEntries = Record<string, AbstractStateTf | any>
  let contextStack: Array<EntityEntries | undefined> = [Common, undefined, undefined, undefined]
  // slot indexes for entities
  const commonI = 0
  const elementsI = 1
  const statesI = 2 // pseudoClass, attr
  const valuesI = 3 // attr value
  
  contextStack[statesI] = States
  
  for (const [selectProp, value] of Object.entries(style)) {
    const d: TransformData[] = []
    let p = selectProp
    loop: while (p) {
      p = uncapitalize(p)
      
      for (let ctx = lastI(contextStack); ctx >= 0; ctx--) {
        const context = contextStack[ctx]
        if (context) for (const [name, entity] of Object.entries(context)) {
          // TODO split 'p' by capital letters and check using 'in' operator
          
          if (p.startsWith(name)) {
            p = p.slice(name.length)
            
            // found elem state
            if (entity instanceof AbstractStateTf) {
              d.push({ elemState: entity })
              contextStack = contextStack.slice(0, valuesI)
              if (entity.values) contextStack[valuesI] = entity.values
            }
            // found attr value
            else if (ctx === valuesI) {
              if (!d.length) d.push({ } as ElemStateTransformData)
              ;(d.at(-1) as ElemStateTransformData).value = name
              contextStack = contextStack.slice(0, statesI + 1)
            }
            // found prop
            else if (entity instanceof AbstractPropTf) {
              d.push({ prop: entity, value })
              break loop
            }
            
            continue loop
          }
        }
      }
      
      throw new Error(`Unknown property: ${p}`)
    }
    data.push(d)
  }
  
  return data
}


export function testWidget51Transform() {
  const widgetStyle = {
    hoverTypeRadioBg: 'white',
    typeCheckboxSz: '40%',
  }
  console.log(`'transform(${JSON.stringify(widgetStyle)})'`, transform1(widgetStyle))
}



