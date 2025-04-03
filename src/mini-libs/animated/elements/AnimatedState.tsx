import { ObjectU } from '@util/common/ObjectU.ts'
import React, { useMemo, useState } from 'react'
import {
  AnimatedComponentState,
} from 'src/mini-libs/animated/AnimatedProps.ts'
import { TypeU } from '@util/common/TypeU.ts'
import {
  useUpdateComponentStateUpdaters,
} from 'src/mini-libs/animated/animatedUpdaters.ts'
import Pu = TypeU.Pu
import ObjectMap = ObjectU.ObjectMap





type AnimatedStateProps<S extends Record<string, any>> = {
  animatedState: AnimatedComponentState<S>,
} & Pu<{
  children: (state: S) => React.ReactNode
}>


const AnimatedState = (<S extends Record<string, any>>() =>
  React.memo((props: AnimatedStateProps<S>) => {
    const {
      animatedState,
      children,
    } = props
    
    const getInitialState = () => {
      return ObjectMap<AnimatedComponentState<S>, S>(
        animatedState,
        ([prop, animated]) => [prop, animated.get()]
      )
    }
    
    const [state, setState] = useState<S>(getInitialState)
    
    useUpdateComponentStateUpdaters(setState, animatedState, state)
    
    const renderedChildren = useMemo(() => {
      return children?.(state)
    }, [children, state])
    
    return renderedChildren
  })
)()
AnimatedState.displayName = 'AnimatedState'
export default AnimatedState


