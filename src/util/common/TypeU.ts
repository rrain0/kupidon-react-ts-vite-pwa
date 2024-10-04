



export namespace TypeU {
  
  export type empty = null | undefined
  export type anyval = {} | null | undefined
  export type anyfun = (...args: any[]) => any
  export type falsy = false | undefined | null | '' | 0 | 0n
  export type emptyObj = Record<never, never> // todo need to fix
  export type HtmlBool = true | undefined
  
  export const noop = () => {}
  export const emptyArr = []
  
  export const trueOrUndef = (value: any): HtmlBool => value ? true : undefined
  export const falsyToUndef = <T>(value: T) => value ? value : undefined
  
  export type Exists<T> = Exclude<T, empty>
  
  // Add Partial Undefined
  export type PartialUndef<O extends object> = {
    [Prop in keyof O]+?: O[Prop] | undefined
  }
  // Add ReadOnly
  export type Ro<O extends object> = {
    +readonly [Prop in keyof O]: O[Prop]
  }
  // Add Partial Undefined ReadOnly
  export type Puro<O extends object> = {
    +readonly [Prop in keyof O]+?: O[Prop] | undefined
  }
  export type WriteablePartial<O extends object> = {
    -readonly [Prop in keyof O]+?: O[Prop]
  }
  export type Never<O extends object> = {
    [Prop in keyof O]: never
  }
  
  
  export type RecordRo<K extends keyof any, T> = {
    +readonly [P in K]: T
  }
  export type RecordPuro<K extends keyof any, T> = {
    +readonly [P in K]+?: T | undefined
  }
  
  
  
  export function exists<T, Ex extends {}>(value: T | Ex): value is Ex {
    return value !== null && value !== undefined
  }
  export function notExists<T, NEx extends empty>(value: T | NEx): value is NEx {
    return value === null || value === undefined
  }
  export function isstring<T, S extends string>(value: T | S): value is S {
    return typeof value === 'string'
  }
  export function isnumber<T, N extends number>(value: T | N): value is N {
    return typeof value === 'number'
  }
  export function isobject<T, O extends object>(value: T | O): value is O {
    return typeof value === 'object' && value !== null
  }
  export function isfunction<T, F extends Function>(value: T | F): value is F {
    return typeof value === 'function'
  }
  
  
  export function isObject<T, O extends object>(value: T | O): value is O {
    return value instanceof Object
  }
  export function isArray<T, A extends unknown[]>(value: T | A): value is A {
    return value instanceof Array
  }
  export function isFunction<T, F extends Function>(value: T | F): value is F {
    return value instanceof Function
  }
  
  
  
  
  export type Callback = () => void
  export type Callback1<T> = (value: T) => void
  export type Callback2<T1, T2> = (value1: T1, value2: T2) => void
  export type CallbackN<T extends any[]> = (...args: T) => void
  export type Setter<T> = Callback1<T>
  export type Consumer<T> = Callback1<T>
  export type Getter<T> = () => T
  export type Generator<T> = Getter<T>
  export type Mapper<In, Out = In> = (prevValue: In) => Out
  export type Mapper2<In1, In2, Out = In1> = (a: In1, b: In2) => Out
  
  export type Predicate<T> = (obj: T)=>boolean
  export const defaultPredicate: Predicate<any> = value => !!value
  export type Filter<T> = Predicate<T>
  
  export type Combiner<T1, T2 = T1> = (a: T1, b: T2) => T1
  export type CombinerIndexed<T1, T2 = T1> = (a: T1, b: T2, aI: number, bI: number) => T1
  export type Merger<T1, T2 = T1> = (a: T1, b: T2)=>[T1, T2]
  export type MergerIndexed<T1, T2 = T1> = (a: T1, b: T2, aI: number, bI: number) => [T1, T2]
  
  export type ValueOrMapper<T> = T | Mapper<T>
  export type ValueOrGenerator<T> = T | Generator<T>
  export type Updater<T> = (mapper: Mapper<T>) => void
  export type SetterOrUpdater<T> = (valueOrMapper: T | Mapper<T>) => void
  
  export type ComparatorEq<A, B = A> = (a: A, b: B) => boolean
  export const defaultComparatorEq: ComparatorEq<any> = (a, b) => a === b
  
  
  
}
