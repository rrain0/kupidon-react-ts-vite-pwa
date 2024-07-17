import React, { CSSProperties } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import Callback1 = TypeU.Callback1




export namespace ReactU {
  
  
  // todo hack fix
  // Sometimes 'click' is not fired for a couple seconds
  // despite 'pointerdown' & 'pointerup' events are fired normally.
  // WARNING!!! It fires before actual click events,
  // so if you change view after this so it can't capture clicks,
  // the underlying view captures click along with this view simultaneously.
  import ComparatorEq = TypeU.ComparatorEq
  import Puro = TypeU.Puro
  export const onPointerClick =
  <E extends Element>
  (callback: Callback1<React.PointerEvent<E>>) => {
    const pointers = new Set<number>()
    return {
      onPointerDown: (ev: React.PointerEvent<E>) => {
        if (!pointers.has(ev.pointerId)) {
          ev.currentTarget.releasePointerCapture(ev.pointerId)
          pointers.add(ev.pointerId)
        }
      },
      onPointerUp: (ev: React.PointerEvent<E>) => {
        if (pointers.has(ev.pointerId)) {
          callback(ev)
          //console.log('pointerup')
          pointers.delete(ev.pointerId)
        }
      },
      // 'out' is 'leave' + 'cancel'
      onPointerOut: (ev: React.PointerEvent<E>) => {
        //console.log('pointerout')
        pointers.delete(ev.pointerId)
      },
    } as const
  }
  
  
  
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
  
  
  export type ClassStyleProps = Puro<{
    className: string
    style: CSSProperties
  }>
  
  
  
  
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



