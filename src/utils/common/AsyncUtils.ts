import { TypeUtils } from 'src/utils/common/TypeUtils'
import notExists = TypeUtils.notExists
import exists = TypeUtils.exists
import CallbackN = TypeUtils.CallbackN
import Generator = TypeUtils.Generator




export namespace AsyncUtils {
  
  
  export const awaitValue =
  async <T>(delay:number, value?:T) => new Promise<T>(
    resolve => setTimeout(resolve,delay,value)
  )
  export const awaitCallback =
  async <T>(delay:number, generator:Generator<T>) => new Promise<T>(
    resolve => setTimeout(()=>resolve(generator()),delay)
  )
  
  
  
  export const throttle =
  <T extends any[]>(interval: number, callback: CallbackN<T>): CallbackN<T> =>{
    let timerId: NodeJS.Timeout|null = null
    let prev = 0
    
    const throttledCallback = (...args: T)=>{
      const now = +new Date()
      if (notExists(timerId) && (now - prev > interval)) {
        prev = +new Date()
        callback(...args)
      }
      else {
        if (exists(timerId)) clearTimeout(timerId)
        timerId = setTimeout(
          ()=>{
            timerId = null
            prev = +new Date()
            callback(...args)
          },
          interval - (now - prev)
        )
      }
    }
    
    return throttledCallback
  }
  
  
  
}