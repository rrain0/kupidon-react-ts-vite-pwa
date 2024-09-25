import { ObjectU } from 'src/util/common/ObjectU'
import { TypeU } from 'src/util/common/TypeU'
import RecordRo = TypeU.RecordRo
import ObjectEntriesType = ObjectU.ObjectEntriesType
import Puro = TypeU.Puro
import RecordPuro = TypeU.RecordPuro




/*
  TODO update Typescript & vite & vite plugins & workbox & @types/node
   Then check new Iterator types to iterate through object

 */


export namespace ElemStyle {
  
  const StateValues = ['hover', 'focus'] as const
  type States = typeof StateValues[number]
  
  const ElementNames = ['button', 'border'] as const
  type Elements = typeof ElementNames[number]
  
  type BackgroundProp = ['background' | 'bg', string]
  type SizeProp = ['size' | 'sz', 'full' | string | number]
  type Props = BackgroundProp[0] | SizeProp[0]
  
  type StateElemProp =
    | `${States}${Capitalize<Elements>}${Capitalize<Props>}`
    | `${States}${Capitalize<Props>}`
    | `${Elements}${Capitalize<Props>}`
    | Props
  
  const myStyle0: RecordPuro<StateElemProp, string> = {
    bg: '#c0ffee',
    size: 'full',
    hoverBg: 'green',
  }
  
  /*
  type BackgroundProp = ['background' | 'bg', string]
  type SizeProp = ['size' | 'sz', 'full' | string]
  
  
  
  export const StateValues = ['', 'hover', 'Hover', 'focus', 'Focus'] as const
  export type States = typeof StateValues[number]
  
  export type StateStyleProps = {
    [`${StateValues[number]}${BackgroundProp[0]}`]: any
  };
  
  const transformBackground = ([prop, value]: BackgroundProp) => {
    return `background: ${value};`
  }
  
  const transformSize = ([prop, value]: SizeProp) => {
    if (value === 'full') value = '100%'
    return `width: ${value}; height: ${value};`
  }
  
  const transformProp = (propAndValue: ObjectEntriesType<StateStyleProps>) => {
    const [prop, value] = propAndValue
    if (prop === 'background') return transformBackground(propAndValue)
    if (prop === 'bg') return transformBackground(propAndValue)
    throw new Error(`Unknown [property, value]: ${propAndValue}`)
  }
  
  const transformElemProp = (propAndValue: ObjectEntriesType<ObjectStyleProps>) => {
    const [prop, value] = propAndValue
  }
  
  const transformStateElemProp = (propAndValue: ObjectEntriesType<StateStyleProps>) => {
    const [prop, value] = propAndValue
    
  }
  
  export const useStyle = (objectStyle: StateStyleProps): string => {
  
  }
   */
  
  const transformBackground = ([prop, value]: readonly [string, string]): string => {
    return `background: ${value};`
  }
  
  const transformSize = ([prop, value]: readonly [string, string]): string => {
    if (value === 'full') value = '100%'
    return `width: ${value}; height: ${value};`
  }
  
  const transformProp = (propAndValue: readonly [string, string]): string => {
    const [prop, value] = propAndValue
    if (prop === 'background') return transformBackground(propAndValue)
    if (prop === 'Background') return transformBackground(propAndValue)
    if (prop === 'bg') return transformBackground(propAndValue)
    if (prop === 'Bg') return transformBackground(propAndValue)
    if (prop === 'size') return transformSize(propAndValue)
    if (prop === 'Size') return transformSize(propAndValue)
    if (prop === 'sz') return transformSize(propAndValue)
    if (prop === 'Sz') return transformSize(propAndValue)
    throw new Error(`Unknown [property, value]: ${propAndValue}`)
  }
  
  
  
  const transformElemProp = (propAndValue: readonly [string, string]): string => {
    const [prop, value] = propAndValue
    return transformProp(propAndValue)
  }
  
  
  
  const hoverable = '@media (hover: hover) and (pointer: fine)'
  const applyHover = (css: string) => `${hoverable}{ :hover { ${css} } }`
  
  const transformStateElemProp = (propAndValue: readonly [string, string]): string => {
    const [prop, value] = propAndValue
    if (prop.startsWith('Hover')) {
      const propWithoutState = prop.slice('Hover'.length)
      const css = transformElemProp([propWithoutState, value])
      return applyHover(css)
    }
    if (prop.startsWith('hover')) {
      const propWithoutState = prop.slice('hover'.length)
      const css = transformElemProp([propWithoutState, value])
      return applyHover(css)
    }
    return transformElemProp([prop, value])
  }
  
  export const transformObjectStyle = (objectStyle: RecordRo<string, string>): string => {
    const parts: string[] = []
    Object.entries(objectStyle).forEach((propAndValue) => {
      parts.push(transformStateElemProp(propAndValue))
    })
    return parts.join(' ')
  }
  
  const myStyle: Record<string, string> = {
    bg: '#c0ffee',
    size: 'full',
    hoverBg: 'green',
  }
  
  const myCss = transformObjectStyle(myStyle)
  
  
}

