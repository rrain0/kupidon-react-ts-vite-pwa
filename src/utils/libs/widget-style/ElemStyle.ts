import { TypeU } from 'src/utils/base/TypeU'
import RecordRo = TypeU.RecordRo
import RecordPuro = TypeU.RecordPuro







export namespace ElemStyle {
  
  
  
  
  type NonEmptyString = Exclude<string, ''>
  
  const StateValues = ['hover', 'focus'] as const
  type States = Exclude<typeof StateValues[number], ''>
  
  const ElementNames = ['button'/* , 'border' */] as const
  type Elements = Exclude<typeof ElementNames[number], ''>
  
  type BackgroundProp = ['background' | 'bg', string]
  type SizeProp = ['size' | 'sz', 'full' | string | number]
  type Props = Exclude<BackgroundProp[0] | SizeProp[0], ''>
  
  type StateElemProp =
    | `${States}${Capitalize<Elements>}${Capitalize<Props>}`
    | `${States}${Capitalize<Props>}`
    | `${Elements}${Capitalize<Props>}`
    | Props
  
  const myStyle0: RecordPuro<StateElemProp, string> = {
    bg: '#c0ffee',
    size: 'full',
    buttonBg: 'red',
    hoverBg: 'green',
  }
  

  
  
  
  type PropTransformer = (value: string) => readonly [value: string, propMedia: string]
  
  const transformBackground: PropTransformer = (value) => {
    return [`background: ${value};`, '']
  }
  const transformSize: PropTransformer = (value) => {
    if (value === 'full') value = '100%'
    return [`width: ${value}; height: ${value};`, '']
  }
  
  
  const mapPropNameToTransformer: RecordPuro<string, PropTransformer> = {
    'background': transformBackground,
    'bg': transformBackground,
    'size': transformSize,
    'sz': transformSize,
  }
  
  const hoverableMedia = '(hover: hover) and (pointer: fine)'
  
  type StateTransformer = () => readonly [state: string, stateMedia: string]
  /*
  .class {
    :focus {}
    &[data-error] {}
  }
  @media (hover: hover) and (pointer: fine) {
    .class {
      :hover {}
    }
  }
   */
  const transformHover: StateTransformer = () => {
    return [':hover', hoverableMedia]
  }
  const transformError: StateTransformer = () => {
    return ['[data-error]', '']
  }
  const transformAnyFocus: StateTransformer = () => {
    return [':where(:active,:focus,:focus-visible)', '']
  }
  // TODO :hover must include media, but focus-visible not
  const transformInFocus: StateTransformer = () => {
    return [':where(:hover,:focus-visible)', '']
  }
  
  const mapStateNameToTransformer: RecordPuro<string, StateTransformer> = {
    hover: transformHover,
    error: transformError,
  }
  
  type TransformStateElemProp = (propAndValue: readonly [string, string]) => string
  const transformStateElemProp: TransformStateElemProp = (propAndValue) => {
    const [stateElemProp, inputValue] = propAndValue
    
    let isFirstProp = true
    const uncapitalaze = (p: string) => {
      if (isFirstProp) {
        isFirstProp = false
        return p
      }
      return p[0].toLowerCase() + p.slice(1)
    }
    
    const [state, elemProp, stateMedia] = (() => {
      const p = uncapitalaze(stateElemProp)
      if (p.startsWith('hover')) {
        return [':hover', p.slice('hover'.length), hoverableMedia]
      }
      return ['', stateElemProp, '']
    })()
    
    const [elem, prop, elemMedia] = (() => {
      const p = uncapitalaze(elemProp)
      if (p.startsWith('frame')) {
        return [`.frame${state}`, p.slice('frame'.length), '']
      }
      if (p.startsWith('box')) {
        return [`.frame${state} > .box`, p.slice('box'.length), '']
      }
      return [`${state}`, elemProp, '']
    })()
    
    const [value, propMedia] = (() => {
      const p = uncapitalaze(prop)
      const transformer = mapPropNameToTransformer[p]
      if (!transformer) throw new Error(`Unknown [property, value]: ${propAndValue}`)
      return transformer(inputValue)
    })()
    
    let css = value
    
    if (elem) {
      css = `&${elem} { ${css} }`
    }
    
    if (stateMedia) {
      css = `@media ${stateMedia} { ${css} }`
    }
    if (elemMedia) {
      css = `@media ${elemMedia} { ${css} }`
    }
    if (propMedia) {
      css = `@media ${propMedia} { ${css} }`
    }
    
    return css
  }
  
  
  export const transformObjectStyle = (objectStyle: RecordRo<string, string>): string => {
    const parts: string[] = []
    Object.entries(objectStyle).forEach((propAndValue) => {
      parts.push(transformStateElemProp(propAndValue))
    })
    return parts.join('\n')
  }
  
  const myStyle: Record<string, string> = {
    bg: '#c0ffee',
    size: 'full',
    hoverBg: 'green',
  }
  
  const myCss = transformObjectStyle(myStyle)
  
  
}

