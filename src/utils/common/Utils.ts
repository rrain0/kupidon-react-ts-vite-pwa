import { TypeUtils } from 'src/utils/common/TypeUtils'
import Mapper = TypeUtils.Mapper




export namespace Utils {
  
  
  export const my = <T1,T2>(obj: T1, handler: Mapper<T1,T2>) => handler(obj)
  
  
  export class Lazy<T> {
    private inited = false
    private value!: T
    constructor( private initializer: ()=>T ) {}
    get(){
      if (!this.inited) {
        this.inited = true
        this.value = this.initializer()
      }
      return this.value
    }
  }
  
  
  
  export const nonNegIntOrDefault =
    (value: any, defolt: number): number => {
      value = +value
      if (isNaN(value) || value < 0) value = defolt
      return value
    }
    
    
  
  let id = 1
  export const nextId = ()=>''+id++
  
  
  
  export type WithId<E extends object> = E & { id: string }
  
  
  export type PointerEventListener<E extends HTMLElement = HTMLElement> =
    (this:E, ev: PointerEvent) => any
  
  
  // Получить тип, в котором ко всем именам свойств переданного объекта добавляется суффикс
  export type Suffix<O extends object, Suff extends string> =
    { [Prop in keyof O as Prop extends string ? `${Prop}${Suff}` : never]: O[Prop] }
  
  
  
  // First, define a type that, when passed a union of keys, creates an object which
  // cannot have those properties. I couldn't find a way to use this type directly,
  // but it can be used with the below type.
  export type Impossible<K extends keyof any> = { [P in K]: never }

  
  // The secret sauce! Provide it the type that contains only the properties you want,
  // and then a type that extends that type, based on what the caller provided
  // using generics.
  export type NoExtraProperties<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>
  
  
  
  
}



