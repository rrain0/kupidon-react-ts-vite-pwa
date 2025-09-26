import { capitalize } from 'src/utils/base/stringUtils.ts'
import {
  isnull,
  isobject,
  isRecord,
  isundef,
  type WriteablePartial,
} from 'src/utils/base/tsUtils.ts'
import { Pair } from 'src/utils/js/Pair.ts'



// TODO Проверить какие именно свойства возвращает TS (own & super, enumerable & non-enumerable)
// TODO type Record??? May be name it better.

export type ObjectKeys<O extends object> = (keyof O)
export type ObjectValues<O extends object> = (
  { [Prop in keyof O]: O[Prop] }[keyof O]
)
export type ObjectEntries<O extends object> = (
  { [Prop in keyof O]: [Prop, O[Prop]] }[keyof O]
)



export type ObjectStringKeys<O extends object> = (string & keyof O)
export type ObjectValuesOfStringKeys<O extends object> = (
  { [Prop in string & keyof O]: O[Prop] }[string & keyof O]
)
export type ObjectEntriesOfStringKeys<O extends object> = (
  { [Prop in string & keyof O]: [Prop, O[Prop]] }[string & keyof O]
)



/**
 * Тайпскрипт не позволяет отделить собственные и унаследованные свойства,
 * перечисляемые и неперечисляемые свойства,
 * так что в типе все свойства, кроме ключей-символов.
 * Порядок перечисления - порядок объявления свойств в коде.
 */
export type ObjectStringKeysArr<O extends object> = ObjectStringKeys<O>[]
export type ObjectValuesArrOfStringKeys<O extends object> = ObjectValuesOfStringKeys<O>[]
export type ObjectEntriesArrOfStringKeys<O extends object> = ObjectEntriesOfStringKeys<O>[]



// Get object's own enumerable string keys array
export function objectKeys<O>(object: O): ObjectStringKeysArr<O & object> {
  if (!isobject(object)) return []
  // The Object.keys() static method returns an array
  // of a given object's own enumerable string-keyed property names.
  return Object.keys(object) as ObjectStringKeysArr<O & object>
}
// Get object's values array by own enumerable string keys
export function objectValues<O>(object: O): ObjectValuesArrOfStringKeys<O & object> {
  if (!isobject(object)) return []
  return Object.values(object) as ObjectValuesArrOfStringKeys<O & object>
}
// Get object's entries array by own enumerable string keys
export function objectEntries<O>(object: O): ObjectEntriesArrOfStringKeys<O & object> {
  if (!isobject(object)) return []
  return Object.entries(object) as ObjectEntriesArrOfStringKeys<O & object>
}




export function objectMap<
  O1 extends object,
  O2 extends object,
>(
  object: O1,
  mapper: (entry: ObjectEntriesOfStringKeys<O1>, object: O1) => ObjectEntriesOfStringKeys<O2>
): O2 {
  return Object.fromEntries(Object.entries(object).map(entry => mapper(entry as any, object))) as O2
}






export const isRecordAndEmpty = (obj?: any) => isRecord(obj) && isEmptyObj(obj)
export const isEmptyObj = (obj: object) => !Object.keys(obj).length



export const getPairOfSingleKeyObj = <O extends object>(obj: O) => {
  if (isundef(obj) || isnull(obj)) return undefined
  const keys = Object.keys(obj)
  if (keys.length !== 1) return undefined
  return Pair.of(keys[0], obj[keys[0]]) as Pair<ObjectStringKeys<O>, ObjectValuesOfStringKeys<O>>
}




// Copy object (including class instance)
export function copy<T extends object>(
  orig: T,
  update?: WriteablePartial<T>,
): T {
  const newInstance = Object.assign(Object.create(Object.getPrototypeOf(orig)), orig) as T
  Object.assign(newInstance, update)
  return newInstance
}



export function objectPrefixAndCapitalizeKeys<
  const Pref extends string, const Es extends object
>(
  prefix: Pref, elems: Es
): (
  { [Prop in keyof Es as `${Pref}${Capitalize<string & Prop>}`]: Es[Prop] }
) {
  return objectMap(elems, ([prop, value]) => [`${prefix}${capitalize(prop)}`, value] as any)
}



export const shallowEq = (obj1: object, obj2: object): boolean => {
  const entries1 = Object.entries(obj1)
  const entries2 = Object.entries(obj2)
  if (entries1.length !== entries2.length) return false
  if (entries1.some(([k, v]) => obj2[k] !== v)) return false
  return true
}




/*
 Method to get all own symbol properties
 Object.getOwnPropertySymbols({ a: 'aa', [Symbol('tag')]: 'ss' })
 
 The Object.keys() static method returns an array of a given object's
 own enumerable string-keyed property names.
 
 If you want all string-keyed own properties, including non-enumerable ones,
 see Object.getOwnPropertyNames().
 */

