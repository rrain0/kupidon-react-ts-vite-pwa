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
        updateStyleTransform,
        updateStyleTranslate,
        updateStyleRotate,
        updateStyleScale,
        updateStyleOpacity,
        
        updateStyleTop,
        updateStyleRight,
        updateStyleBottom,
        updateStyleLeft,
        updateStyleZIndex,
      } = useUpdateStyle(elemRef)
      
      const {
        updateImgSrc,
      } = useUpdateImg(elemRef)
      
      // TODO iterate by object keys
      getOldAnimated()?.transform?.removeOnChange(updateStyleTransform)
      getOldAnimated()?.translate?.removeOnChange(updateStyleTranslate)
      getOldAnimated()?.rotate?.removeOnChange(updateStyleRotate)
      getOldAnimated()?.scale?.removeOnChange(updateStyleScale)
      getOldAnimated()?.opacity?.removeOnChange(updateStyleOpacity)
      
      getOldAnimated()?.top?.removeOnChange(updateStyleTop)
      getOldAnimated()?.right?.removeOnChange(updateStyleRight)
      getOldAnimated()?.bottom?.removeOnChange(updateStyleBottom)
      getOldAnimated()?.left?.removeOnChange(updateStyleLeft)
      getOldAnimated()?.zIndex?.removeOnChange(updateStyleZIndex)
      
      getOldAnimated()?.src?.removeOnChange(updateImgSrc)
      
      setOldAnimated(animated)
      
      getOldAnimated()?.transform?.onChange(updateStyleTransform)
      getOldAnimated()?.translate?.onChange(updateStyleTranslate)
      getOldAnimated()?.rotate?.onChange(updateStyleRotate)
      getOldAnimated()?.scale?.onChange(updateStyleScale)
      getOldAnimated()?.opacity?.onChange(updateStyleOpacity)
      
      getOldAnimated()?.top?.onChange(updateStyleTop)
      getOldAnimated()?.right?.onChange(updateStyleRight)
      getOldAnimated()?.bottom?.onChange(updateStyleBottom)
      getOldAnimated()?.left?.onChange(updateStyleLeft)
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


