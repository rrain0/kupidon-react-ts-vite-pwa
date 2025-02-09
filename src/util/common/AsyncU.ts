import { TypeU } from 'src/util/common/TypeU.ts'
import CallbackN = TypeU.CallbackN
import Producer = TypeU.Producer



export namespace AsyncU {
  
  
  export const wait = <Args extends any[]>(
    delay: number,
    callback: (...args: Args) => any,
    ...args: Args
  ) => {
    return setTimeout(callback, delay, ...args)
  }
  
  
  export const awaitValue = async <T>(delay: number, value?: T) => new Promise<T>(
    resolve => setTimeout(resolve, delay, value)
  )
  export const awaitCallback = async <T>(
    delay: number, generator: Producer<T>
  ) => new Promise<T>(
    resolve => setTimeout(() => resolve(generator()), delay)
  )
  
  
  
  export const withThrottle = <Args extends any[]>(
    interval: number,
    callback: CallbackN<Args>
  ): CallbackN<Args> => {
    let timerId: NodeJS.Timeout | null = null
    let prev = 0
    
    const throttledCallback: (...args: Args) => void = (...args) => {
      const now = +new Date()
      if (timerId === null && (now - prev > interval)) {
        prev = +new Date()
        callback(...args)
      }
      else {
        if (timerId !== null) clearTimeout(timerId)
        timerId = setTimeout(() => {
          timerId = null
          prev = +new Date()
          callback(...args)
        }, interval - (now - prev))
      }
    }
    
    return throttledCallback
  }
  
  
  
}
