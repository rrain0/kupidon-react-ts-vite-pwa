import React, {
  useImperativeHandle,
  useRef,
} from 'react'
import { AnimatedElemStyle, AnimatedElemAttrs } from '@libs/animated/AnimatedProps.ts'

import {
  useUpdateElemStyleUpdaters, useUpdateElemAttrsUpdaters,
} from '@libs/animated/animatedUpdaters.ts'
import Flex from 'src/utils/libs/short-propsed/components/Flex.tsx'
import { Pu } from 'src/utils/base/tsUtils.ts'



type AnimatedDivExtraProps = Pu<{
  animatedStyle: AnimatedElemStyle
  animatedAttrs: AnimatedElemAttrs
}>

type AnimatedDivProps = React.ComponentProps<typeof Flex> & AnimatedDivExtraProps




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


