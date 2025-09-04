import { CallbackN } from 'src/utils/base/math/typeUtils.ts'
import { Callback } from 'src/utils/base/math/typeUtils.ts'



export const newPromise = <T = void>() => {
  let res: (value: T | PromiseLike<T>) => void
  let rej: (reason?: any) => void
  const p = new Promise<T>((resolve, reject) => { res = resolve; rej = reject })
  return [p, res!, rej!] as const
}



export const timeout = (delay: number, callback: () => void) => (
  setTimeout(callback, delay)
)


export const delay = async (delay: number) => new Promise<void>(
  resolve => setTimeout(resolve, delay)
)
export const delayAction = async (delay: number, action: Callback) => new Promise<void>(
  resolve => setTimeout(() => { action(); resolve() }, delay)
)



export const asyncValue = async <T>(delay: number, value?: T) => new Promise<T>(
  resolve => setTimeout(resolve, delay, value)
)
export const asyncAction = async <T>(
  delay: number, action: () => T
) => new Promise<T>(
  resolve => setTimeout(() => resolve(action()), delay)
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
