import { ArrayU } from '@util/common/ArrayU.ts'
import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { CssAProp } from 'src/mini-libs/widget-style-5/css/prop/CssAProp.ts'
import uncapitalize = StringU.uncapitalize
import anyobj = TypeU.anyobj
import lastI = ArrayU.lastI
import ValueOrArr = ArrayU.ValueOrArr
import flatPush = ArrayU.flatPush
import isobject = TypeU.isobject



type Transformed = {
  elem: anyobj,
  value: string,
  media?: anyobj
}



export type ElemTransformData = { elem: string }
export type MediaTransformData = { media: MediaTf }
export type ElemStateTransformData = { elemState: AbstractStateTf }
export type ElemStateValueTransformData = { stateValue: string }
export type PropTransformData = { prop: AbstractPropTf, aProp?: CssAProp | undefined }
export type PropValueTransformData = { propValue: StyleValue }

export type TransformData =
  | ElemTransformData
  | MediaTransformData
  | ElemStateTransformData
  | ElemStateValueTransformData
  | PropTransformData
  | PropValueTransformData



export type StyleValue =
  | string // pass as is if there are no special values or transformations
  | number // transform to fractions or pixels
  | null // set empty value (background: none, color: transparent)
  | undefined // remove value definition


export abstract class Transformer {
  abstract transform(value?: string): TransformData[]
}

export abstract class AbstractStateTf extends Transformer {
  abstract readonly values: Record<string, any> | null
}
export abstract class AbstractPropTf extends Transformer {
  abstract override transform(value?: StyleValue): TransformData[]
}


export class MediaTf extends Transformer {
  constructor(
    // '(hover: hover) and (pointer: fine)'
    readonly media: string
  ) { super() }
  values = null
  override transform(): TransformData[] {
    return [{ media: this }]
  }
}
export class ElemPseudoTf extends AbstractStateTf {
  constructor(
    // 'hover'
    readonly pseudoClass: string
  ) { super() }
  values = null
  override transform(): TransformData[] {
    return [{ elemState: this }]
  }
}
export class ElemAttrTf extends AbstractStateTf {
  constructor(
    // 'type'
    readonly attr: string,
    // { radio: '', checkbox: '' }
    readonly values: Record<string, any> | null = null
  ) { super() }
  override transform(value: string = ''): TransformData[] {
    return [{ elemState: this }, { stateValue: value }]
  }
}
export class PropTf extends AbstractPropTf {
  constructor(
    // 'background'
    readonly prop: string
  ) { super() }
  override transform(value: StyleValue = ''): TransformData[] {
    return [{ prop: this }, { propValue: value }]
  }
}










export const hoverableMedia = '(hover: hover) and (pointer: fine)'






const Medias = {
  hoverable: new MediaTf(hoverableMedia),
}
const PseudoClasses = {
  hover: new ElemPseudoTf('hover'),
  focusVisible: new ElemPseudoTf('focus-visible'),
}
const Attrs = {
  type: new ElemAttrTf('type', { radio: '', checkbox: '' }),
}
const Props = {
  width: new PropTf('width'),
  height: new PropTf('height'),
  background: new PropTf('background'),
}



namespace ComplexTransformers {
  
  // TODO make 'radio' instead of 'typeRadio'
  /* export const radio = new class TypeRadio extends AbstractStateTf {
    values = null
    transform() {
      const props = [] as TransformData[]
      flatPush(props, Attrs.type.transform())
      //flatPush(props, PseudoClasses.hover.transform())
      return props
    }
  }() */
  
  export const hover = new class HoverableHover extends AbstractStateTf {
    values = null
    transform() {
      return [
        ...Medias.hoverable.transform(),
        ...PseudoClasses.hover.transform(),
      ]
    }
  }()
  
  export const inFocus = new class InFocus extends AbstractStateTf {
    values = null
    transform() {
      return [
        ...ComplexTransformers.hover.transform(),
        ...PseudoClasses.focusVisible.transform(),
      ]
    }
  }()
  
  export const size = new class Size extends AbstractPropTf {
    transform(value) {
      return [
        ...Props.width.transform(value),
        ...Props.height.transform(value),
      ]
    }
  }()
  
}








export type WidgetStyle = { [selectorProp: string]: StyleValue | WidgetStyle }

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

type EntitiesRecord = Record<string, Transformer>
type EntitiesRecordArray = Array<EntitiesRecord | undefined>

export function transform1(
  style: WidgetStyle,
  dataList: TransformData[][] = [],
  baseContextStack: EntitiesRecordArray = [Common, undefined, States],
  baseData: TransformData[] = []
) {
  
  // slot indexes for entities
  const ctxCommonI = 0
  const ctxElementsI = 1
  const ctxStatesI = 2 // record of pseudoClasses, attrs
  const ctxStateValuesI = 3 // record of attr values
  
  for (const [selectProp, value] of Object.entries(style)) {
    let contextStack = [...baseContextStack]
    const data: TransformData[] = [...baseData]
    let p = selectProp
    
    loop: while (true) {
      if (!p) {
        if (isobject(value)) {
          dataList = transform1(value, dataList, contextStack, data)
        }
        break
      }
      p = uncapitalize(p)
      
      for (let ctxI = lastI(contextStack); ctxI >= 0; ctxI--) {
        const context = contextStack[ctxI]
        if (context) for (const [name, entity] of Object.entries(context)) {
          // TODO split 'p' by capital letters and check using 'in' operator
          
          if (p.startsWith(name)) {
            p = p.slice(name.length)
            
            // found elem state (attr, pseudoClass)
            if (entity instanceof AbstractStateTf) {
              data.push({ elemState: entity })
              contextStack = contextStack.slice(0, ctxStateValuesI)
              if (entity.values) contextStack[ctxStateValuesI] = entity.values
            }
            // found prop
            else if (entity instanceof AbstractPropTf) {
              if (!isobject(value)) {
                data.push({ prop: entity })
                data.push({ propValue: value })
                dataList.push(data)
              }
              break loop
            }
            // found state value (attr value)
            else if (ctxI === ctxStateValuesI) {
              data.push({ stateValue: name })
              contextStack = contextStack.slice(0, ctxStateValuesI)
            }
            
            continue loop
          }
        }
      }
      
      throw new Error(`Unknown property: ${p}`)
    }
  }
  
  return dataList
}



export function testWidget51Transform1() {
  const widgetStyle = {
    hoverTypeRadioBg: 'white',
    typeCheckboxSz: '40%',
    typeRadio: {
      bg: 'black',
      sz: 100,
    },
    type: {
      checkbox: {
        bg: 'red',
        sz: 200,
      },
      radio: {
        bg: 'green',
        sz: 'full',
      },
    },
  }
  const widgetStyle2 = {
    type: {
      checkbox: {
        bg: 'red',
      },
      radio: {
        bg: 'green',
      },
    },
  }
  
  console.log(`transform(${JSON.stringify(widgetStyle)})`, transform1(widgetStyle))
}



export function transform2(data: TransformData[][]) {

}


