import { ObjectU } from '@utils/common/ObjectU.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import React, { useMemo, useState } from 'react'
import {
  AnimatedComponentState,
} from '@libs/animated/AnimatedProps.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import {
  useUpdateComponentStateUpdaters,
} from '@libs/animated/animatedUpdaters.ts'
import Pu = TypeU.Pu
import ObjectMap = ObjectU.ObjectMap





type AnimatedStateProps<S extends Record<string, any>> = {
  animatedState: AnimatedComponentState<S>,
} & Pu<{
  children: (state: S) => React.ReactNode
}>



const AnimatedState = ReactU.memo(
  <S extends Record<string, any>>(props: AnimatedStateProps<S>) => {
    const {
      animatedState,
      children,
    } = props
    
    const getInitialState = () => {
      return ObjectMap<AnimatedComponentState<S>, S>(
        animatedState,
        // @ts-expect-error
        ([prop, animated]) => [prop, animated?.get()]
      )
    }
    
    const [state, setState] = useState<S>(getInitialState)
    
    useUpdateComponentStateUpdaters(setState, animatedState, state)
    
    const renderedChildren = useMemo(() => {
      return children?.(state)
    }, [children, state])
    
    return renderedChildren
  }
)
// @ts-expect-error
AnimatedState.displayName = 'AnimatedState'
export default AnimatedState


