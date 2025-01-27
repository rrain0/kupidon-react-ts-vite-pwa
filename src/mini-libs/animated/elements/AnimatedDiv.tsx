import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import React, {
  useImperativeHandle,
  useRef,
} from 'react'
import { StyleAnimatedProp } from 'src/mini-libs/animated/AnimatedProps.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useUpdateStyle } from 'src/mini-libs/animated/elementUpdate.ts'
import Puro = TypeU.Puro
import Children = ReactU.Children



type AnimatedDivExtraProps = Puro<{
  animated: StyleAnimatedProp
}> & Children

type AnimatedDivRefElement = HTMLDivElement
type AnimatedDivProps = React.ComponentPropsWithoutRef<'div'> & AnimatedDivExtraProps




const AnimatedDiv = React.memo(
  React.forwardRef<AnimatedDivRefElement, AnimatedDivProps>(
    (props, forwardedRef) => {
      const {
        animated,
        children,
        ...restProps
      } = props
      
      
      const elemRef = useRef<AnimatedDivRefElement>(null)
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
      
      
      return (
        <div // Frame
          {...restProps}
          ref={elemRef}
        >
          {children}
        </div>
      )
    }
  )
)
export default AnimatedDiv


