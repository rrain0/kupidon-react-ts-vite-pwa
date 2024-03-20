import { DispatchWithoutAction, Reducer, ReducerStateWithoutAction, useEffect, useReducer } from 'react';



// DOESN'T WORK
// DOESN'T WORK
// DOESN'T WORK
// DOESN'T WORK
// DOESN'T WORK
// useEffect onUnmount is working, but reducer's onUnmount doesn't triggered



type ThisReducer<S> = Reducer<S,
  { type: 'set', data: S }|{ type: 'onUnmount' }|{ type: 'computeAndSet', data: ()=>S }
>
type OnUnmount<S> = (state:S)=>void


const reducerBuilder =
  <S>(onUnmount?: OnUnmount<S>): ThisReducer<S> =>
  (state, action)=>{
    switch (action.type) {
      case 'computeAndSet': return action.data()
      case 'set': return action.data
      case 'onUnmount':
        console.log('reducer unmount')
        onUnmount?.(state)
        return state
      default: throw new Error(
        `Unknown action type in useReducer. ${JSON.stringify({ action })}`
      )
    }
  }



export const useStateWithUnmountAction = <S>(
  initialState: { data: S } | { computeData: ()=>S },
  onUnmount?: OnUnmount<S>
) => {
  
  const initial = 'computeData' in initialState
    ? initialState.computeData
    : ()=>initialState.data
  
  const [state, dispatch] = useReducer<ThisReducer<S>, undefined>(
    reducerBuilder(onUnmount),
    undefined,
    initial
  )
  const setState = (state: S)=>dispatch({ type: 'set', data: state })
  
  useEffect(()=>()=>{
    console.log('useEffect unmount')
    dispatch({ type: 'onUnmount' })
  },[])
  
  return [state, setState] as const
}