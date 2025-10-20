



export type emptyval = null | undefined
//export type anyval = {} | null | undefined // use 'any' type
export type anyfun = (...args: any[]) => any
export type falsy = false | undefined | null | '' | 0 | 0n
export type Sign = -1 | 0 | 1
export type objectkey = string | number | symbol

export const noop = () => { }
export const emptyArr = []


// Атрибут, который либо просто есть без значения, либо его нет,
// то есть <div attr/> или <div/>
export type HtmlEmptyAttr = '' | undefined
export const toEmptyAttr = (value: any): HtmlEmptyAttr => value ? '' : undefined

export type HtmlDataAttrs = { [Prop in `data-${string}`]?: string | undefined }



export type Nonemptyval<T> = T & {}

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


export type RecordPartial<K extends keyof any, T> = {
  [P in K]+?: T
}
export type RecordRo<K extends keyof any, T> = {
  +readonly [P in K]: T
}
export type RecordPu<K extends keyof any, T> = {
  [P in K]+?: T | undefined
}
export type RecordPuro<K extends keyof any, T> = {
  +readonly [P in K]+?: T | undefined
}



export type AllOrNone<O extends object> = O | {
  [Prop in keyof O]?: undefined
}
// TODO костыль - ts костыль фиксит взятие необязательных свойств объединённых объектов
export type ObjectUnionFix<O1 extends object, O2 extends object> =
  | O1 & { [OptKeys in keyof Omit<O2, keyof O1>]: undefined }
  | O2 & { [OptKeys in keyof Omit<O1, keyof O2>]: undefined }



// Типы и предикаты для оператора typeof (за исключением того, что null это null, а не объект)
export type Isobject<T> = T extends object ? T extends anyfun ? never : T : never

// Value is undefined
export function isundef<T>(value: T | undefined): value is undefined {
  return value === undefined
}
// Value is defined
export function isdef<T>(value: T | undefined): value is T {
  return value !== undefined
}
// Value is null
export function isnull<T>(value: T | null): value is null {
  return value === null
}
// Value is not null
export function isnotnull<T>(value: T | null): value is T {
  return value !== null
}
export function isnotnullundef<E extends {}, T>(value: T | E): value is E {
  return value !== null && value !== undefined
}
export function isnullundef<NE extends emptyval, T>(value: T | NE): value is NE {
  return value === null || value === undefined
}
export function isbool<S extends boolean, T>(value: T | S): value is S {
  return typeof value === 'boolean'
}
export function isstring<S extends string, T>(value: T | S): value is S {
  return typeof value === 'string'
}
export function isnumber<N extends number, T>(value: T | N): value is N {
  return typeof value === 'number'
}
// Value is number or string
export function isnumstr<N extends number | string, T>(value: T | N): value is N {
  return typeof value === 'number' || typeof value === 'string'
}
// Value is object (and not function & not null)
export function isobject<T>(value: T): value is Isobject<T> {
  return typeof value === 'object' && value !== null
}
export function isfunction<F extends Function, T>(value: T | F): value is F {
  return typeof value === 'function'
}
export function assertNever(value: never): never {
  throw new Error(
    `This code must not be reached because value must be never, but it is: ${value}`
  )
}




export function isObject<O extends object, T>(value: T | O): value is O {
  return value instanceof Object
}
export function isArray<A extends any[], T>(value: T | A): value is A {
  return value instanceof Array
}
export function isFunction<F extends Function, T>(value: T | F): value is F {
  return value instanceof Function
}
export function isRecord<R extends object, T>(value: R | any[] | anyfun | T): value is R {
  return isObject(value) && !isArray(value) && !isFunction(value)
}


export function isFinitenumber<N extends number, T>(v: T | N): v is N {
  return typeof v === 'number' && Number.isFinite(v)
}
export function isInt<N extends number, T>(v: T | N): v is N {
  return typeof v === 'number' && Number.isInteger(v)
}




export type Cb = () => void
export type Cb1<T> = (value: T) => void
export type Cb2<T1, T2> = (value1: T1, value2: T2) => void
export type CbN<T extends any[]> = (...args: T) => void
export type Setter<T> = Cb1<T>
export type Consumer<T> = Cb1<T>
export type Getter<T> = () => T
export type Producer<T> = Getter<T>
export type Mapper<In, Out = In> = (v: In) => Out
export type Mapper2<In1, In2, Out = In1> = (a: In1, b: In2) => Out
export type MapperN<Ins extends any[], Out> = (...values: Ins) => Out

export type Predicate<T> = (v: T) => boolean
export const tobool: Predicate<any> = value => !!value
export type Filter<T> = (v: T) => any
export const defaultFilter: Filter<any> = tobool

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

export type FunOrObj<F extends anyfun> = (
  F extends (...args: infer A) => infer R ? ((...args: A) => R) | R : never
)



// By default false is mapped to undefined
export function ifBool<V, const TV>(
  v: V | true, trueV: TV
): V | TV
export function ifBool<V, const TV>(
  v: V | true | false, trueV: TV
): V | TV | undefined
export function ifBool<V, const TV, const FV>(
  v: V | boolean, trueV: TV, falseV: FV
): V | TV | FV
export function ifBool<V, const TV, const FV>(
  v: V | boolean, trueV: TV, falseV?: FV
): V | TV | FV | undefined {
  if (v === true) return trueV
  if (v === false) return falseV
  return v
}


export function ifVal<V, const IFV, const THENV>(
  value: V | IFV, ifValue: IFV, thenValue: THENV
): V | THENV {
  if (value === ifValue) return thenValue
  return value as V
}



export const ifdef = <V, R>(v: V | undefined, mapper: Mapper<V, R>) => isdef(v) ? mapper(v) : v
export const ifNaN = <R = number>(n: number, r: R) => isNaN(n) ? r : n
export const ifNotnumber = <T, R>(v: T, r: R) => isnumber(v) ? v : r
export const ifNotnumberOrNaN = <T, R>(v: T, r: R) => isnumber(v) && !isNaN(v)? v : r
export const ifNotnumberOrNegative = <T, R>(v: T, r: R) => isnumber(v) && v >= 0 ? v : r
export const ifNotnumberOrNotNull = <T, R>(v: T, r: R) => isnumber(v) && v === null ? v : r
export const ifNotNonNegInt = (v: any, r: number): number => {
  v = +v
  if (isNaN(v) || v < 0 || !Number.isInteger(v)) v = r
  return v
}





namespace TypeUtilsTest {
  
  
  // Получить тип, в котором ко всем именам свойств переданного объекта добавляется суффикс
  export type Suffix<O extends object, Suff extends string> = (
    { [Prop in keyof O as Prop extends string ? `${Prop}${Suff}` : never]: O[Prop] }
  )
  
  
  // First, define a type that, when passed a union of keys, creates an object which
  // cannot have those properties. I couldn't find a way to use this type directly,
  // but it can be used with the below type.
  export type Impossible<K extends keyof any> = { [P in K]: never }
  
  
  // The secret sauce! Provide it the type that contains only the properties you want,
  // and then a type that extends that type, based on what the caller provided
  // using generics.
  export type NoExtraProperties<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>
  
  
}

