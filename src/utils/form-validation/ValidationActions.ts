import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import Failures = ValidationCore.Failures
import Failure = ValidationCore.Failure
import Values = ValidationCore.Values



export namespace ValidationActions {
  
  
  
  export const updateFailures = <Vs extends Values>(
    failures: Failures<Vs>,
    objects: {
      failures?: Failures<Vs>,
      failureIds?: string[] | 'all',
      highlightFields?: (keyof Vs)[],
    },
    update?: {
      highlight?: boolean,
      notify?: boolean,
      delay?: number,
    }
  ): Failures<Vs> => {
    //console.log('failureIds',objects.failureIds)
    //console.log('update',update)
    let changed = 0
    const newFails = failures.map(fail=>{
      if (
          (
            objects.failures?.some(f=>f===fail)
            || objects.failureIds==='all'
            || objects.failureIds?.some(id=>id===fail.id)
            || objects.highlightFields?.some(f=>fail.errorFields.includes(f))
          )
      ) {
        changed++
        return fail.copy(update)
      }
      return fail
    })
    
    failures = changed ? newFails : failures
    //console.log('UPDATED_FAILURES:', changed, failures)
    
    return failures
  }
  
  
  
  export const awaitDelay = <Vs extends Values>(
    failures: Failures<Vs>,
    stale: [boolean],
    callback: (failure: Failure<Vs>)=>void
  ) => {
    let delay = Number.POSITIVE_INFINITY
    failures.forEach(f=>{
      if (f.delayedFor < delay){
        delay = f.delayedFor
        if (!f.isDelayed) callback(f)
        else f.awaitDelay.then(()=>{
          if (!stale[0]) callback(f)
        })
      }
    })
  }
  
  
  
  
}