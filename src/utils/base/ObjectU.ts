import { StringU } from 'src/utils/base/StringU.ts'
import { TypeU } from 'src/utils/base/TypeU.ts'
import { Pair } from 'src/utils/js/Pair.ts'
import WriteablePartial = TypeU.WriteablePartial
import isobject = TypeU.isobject
import capitalize = StringU.capitalize
import isundef = TypeU.isundef
import isnull = TypeU.isnull
import isRecord = TypeU.isRecord



export namespace ObjectU {
  
  
  export const isRecordAndEmpty = (obj?: any) => (
    isRecord(obj) && isEmptyObj(obj)
  )
  
  
  export const isEmptyObj = (obj: object) => {
    return Object.keys(obj).length === 0
  }
  
  export const getPairOfSingleKeyObj = <O extends object>(obj: O) => {
    if (isundef(obj) || isnull(obj)) return undefined
    const keys = Object.keys(obj)
    if (keys.length !== 1) return undefined
    return Pair.of(keys[0], obj[keys[0]]) as Pair<ObjectKeysType<O>, ObjectValuesType<O>>
  }
  
  
  
  // can also copy class instance
  export function copy<T extends object>(
    orig: T,
    update?: WriteablePartial<T>,
  ): T {
    const newInstance = Object.assign(Object.create(Object.getPrototypeOf(orig)), orig) as T
    Object.assign(newInstance, update)
    return newInstance
  }
  export const copyBy = <T extends object>(update: NoInfer<WriteablePartial<T>>) => {
    return (orig: T) => copy(orig, update)
  }
  
  export const destructCopyBy = <T extends object>(update: NoInfer<WriteablePartial<T>>) => {
    return (orig: T) => ({ ...orig, ...update })
  }
  
  
  
  
  export type Keys<O extends object> = (keyof O)
  export type ObjectKeysType<O extends object> = (string & keyof O)
  /**
   * Тип для получения массива ключей объекта (для собственных перечисляемых свойств).
   * Беруться только строковые (и числовые) ключи, но не символьные.
   * Порядок перечисления - порядок объявления свойств в коде.
   * Тайпскрипт не позволяет выделить собственные и перечисляемые свойства,
   * так что в типе все свойства, кроме ключей-символов.
   */
  export type ObjectKeysArrType<O extends object> = ObjectKeysType<O>[]
  /**
   * Встроенная функция {@linkcode Object.keys} с улучшенной типизацией
   */
  export function ObjectKeys<O>(object: O): ObjectKeysArrType<O & object> {
    if (!isobject(object)) return []
    // The Object.keys() static method returns an array of a given object's own enumerable string-keyed property names.
    return Object.keys(object) as ObjectKeysArrType<O & object>
  }
  
  
  
  export type Values<O extends object> = (
    { [Prop in keyof O]: O[Prop] }[keyof O]
  )
  export type ObjectValuesType<O extends object> = (
    { [Prop in string & keyof O]: O[Prop] }[string & keyof O]
  )
  /**
   * Тип для получения массива значений объекта (для собственных перечисляемых свойств).
   * Беруться только строковые (и числовые) ключи, но не символьные.
   * Порядок перечисления - порядок объявления свойств в коде.
   * Тайпскрипт не позволяет выделить собственные и перечисляемые свойства,
   * так что в типе все свойства, кроме ключей-символов.
   */
  export type ObjectValuesArrType<O extends object> = ObjectValuesType<O>[]
  /**
   * Встроенная функция {@linkcode Object.values} с улучшенной типизацией
   */
  export function ObjectValues<O>(object: O): ObjectValuesArrType<O & object> {
    if (!isobject(object)) return []
    return Object.values(object) as ObjectValuesArrType<O & object>
  }
  
  
  
  export type Entries<O extends object> = (
    { [Prop in keyof O]: [Prop, O[Prop]] }[keyof O]
  )
  export type ObjectEntriesType<O extends object> = (
    { [Prop in string & keyof O]: [Prop, O[Prop]] }[string & keyof O]
  )
  /**
   * Тип для получения поэлементно типизированного массива записей объекта
   * (для собственных перечисляемых свойств),
   * где элемент - это кортеж [ключ, значение] и тип ключа привязан к типу значения.
   * Беруться только строковые (и числовые) ключи, но не символьные.
   * Порядок перечисления - порядок объявления свойств в коде.
   * Тайпскрипт не позволяет выделить собственные и перечисляемые свойства,
   * так что в типе все свойства, кроме ключей-символов.
   */
  export type ObjectEntriesArrType<O extends object> = ObjectEntriesType<O>[]
  /**
   * Встроенная функция {@linkcode Object.entries} с улучшенной типизацией
   */
  export function ObjectEntries<O>(object: O): ObjectEntriesArrType<O & object> {
    if (!isobject(object)) return []
    return Object.entries(object) as ObjectEntriesArrType<O & object>
  }
  
  
  
  
  export function ObjectMap<
    O1 extends object,
    O2 extends object,
  >(
    object: O1,
    mapper: (entry: ObjectEntriesType<O1>, object: O1) => ObjectEntriesType<O2>
  ): O2 {
    const object2 = { } as O2
    ObjectEntries(object).forEach(entry => {
      const entry2 = mapper(entry, object)
      object2[entry2[0]] = entry2[1]
    })
    return object2
  }
  
  
  
  export function ObjectPrefixCapitalizeKeys<
    const Pref extends string, const Es extends object
  >(
    prefix: Pref, elems: Es
  ): (
    { [Prop in keyof Es as `${Pref}${Capitalize<string & Prop>}`]: Es[Prop] }
  ) {
    return ObjectMap(elems, ([prop, value]) => [`${prefix}${capitalize(prop)}`, value] as any)
  }
  
  
  
  export const shallowEq = (obj1: any, obj2: any): boolean => {
    if (!isobject(obj1)) return false
    if (!isobject(obj2)) return false
    const entries1 = ObjectEntries(obj1) as unknown as [any, any]
    const entries2 = ObjectEntries(obj2) as unknown as [any, any]
    if (entries1.some(([k, v]) => obj2[k] !== v)) return false
    if (entries2.some(([k, v]) => obj1[k] !== v)) return false
    return true
  }
  
  
  export const stringifyEq = (obj1: any, obj2: any) => (
    JSON.stringify(obj1) === JSON.stringify(obj2)
  )
  
  
  
  
  
  
  /*
  Method to get all own symbol properties
   Object.getOwnPropertySymbols({ a: 'aa', [Symbol('tag')]: 'ss' })
   
   The Object.keys() static method returns an array of a given object's
   own enumerable string-keyed property names.
   
   If you want all string-keyed own properties, including non-enumerable ones,
   see Object.getOwnPropertyNames().
   */
  
  
  
  
}
