import React, {
  useImperativeHandle,
  useRef,
} from 'react'
import { AnimatedStyle } from 'src/mini-libs/animated/AnimatedProps.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import {
  useRefreshElemStyleUpdaters,
} from 'src/mini-libs/animated/animatedUpdaters.ts'
import Puro = TypeU.Puro
import Children = ReactU.Children



type AnimatedDivExtraProps = Puro<{
  animatedStyle: AnimatedStyle
}> & Children

type AnimatedDivRefElement = HTMLDivElement
type AnimatedDivProps = React.ComponentPropsWithoutRef<'div'> & AnimatedDivExtraProps




const AnimatedDiv = React.memo(
  React.forwardRef<AnimatedDivRefElement, AnimatedDivProps>(
    (props, forwardedRef) => {
      const {
        animatedStyle,
        children,
        ...restProps
      } = props
      
      
      const elemRef = useRef<AnimatedDivRefElement>(null)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      
      
      useRefreshElemStyleUpdaters(elemRef, animatedStyle)
      
      
      return (
        <div
          data-display-name="AnimatedDiv"
          {...restProps}
          ref={elemRef}
        >
          {children}
        </div>
      )
    }
  )
)
AnimatedDiv.displayName = 'AnimatedDiv'
export default AnimatedDiv


