
import ObjectEntriesType = ObjectU.ObjectEntriesType

/*
  TODO update Typescript & vite & vite plugins & workbox & @types/node
   Then check new Iterator types to iterate through object

 */

import { ObjectU } from 'src/util/common/ObjectU'

export namespace ElemStyle {
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
  
  /!* const transformElemProp = (propAndValue: ObjectEntriesType<ObjectStyleProps>) => {
    const [prop, value] = propAndValue
  } *!/
  
  const transformStateElemProp = (propAndValue: ObjectEntriesType<StateStyleProps>) => {
    const [prop, value] = propAndValue
    
  }
  
  export const useStyle = (objectStyle: StateStyleProps): string => {
  
  }
   */
}

