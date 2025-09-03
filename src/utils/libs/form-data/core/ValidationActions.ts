import { ValidationCore } from '@libs/form-data/core/ValidationCore.ts'
import Failures = ValidationCore.Failures
import Failure = ValidationCore.Failure
import Values = ValidationCore.Values



export namespace ValidationActions {
  
  
  
  export const updateErrors = <Vs extends Values>(
    errors: Failures<Vs>,
    objects: {
      errors?: Failures<Vs>,
      errorIds?: string[] | 'all',
      highlightFields?: (keyof Vs)[],
    },
    update?: {
      highlight?: boolean,
      notify?: boolean,
      delay?: number,
    }
  ): Failures<Vs> => {
    //console.log('errorIds',objects.errorIds)
    //console.log('update',update)
    let changed = 0
    const newFails = errors.map(fail => {
      if (
        objects.errors?.some(f => f === fail)
        || objects.errorIds === 'all'
        || objects.errorIds?.some(id => id === fail.id)
        || objects.highlightFields?.some(f => fail.errorFields.includes(f))
      ) {
        changed++
        return fail.copy(update)
      }
      return fail
    })
    
    errors = changed ? newFails : errors
    //console.log('UPDATED_FAILURES:', changed, errors)
    
    return errors
  }
  
  
  
  export const awaitDelay = <Vs extends Values>(
    errors: Failures<Vs>,
    stale: { v: boolean },
    callback: (failure: Failure<Vs>) => void
  ) => {
    let delay = Number.POSITIVE_INFINITY
    errors.forEach(async f => {
      if (f.delayedFor < delay) {
        delay = f.delayedFor
        if (!f.isDelayed) callback(f)
        else {
          await f.awaitDelay
          if (!stale.v) callback(f)
        }
      }
    })
  }
  
  
  
  
}
