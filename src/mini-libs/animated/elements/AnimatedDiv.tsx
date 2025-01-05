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
        updateStyleOpacity,
        updateStyleScale,
        updateStyleTransform,
        updateStyleZIndex,
      } = useUpdateStyle(elemRef)
      
      getOldAnimated()?.opacity?.removeOnChange(updateStyleOpacity)
      getOldAnimated()?.scale?.removeOnChange(updateStyleScale)
      getOldAnimated()?.transform?.removeOnChange(updateStyleTransform)
      getOldAnimated()?.zIndex?.removeOnChange(updateStyleZIndex)
      
      setOldAnimated(animated)
      
      getOldAnimated()?.opacity?.onChange(updateStyleOpacity)
      getOldAnimated()?.scale?.onChange(updateStyleScale)
      getOldAnimated()?.transform?.onChange(updateStyleTransform)
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


