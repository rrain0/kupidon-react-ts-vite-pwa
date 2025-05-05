



export namespace TypeU {
  
  export type empty = null | undefined
  export type anyval = {} | null | undefined
  export type anyfun = (...args: any[]) => any
  export type falsy = false | undefined | null | '' | 0 | 0n
  export type Sign = -1 | 0 | 1
  
  export const noop = () => { }
  export const emptyArr = []
  
  
  
  export type HtmlEmptyAttr = '' | undefined
  export const toEmptyAttr = (value: any): HtmlEmptyAttr => value ? '' : undefined
  export const falsyToUndef = <T>(value: T) => value ? value : undefined
  
  export type HtmlDataAttrs = { [Prop in `data-${string}`]?: string | undefined }
  
  
  
  export type NonEmptyVal<T> = Exclude<T, empty>
  
  // Add Partial + Undefined
  export type PartialUndef<O extends object> = {
    [Prop in keyof O]+?: O[Prop] | undefined
  }
  export type Pu<O extends object> = PartialUndef<O>
  // Remove Partial + Undefined
  export type Defined<O extends object> = {
    [Prop in keyof O]-?: Exclude<O[Prop], undefined>
  }
  // Add ReadOnly
  export type Ro<O extends object> = {
    +readonly [Prop in keyof O]: O[Prop]
  }
  // Add Partial + Undefined + ReadOnly
  export type Puro<O extends object> = {
    +readonly [Prop in keyof O]+?: O[Prop] | undefined
  }
  export type WriteablePartial<O extends object> = {
    -readonly [Prop in keyof O]+?: O[Prop]
  }
  // Make props in O optional if they appear in Defaults
  export type PartialDefaults<O extends object = object, Defaults extends Partial<O> = Partial<O>> =
    & Omit<O, keyof Defaults>
    & { [DProp in keyof Defaults & keyof O]?: O[DProp] }
  
  
  export type RecordRo<K extends keyof any, T> = {
    +readonly [P in K]: T
  }
  export type RecordPu<K extends keyof any, T> = {
    [P in K]+?: T | undefined
  }
  export type RecordPuro<K extends keyof any, T> = {
    +readonly [P in K]+?: T | undefined
  }
  
  
  // TODO костыль - ts костыль фиксит взятие необязательных свойств объединённых объектов
  export type ObjectUnionFix<O1 extends object, O2 extends object> =
    | O1 & { [OptKeys in keyof Omit<O2, keyof O1>]: undefined }
    | O2 & { [OptKeys in keyof Omit<O1, keyof O2>]: undefined }
  
  // TODO костыль - ts костыль для компиляции exhaustive ifs & function return
  export function assertNever(value: never): never {
    throw new Error(`Value must be never, but it is: ${value}`)
  }
  export function throwNever(): never {
    throw new Error(`This code must not be reached`)
  }
  
  
  
  // Типы и предикаты для оператора typeof (за исключением того, что null это null, а не объект)
  export type Isobject<T> = T extends object ? T extends anyfun ? never : T : never
  
  // Value is undefined
  export function isundef<T>(value: T | undefined): value is undefined {
    return value === undefined
  }
  // Value is defined
  export function isdef<T, NU extends {} | null>(value: T | NU): value is NU {
    return value !== undefined
  }
  export function isnull<T>(value: T | null): value is null {
    return value === null
  }
  export function nonnull<T, NN extends {} | undefined>(value: T | NN): value is NN {
    return value !== null
  }
  export function nonemptyval<T, E extends {}>(value: T | E): value is E {
    return value !== null && value !== undefined
  }
  export function emptyval<T, NE extends empty>(value: T | NE): value is NE {
    return value === null || value === undefined
  }
  export function isstring<T, S extends string>(value: T | S): value is S {
    return typeof value === 'string'
  }
  export function isnumber<T, N extends number>(value: T | N): value is N {
    return typeof value === 'number'
  }
  // Value is number or string
  export function isnumstr<T, N extends number | string>(value: T | N): value is N {
    return typeof value === 'number' || typeof value === 'string'
  }
  // Value is object (and not function & not null)
  export function isobject<T>(value: T): value is Isobject<T> {
    return typeof value === 'object' && value !== null
  }
  export function isfunction<T, F extends Function>(value: T | F): value is F {
    return typeof value === 'function'
  }
  
  
  
  /*
  const f = () => ''
  const o = { a: 1 }
  const e = {  }
  const s = ''
  ;(() => {
    const val = o
    if (isobject(val)) {
      const a = val
      const b = a.a
    }
  })()
   */
  
  
  
  export function isObject<T, O extends object>(value: T | O): value is O {
    return value instanceof Object
  }
  export function isArray<T, A extends unknown[]>(value: T | A): value is A {
    return value instanceof Array
  }
  export function isFunction<T, F extends Function>(value: T | F): value is F {
    return value instanceof Function
  }
  
  
  export function isFinitenumber<T, N extends number>(v: T | N): v is N {
    return typeof v === 'number' && isFinite(v)
  }
  export function isInt<T, N extends number>(v: T | N): v is N {
    return typeof v === 'number' && Number.isInteger(v)
  }
  
  
  
  
  export type Callback = () => void
  export type Callback1<T> = (value: T) => void
  export type Callback2<T1, T2> = (value1: T1, value2: T2) => void
  export type CallbackN<T extends any[]> = (...args: T) => void
  export type Setter<T> = Callback1<T>
  export type Consumer<T> = Callback1<T>
  export type Getter<T> = () => T
  export type Producer<T> = Getter<T>
  export type Mapper<In, Out = In> = (v: In) => Out
  export type Mapper2<In1, In2, Out = In1> = (a: In1, b: In2) => Out
  export type MapperN<Ins extends any[], Out> = (...values: Ins) => Out
  
  export type Predicate<T> = (v: T) => boolean
  export const tobool: Predicate<any> = value => !!value
  export type Filter<T> = (v: T) => any
  export const defaultFilter: Filter<any> = value => !!value
  
  export type Combiner<T1, T2 = T1> = (a: T1, b: T2) => T1
  export type CombinerIndexed<T1, T2 = T1> = (a: T1, b: T2, aI: number, bI: number) => T1
  export type Merger<T1, T2 = T1> = (a: T1, b: T2) => [T1, T2]
  export type MergerIndexed<T1, T2 = T1> = (a: T1, b: T2, aI: number, bI: number) => [T1, T2]
  
  export type ValueOrMapper<T> = T | Mapper<T>
  export type ValueOrProducer<T> = T | Producer<T>
  export type Updater<T> = (mapper: Mapper<T>) => void
  export type SetterOrUpdater<T> = (valueOrMapper: T | Mapper<T>) => void
  
  export type ComparatorEq<A, B = A> = (a: A, b: B) => boolean
  export const defaultComparatorEq: ComparatorEq<any> = (a, b) => a === b
  
  
  //export const mapDefined = (v: any, mapper: Mapper<any>) => isdef(v) ? mapper(v) : v
  export const mapNaN = <R = number>(n: number, r: R) => isNaN(n) ? r : n
  export const mapNotnumber = <T, R>(v: T, r: R) => isnumber(v) ? v : r
  export const mapNotnumberOrNaN = <T, R>(v: T, r: R) => isnumber(v) && !isNaN(v)? v : r
  export const mapNotnumberOrNegative = <T, R>(v: T, r: R) => isnumber(v) && v >= 0 ? v : r
  export const mapNotnumberOrNotNull = <T, R>(v: T, r: R) => isnumber(v) && v === null ? v : r
  
  
  export function mapBool<V, const TV>(
    v: V | boolean, trueV: TV
  ): V | TV | undefined
  export function mapBool<V, const TV, const FV>(
    v: V | boolean, trueV: TV, falseV: FV
  ): V | TV | FV
  export function mapBool<V, const TV, const FV>(
    v: V | boolean, trueV: TV, falseV?: FV
  ): V | TV | FV | undefined {
    if (v === true) return trueV
    if (v === false) return falseV
    return v
  }
}
