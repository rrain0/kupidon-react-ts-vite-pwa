import React, {
  useImperativeHandle,
  useRef,
} from 'react'
import {
  AnimatedImgAttrs,
  AnimatedStyle,
} from 'src/mini-libs/animated/AnimatedProps.ts'
import { TypeU } from '@util/common/TypeU.ts'
import {
  useUpdateElemStyleUpdaters, useUpdateImgAttrsUpdaters,
} from 'src/mini-libs/animated/animatedUpdaters.ts'
import Puro = TypeU.Puro




type AnimatedImgExtraProps = Puro<{
  animatedStyle: AnimatedStyle
  animatedAttrs: AnimatedImgAttrs
}>

type AnimatedImgRefElement = HTMLImageElement
type AnimatedImgProps = React.ComponentPropsWithoutRef<'img'> & AnimatedImgExtraProps




const AnimatedImg = React.memo(
  React.forwardRef<AnimatedImgRefElement, AnimatedImgProps>(
    (props, forwardedRef) => {
      const {
        animatedStyle,
        animatedAttrs,
        ...restProps
      } = props
      
      
      const elemRef = useRef<AnimatedImgRefElement>(null)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      
      
      useUpdateElemStyleUpdaters(elemRef, animatedStyle)
      useUpdateImgAttrsUpdaters(elemRef, animatedAttrs)
      
      
      return (
        <img
          data-display-name="AnimatedImg"
          {...restProps}
          ref={elemRef}
        />
      )
    }
  )
)
AnimatedImg.displayName = 'AnimatedImg'
export default AnimatedImg


