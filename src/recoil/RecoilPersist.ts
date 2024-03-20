import { AtomEffect } from 'recoil'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Mapper = TypeUtils.Mapper
import shallowEq = ObjectUtils.shallowEq




export type RemoveWhen<State> = Mapper<State,boolean> | 'reset'
export type LocalStorageEffect<State, Saved = State> = (props?: {
  removeWhen?: RemoveWhen<State>[]
  map?: Mapper<State,Saved>
  mapBack?: Mapper<Saved,State>
})=>AtomEffect<State>




export const localStorageEffect: LocalStorageEffect<any> =
({ removeWhen, map, mapBack } = {}) =>
({node, setSelf, onSet}) => {
  // local storage stores only strings
  // if no stored, then returns null
  const savedValue: string | null = localStorage.getItem(node.key)
  if (savedValue) {
    const parsed = JSON.parse(savedValue)
    if (mapBack) setSelf(mapBack(parsed))
    else setSelf(parsed)
  }
  
  onSet((newValue, oldValue, isReset) => {
    const doReset = removeWhen?.some(filterNot=>{
      // we will clear local storage if there is 'reset' event && isReset
      if (filterNot==='reset') return isReset
      // we will clear local storage if current state matches state to be cleared
      return filterNot(newValue)
    })
    
    if (doReset) localStorage.removeItem(node.key)
    else {
      const valueToSave = function(){
        if (map) return JSON.stringify(map(newValue))
        return JSON.stringify(newValue)
      }()
      localStorage.setItem(node.key, valueToSave)
    }
  })
}




export const resettableLocalStorageEffect = (...valuesWhenReset: any[]) =>
  localStorageEffect({
    removeWhen: ['reset', ...valuesWhenReset.map(it=>(v:any)=>shallowEq(v,it))]
  })






/*

export const isObjectOf = (...values: any[]) => (obj:any): boolean => {
  if (isObject(obj)){
    const objectValues = ObjectValues(obj)
    if (!objectValues.length) return false
    return objectValues.every(it=>values.includes(it))
  }
  return false
}

export const isEmptyObject = (obj:any): boolean => isObject(obj) && !ObjectValues(obj).length

export const isValueOf = (...values: any[]) => (value:any): boolean => values.includes(value)


export const objOfEmptyStrOrNullOrUndef: RemoveWhen<object> = (data) => {
  const values = Object.values(data)
  if (!values.length) return true
  return Object.values(data).every(
    val=>[undefined,''].includes(val)
  )
}

export const emptyValOrObj: RemoveWhen<unknown> = (data) => {
  if ([undefined,''].includes(data as any)) return true
  if (data!==null && typeof data === 'object') return objOfEmptyStrOrNullOrUndef(data)
  return false
}
*/





/*
// when using 'recoil-persist' library
 import { recoilPersist } from 'recoil-persist'
 
 export const { persistAtom } = recoilPersist({
   key: 'recoil-persist', // this key is using to store data in local storage
   storage: localStorage, // configurate which stroage will be used to store the data
 })
 */


/*
 
 export const localStorageEffect0: (key: string) => AtomEffect<any> =
 key => ({setSelf, onSet}) => {
 
 console.log("lkdsjflkjsadlkjflkjasdflkjsdlkfj")
 
 const savedValue = localStorage.getItem(key)
 if (savedValue != null) {
 setSelf(JSON.parse(savedValue))
 }
 
 onSet((newValue, oldValue, isReset) => {
 isReset
 ? localStorage.removeItem(key)
 : localStorage.setItem(key, JSON.stringify(newValue));
 })
 }
 
 */