import React, {
  useImperativeHandle,
  useRef,
} from 'react'
import { AnimatedElemStyle, AnimatedElemAttrs } from 'src/mini-libs/animated/AnimatedProps.ts'
import { TypeU } from '@util/common/TypeU.ts'
import {
  useUpdateElemStyleUpdaters, useUpdateElemAttrsUpdaters,
} from 'src/mini-libs/animated/animatedUpdaters.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Pu = TypeU.Pu



type AnimatedDivExtraProps = Pu<{
  animatedStyle: AnimatedElemStyle
  animatedAttrs: AnimatedElemAttrs
}>

type AnimatedDivProps = React.ComponentPropsWithRef<typeof Flex> & AnimatedDivExtraProps




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
    <Flex
      data-display-name='AnimatedDiv'
      {...restProps}
      ref={elemRef}
    >
      {children}
    </Flex>
  )
})

AnimatedDiv.displayName = 'AnimatedDiv'
export default AnimatedDiv


