import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import React, {
  useImperativeHandle,
  useRef,
} from 'react'
import {
  ImgAnimatedProps,
  StyleAnimatedProp,
} from 'src/mini-libs/animated/AnimatedProps.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useUpdateImg, useUpdateStyle } from 'src/mini-libs/animated/elementUpdate.ts'
import Puro = TypeU.Puro




type AnimatedImgExtraProps = Puro<{
  animated: ImgAnimatedProps & StyleAnimatedProp
}>

type AnimatedImgRefElement = HTMLImageElement
type AnimatedImgProps = React.ComponentPropsWithoutRef<'img'> & AnimatedImgExtraProps




const AnimatedImg = React.memo(
  React.forwardRef<AnimatedImgRefElement, AnimatedImgProps>(
    (props, forwardedRef) => {
      const {
        animated,
        ...restProps
      } = props
      
      
      const elemRef = useRef<AnimatedImgRefElement>(null)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      
      
      const [getOldAnimated, setOldAnimated] = useRefGetSet(animated)
      
      const {
        updateStyleOpacity,
        updateStyleScale,
        updateStyleTransform,
        updateStyleZIndex,
      } = useUpdateStyle(elemRef)
      
      const {
        updateImgSrc,
      } = useUpdateImg(elemRef)
      
      getOldAnimated()?.opacity?.removeOnChange(updateStyleOpacity)
      getOldAnimated()?.scale?.removeOnChange(updateStyleScale)
      getOldAnimated()?.transform?.removeOnChange(updateStyleTransform)
      getOldAnimated()?.zIndex?.removeOnChange(updateStyleZIndex)
      
      getOldAnimated()?.src?.removeOnChange(updateImgSrc)
      
      setOldAnimated(animated)
      
      getOldAnimated()?.opacity?.onChange(updateStyleOpacity)
      getOldAnimated()?.scale?.onChange(updateStyleScale)
      getOldAnimated()?.transform?.onChange(updateStyleTransform)
      getOldAnimated()?.zIndex?.onChange(updateStyleZIndex)
      
      animated?.src?.onChange(updateImgSrc)
      
      
      return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img // Frame
          {...restProps}
          ref={elemRef}
        />
      )
    }
  )
)
export default AnimatedImg


