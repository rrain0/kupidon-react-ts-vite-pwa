import { ObjectU } from '@util/common/ObjectU.ts'
import React, { useMemo, useState } from 'react'
import {
  AnimatedComponentState,
} from 'src/mini-libs/animated/AnimatedProps.ts'
import { TypeU } from '@util/common/TypeU.ts'
import {
  useUpdateComponentStateUpdaters,
} from 'src/mini-libs/animated/animatedUpdaters.ts'
import Puro = TypeU.Puro
import ObjectMap = ObjectU.ObjectMap





type AnimatedStateProps<S extends Record<string, any>> = {
  animatedState: AnimatedComponentState<S>,
} & Puro<{
  children: (state: S) => React.ReactNode
}>


const AnimatedState = (<S extends Record<string, any>>() =>
  React.memo((props: AnimatedStateProps<S>) => {
    const {
      animatedState,
      children,
    } = props
    
    const [state, setState] = useState<S>(() => {
      return ObjectMap<AnimatedComponentState<S>, S>(
        animatedState,
        ([prop, animated]) => [prop, animated.get()]
      )
    })
    
    useUpdateComponentStateUpdaters(setState, animatedState)
    
    const renderedChildren = useMemo(() => {
      return children?.(state)
    }, [children, state])
    
    return renderedChildren
  })
)()
AnimatedState.displayName = 'AnimatedState'
export default AnimatedState


