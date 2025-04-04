import React, {
  useImperativeHandle,
  useRef,
} from 'react'
import { AnimatedElemStyle } from 'src/mini-libs/animated/AnimatedProps.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import {
  useUpdateElemStyleUpdaters,
} from 'src/mini-libs/animated/animatedUpdaters.ts'
import Pu = TypeU.Pu
import Children = ReactU.Children



type AnimatedDivExtraProps = Pu<{
  animatedStyle: AnimatedElemStyle
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
      
      
      useUpdateElemStyleUpdaters(elemRef, animatedStyle)
      
      
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


