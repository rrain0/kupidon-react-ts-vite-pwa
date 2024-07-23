import React, { CSSProperties } from 'react'
import { ObjectU } from 'src/util/common/ObjectU'
import { TypeU } from 'src/util/common/TypeU.ts'
import Puro = TypeU.Puro




export namespace ReactU {
  
  
  import ObjectMap = ObjectU.ObjectMap
  export type ChildrenProps = Puro<{ children: React.ReactNode }>
  
  export type ClassStyleProps = Puro<{
    className: string
    style: CSSProperties
  }>
  
  
  export type First = Puro<{ first: boolean }>
  export type Last = Puro<{ last: boolean }>
  
  
  
  const stopReactEventPropagation = (ev: React.BaseSyntheticEvent) => {
    ev.stopPropagation()
  }
  export const stopPointerAndMouseEvents = (stop = true) => {
    if (!stop) return { }
    return {
      onClick: stopReactEventPropagation,
      
      onMouseDown: stopReactEventPropagation,
      onMouseMove: stopReactEventPropagation,
      onMouseUp: stopReactEventPropagation,
      onMouseOut: stopReactEventPropagation,
      
      onMouseEnter: stopReactEventPropagation,
      onMouseOver: stopReactEventPropagation,
      onMouseLeave: stopReactEventPropagation,
      
      onWheel: stopReactEventPropagation,
      
      onPointerDown: stopReactEventPropagation,
      onPointerMove: stopReactEventPropagation,
      onPointerUp: stopReactEventPropagation,
      onPointerOut: stopReactEventPropagation,
      onPointerCancel: stopReactEventPropagation,
      
      onPointerEnter: stopReactEventPropagation,
      onPointerOver: stopReactEventPropagation,
      onPointerLeave: stopReactEventPropagation,
      
      onTouchStart: stopReactEventPropagation,
      onTouchMove: stopReactEventPropagation,
      onTouchEnd: stopReactEventPropagation,
      onTouchCancel: stopReactEventPropagation,
    }
  }
  
  
  // todo hack fix
  // React.memo wrapper if component's generics are not consumed properly by ts
  export const memo = <C>(Component: C): C => {
    return React.memo(Component as any) as C
  }
  
  
  
  export const combineEvHandlers =
  <E extends React.SyntheticEvent<any>>
  (...handlers: Array<React.EventHandler<E> | undefined>): React.EventHandler<E> => {
    return ev => handlers.forEach(h => h?.(ev))
  }
  
  
  
  // todo fix types
  /* export const combineEvHandlerRecord =
  <
    R extends Partial<Record<keyof React.DOMAttributes<any>, React.EventHandler<E>>>,
    O extends Partial<Record<keyof React.DOMAttributes<any>, any>>,
  >
  (handlers: R, otherHandlers: O): R => {
    return ObjectMap<any, any>(handlers, ([prop, h]) => [
      prop,
      ev => {
        h?.(ev)
        otherHandlers[prop]?.(ev)
      },
    ]) as unknown as R
  } */
  export const combineEvHandlerRecord = (handlers: any, otherHandlers: any): any => {
    return ObjectMap<any, any>(handlers, ([prop, h]) => [
      prop,
      ev => {
        h?.(ev)
        otherHandlers[prop]?.(ev)
      },
    ])
  }
  
  

  
  /*
  export const arrMapAndMergeIfNotEq =
  <T>(orig: T[], other: T[], comparator: ComparatorEq<T>): T[] => {
    const merged = [...orig]
    let changed = false
    for (let i = 0; i < Math.min(orig.length, other.length); i++) {
      if (!comparator(merged[i], other[i])) {
        merged[i] = other[i]
        changed = true
      }
    }
    if (changed) return merged
    return orig
  }
  */
  
  
  export const arrMerge =
  <A1 extends any[], A2 extends any[]>(arr1: A1, arr2: A2, arr2AsArr1: A1, arr1AsArr2: A2): A1 => {
    const newArr1 = [...arr1] as A1
    let changed = false
    for (let i = 0; i < Math.min(arr2.length, arr1.length); i++) {
      if (arr1AsArr2[i] !== arr2[i]) {
        newArr1[i] = arr2AsArr1[i]
        changed = true
      }
    }
    if (changed) return newArr1
    return arr1
  }
  
  
  
  
}



