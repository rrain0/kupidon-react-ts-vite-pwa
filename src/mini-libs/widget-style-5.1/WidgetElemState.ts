import { ArrayU } from '@util/common/ArrayU.ts'
import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { CssAProp } from 'src/mini-libs/widget-style-5/css/prop/CssAProp.ts'
import uncapitalize = StringU.uncapitalize
import anyobj = TypeU.anyobj
import lastI = ArrayU.lastI
import isobject = TypeU.isobject
import isnumber = TypeU.isnumber





export type MediaTransformData = { media: MediaTf }
export type ElemTransformData = { elem: ElemTf }
export type ElemStateTransformData = { elemState: AbstractStateTf }
export type ElemStateValueTransformData = { stateValue: string }
export type PropTransformData = { prop: AbstractPropTf, aProp?: CssAProp | undefined }
export type PropValueTransformData = { propValue: StyleValue }

export type TransformData =
  | MediaTransformData
  | ElemTransformData
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


export class MediaTf extends Transformer {
  constructor(
    // '(hover: hover) and (pointer: fine)'
    readonly media: string
  ) { super() }
  values = undefined
  override transform(): TransformData[] {
    return [{ media: this }]
  }
}
export class ElemTf extends Transformer {
  constructor(
    readonly name: string,
    readonly states: Record<string, AbstractPropTf> | undefined = undefined,
    readonly props: Record<string, AbstractPropTf> | undefined = undefined,
  ) { super() }
  transform(): TransformData[] {
    return [{ elem: this }]
  }
}
export abstract class AbstractStateTf extends Transformer {
  abstract readonly values: Record<string, any> | undefined
}
export abstract class AbstractPropTf extends Transformer {
  abstract override transform(value?: StyleValue): TransformData[]
}




export class ElemPseudoTf extends AbstractStateTf {
  constructor(
    // 'hover'
    readonly pseudoClass: string
  ) { super() }
  values = undefined
  override transform(): TransformData[] {
    return [{ elemState: this }]
  }
}
export class ElemAttrTf extends AbstractStateTf {
  constructor(
    // 'type'
    readonly attr: string,
    // { radio: '', checkbox: '' }
    readonly values: Record<string, any> | undefined = undefined
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
  override transform(value: StyleValue): TransformData[] {
    return [{ prop: this }, { propValue: value }]
  }
}










export const hoverableMedia = '(hover: hover) and (pointer: fine)'






const Medias = {
  hoverable: new MediaTf(hoverableMedia),
} satisfies Record<string, Transformer>
const PseudoClasses = {
  hover: new ElemPseudoTf('hover'),
  focusVisible: new ElemPseudoTf('focus-visible'),
} satisfies Record<string, Transformer>
const Attrs = {
  type: new ElemAttrTf('type', { radio: '', checkbox: '' }),
} satisfies Record<string, Transformer>
const Props = {
  width: new class Width extends PropTf {
    override transform(value: StyleValue): TransformData[] {
      if (value === undefined) return []
      if (value === null) value = 0
      if (value === 'full') value = '100%'
      if (isnumber(value)) value = `${value}px`
      return super.transform(value)
    }
  }('width'),
  height: new class Height extends PropTf {
    override transform(value: StyleValue): TransformData[] {
      if (value === undefined) return []
      if (value === null) value = 0
      if (value === 'full') value = '100%'
      if (isnumber(value)) value = `${value}px`
      return super.transform(value)
    }
  }('height'),
  background: new PropTf('background'),
} satisfies Record<string, Transformer>



namespace ComplexTransformers {
  
  // just 'radio' instead of 'typeRadio'
  export const radio = new class TypeRadio extends AbstractStateTf {
    values = undefined
    transform() {
      return [
        { elemState: Attrs.type },
        { stateValue: 'radio' },
      ]
    }
  }()
  
  export const hover = new class HoverableHover extends AbstractStateTf {
    values = undefined
    transform() {
      return [
        ...Medias.hoverable.transform(),
        ...PseudoClasses.hover.transform(),
      ]
    }
  }()
  
  export const inFocus = new class InFocus extends AbstractStateTf {
    values = undefined
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

type EntitiesRecord = Record<string, Transformer>
type EntitiesRecordArray = Array<EntitiesRecord | undefined>


// slot indexes for context entities
const ctxCommonI = 0
const ctxElementsI = 1
const ctxStatesI = 2 // record of pseudoClasses, attrs
const ctxStateValuesI = 3 // record of attr values
const ctxElemPropI = 4 // record of elem props

export function transform1(
  style: WidgetStyle,
  baseContextStack: EntitiesRecordArray,
  dataList: TransformData[][] = [],
  baseData: TransformData[] = []
) {
  for (const [selectProp, value] of Object.entries(style)) {
    const contextStack = [...baseContextStack]
    const data: TransformData[] = [...baseData]
    let p = selectProp
    
    loop: while (true) {
      if (!p) {
        if (isobject(value)) {
          dataList = transform1(value, contextStack, dataList, data)
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
            if (entity instanceof ElemTf) {
              data.push({ elem: entity })
              contextStack[ctxStatesI] = entity.states
              contextStack[ctxStateValuesI] = undefined
              contextStack[ctxElemPropI] = entity.props
            }
            // found elem state (attr, pseudoClass)
            else if (entity instanceof AbstractStateTf) {
              data.push({ elemState: entity })
              contextStack[ctxStateValuesI] = entity.values
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





const CommonProps = {
  width: Props.width,
  w: Props.width,
  height: Props.height,
  h: Props.height,
  size: ComplexTransformers.size,
  sz: ComplexTransformers.size,
  background: Props.background,
  bg: Props.background,
} satisfies Record<string, Transformer>

const Elements = {
  frame: new ElemTf('frame', {
    hover: ComplexTransformers.hover,
    focusVisible: PseudoClasses.focusVisible,
    inFocus: ComplexTransformers.inFocus,
    radio: ComplexTransformers.radio,
    type: Attrs.type,
  }),
  box: new ElemTf('box', {
    hover: ComplexTransformers.hover,
  }),
} satisfies Record<string, Transformer>

const RootElemStates = {
  hover: ComplexTransformers.hover,
  type: Attrs.type,
} satisfies Record<string, Transformer>




type Transformed = {
  elem: anyobj,
  value: string,
  media?: anyobj
}

export function transform2(dataList: TransformData[][]): TransformData[][] {
  return dataList.map(data => {
    const media: TransformData[] = []
    const d: TransformData[] = []
    
    let propValue: PropValueTransformData | undefined
    let stateValue: ElemStateValueTransformData | undefined
    
    for (let di = data.length - 1; di >= 0; di--) {
      const entity = data[di]
      if ('propValue' in entity) {
        propValue = entity
        stateValue = undefined
      }
      else if ('prop' in entity) {
        d.unshift(...entity.prop.transform(propValue?.propValue))
        propValue = undefined
        stateValue = undefined
      }
      else if ('stateValue' in entity) {
        propValue = undefined
        stateValue = entity
      }
      else if ('elemState' in entity) {
        d.unshift(...entity.elemState.transform(stateValue?.stateValue))
        propValue = undefined
        stateValue = undefined
      }
      else if ('elem' in entity) {
        d.unshift(...entity.elem.transform())
        propValue = undefined
        stateValue = undefined
      }
      else if ('media' in entity) {
        media.unshift(...entity.media.transform())
      }
      
    }
    return [...media, ...d]
  })
}




export function testWidget51Transform() {
  const widgetStyle = {
    hoverTypeRadioBg: 'white',
    frameTypeCheckboxBoxSz: '40%',
    frameRadioBg: 'indianred',
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
  console.log('widgetStyle', widgetStyle)
  
  const transformed1 = transform1(
    widgetStyle,
    [CommonProps, Elements, RootElemStates, undefined, undefined]
  )
  console.log('transformed1', transformed1)
  
  const transformed2 = transform2(transformed1)
  console.log('transformed2', transformed2)
}
