import React, { useState } from 'react'
import {
  AnimatedComponentState,
} from 'src/mini-libs/animated/AnimatedProps.ts'
import { TypeU } from '@util/common/TypeU.ts'
import {
  useUpdateComponentStateUpdaters,
} from 'src/mini-libs/animated/animatedUpdaters.ts'
import Puro = TypeU.Puro




type AnimatedStateProps<S extends Record<string, any>> = {
  animatedState: S
} & Puro<{
  children: (state: S) => React.ReactNode
}>


const AnimatedState = (<S extends Record<string, any>>() =>
  React.memo((props: AnimatedStateProps<S>) => {
    const {
      animatedState,
      children,
    } = props
    
    const [state, setState] = useState<S>(undefined as unknown as S)
    
    
    useUpdateComponentStateUpdaters(setState, animatedState)
    
    if (!state) return undefined
    
    // TODO TS - need to exclude children from generic S
    // @ts-ignore
    return children?.(state)
  })
)()
AnimatedState.displayName = 'AnimatedState'
export default AnimatedState


