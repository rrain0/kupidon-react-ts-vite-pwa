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

type AnimatedDivProps = React.ComponentPropsWithRef<'div'> & AnimatedDivExtraProps




const AnimatedDiv = React.memo((props: AnimatedDivProps) => {
  const {
    ref,
    animatedStyle,
    animatedAttrs,
    children,
    ...restProps
  } = props
  
  
  const elemRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  
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
})

AnimatedDiv.displayName = 'AnimatedDiv'
export default AnimatedDiv


