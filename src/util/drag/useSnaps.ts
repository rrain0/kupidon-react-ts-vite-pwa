import { useState } from 'react'


// TODO - in development

export type OpenState = 'open' | 'adjust' | 'drag'



export type State = {
  state: OpenState
  snap: number
  isAnimating: boolean
}
const stateFromStr = (strState: string) => JSON.parse(strState) as State
const stateToStr = (state: State) => JSON.stringify(state)
const stateEq = (a: State, b: State) => stateToStr(a) === stateToStr(b)

/*
export type SnapData = {
  state: SnapState
  snap: number
  toState?: SnapState | undefined
  toSnap?: number | undefined
} */

export const useSnaps = () => {
  
  const [state, setState] = useState(stateToStr({ state: 'open', snap: 0, isAnimating: false }))
  

}


