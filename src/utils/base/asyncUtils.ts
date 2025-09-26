import { type Cb, type CbN, isnullundef, isnotnullundef } from 'src/utils/base/tsUtils.ts'



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
export const delayAction = async (delay: number, action: Cb) => new Promise<void>(
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
  callback: CbN<Args>
): CbN<Args> => {
  let timerId
  let prev = 0
  
  const throttledCallback: (...args: Args) => void = (...args) => {
    const now = +new Date()
    if (isnullundef(timerId) && (now - prev > interval)) {
      prev = +new Date()
      callback(...args)
    }
    else {
      if (isnotnullundef(timerId)) clearTimeout(timerId)
      timerId = setTimeout(() => {
        timerId = null
        prev = +new Date()
        callback(...args)
      }, interval - (now - prev))
    }
  }
  
  return throttledCallback
}
