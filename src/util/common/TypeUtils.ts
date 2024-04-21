




export namespace TypeUtils {
  
  export type empty = null|undefined
  export type anyval = {}|null|undefined
  export type falsy = false | undefined | null | '' | 0
  export type emptyObj = Record<keyof any, never> // need to fix
  
  export const noop = ()=>{}
  export const trueOrUndef = (value: any): true|undefined => value ? true : undefined
  export const falsyToUndef = <T>(value: T) => value ? value : undefined
  
  export type Exists<T> = Exclude<T, null|undefined>
  export type PartialUndef<O extends object> =
    { [Prop in keyof O]+?: O[Prop] | undefined }
  export type WriteablePartial<O extends object> =
    { -readonly [Prop in keyof O]+?: O[Prop] }
  
  
  
  /*
  export function exists<T extends {}>(value: T|empty): value is T {
    return value!==null && value!==undefined
  }
  export function notExists<T>(value: T|empty): value is empty {
    return value===null || value===undefined
  }
  export const isstring = <T>(value: T|string): value is string => typeof value === 'string'
  export const isnumber = <T>(value: T|number): value is number => typeof value === 'number'
  export const isArray = <T,E>(obj: T | E[]): obj is E[] => obj instanceof Array
  export const isObject = <O>(value: O|object): value is object =>
    typeof value === 'object' && value!==null
   */
  
  export function exists<T, Ex extends {}>(value: T | Ex): value is Ex {
    return value!==null && value!==undefined
  }
  export function notExists<T, NEx extends empty>(value: T | NEx): value is NEx {
    return value===null || value===undefined
  }
  export function isstring<T, S extends string>(value: T | S): value is S {
    return typeof value === 'string'
  }
  export function isnumber<T, N extends number>(value: T | N): value is N {
    return typeof value === 'number'
  }
  export function isArray<T, A extends unknown[]>(obj: T | A): obj is A {
    return obj instanceof Array
  }
  export function isObject<T, O extends object>(value: T | O): value is O {
    return typeof value === 'object' && value !== null
  }
  
  /*
  {
    const getStrOrObj = (): 'str' | 'str2' | { a: number } => 'str'
    
    function f() {
      const value = getStrOrObj()
      if (isstring(value)) {
        const str = value
      }
      if (isObject(value)) {
        const obj = value
        console.log(obj.substring(0, 1))
        const num: number = obj.a
        console.log(num)
      } else {
        console.log(value.a)
      }
    }
  }
   */
  
  
  export type Callback = ()=>void
  export type Callback1<T> = (value: T)=>void
  export type Callback2<T1,T2> = (value1: T1, value2: T2)=>void
  export type CallbackN<T extends any[]> = (...args: T)=>void
  export type Setter<T> = Callback1<T>
  export type Consumer<T> = Callback1<T>
  export type Generator<T> = ()=>T
  export type Mapper<T1,T2=T1> = (prevValue: T1)=>T2
  
  export type Predicate<T> = (obj: T)=>boolean
  export const defaultPredicate: Predicate<any> = value=>!!value
  export type Filter<T> = Predicate<T>
  
  export type Combiner<T1, T2 = T1> = (a: T1, b: T2)=>T1
  export type CombinerIndexed<T1, T2 = T1> = (a: T1, b: T2, aI: number, bI: number)=>T1
  export type Merger<T1, T2 = T1> = (a: T1, b: T2)=>[T1,T2]
  export type MergerIndexed<T1, T2 = T1> = (a: T1, b: T2, aI: number, bI: number)=>[T1,T2]
  
  export type ValueOrMapper<T> = T | Mapper<T>
  export type ValueOrGenerator<T> = T | Generator<T>
  export type Updater<T> = (mapper: Mapper<T>)=>void
  export type SetterOrUpdater<T> = (valueOrMapper: T | Mapper<T>)=>void
  
  export type ComparatorEq<A,B = A> = (a:A,b:B)=>boolean
  export const defaultComparatorEq: ComparatorEq<any> = (a,b)=>a===b
  
  
  
}