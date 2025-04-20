import React, {
  useImperativeHandle,
  useRef,
} from 'react'
import { AnimatedElemStyle, AnimatedElemAttrs } from 'src/mini-libs/animated/AnimatedProps.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import {
  useUpdateElemStyleUpdaters, useUpdateElemAttrsUpdaters,
} from 'src/mini-libs/animated/animatedUpdaters.ts'
import Pu = TypeU.Pu
import Children = ReactU.Children



type AnimatedDivExtraProps = Pu<{
  animatedStyle: AnimatedElemStyle
  animatedAttrs: AnimatedElemAttrs
}> & Children

type AnimatedDivRefElement = HTMLDivElement
type AnimatedDivProps = React.ComponentPropsWithoutRef<'div'> & AnimatedDivExtraProps




const AnimatedDiv = React.memo(
  React.forwardRef<AnimatedDivRefElement, AnimatedDivProps>(
    (props, forwardedRef) => {
      const {
        animatedStyle,
        animatedAttrs,
        children,
        ...restProps
      } = props
      
      
      const elemRef = useRef<AnimatedDivRefElement>(null)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      
      
      useUpdateElemStyleUpdaters(elemRef, animatedStyle)
      useUpdateElemAttrsUpdaters(elemRef, animatedAttrs)
      
      
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


