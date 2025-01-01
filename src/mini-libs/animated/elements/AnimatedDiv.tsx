import { useAsRefGet } from '@util/react-state/useAsRefGet.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import React, {
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react'
import { AnimatedStyle } from 'src/mini-libs/animated/AnimatedStyle.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Puro = TypeU.Puro
import Children = ReactU.Children



type AnimatedDivExtraProps = Puro<{
  animated: AnimatedStyle
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
      
      const [getAnimated] = useAsRefGet(animated)
      const [getIsFrameRequested, setIsFrameRequested] = useRefGetSet(false)
      
      const updateElement = useCallback(() => {
        const el = elemRef.current
        if (el) {
          el.style.transform = `${(getAnimated()?.transform?.get() ?? '')}`
          el.style.zIndex = `${(getAnimated()?.zIndex?.get() ?? '')}`
          el.style.scale = `${(getAnimated()?.scale?.get() ?? '')}`
          el.style.opacity = `${(getAnimated()?.opacity?.get() ?? '')}`
        }
      }, [])
      
      const requestUpdateElement = useCallback(() => {
        if (!getIsFrameRequested()) {
          setIsFrameRequested(true)
          requestAnimationFrame(() => {
            updateElement()
            setIsFrameRequested(false)
          })
        }
      }, [])
      
      const transform = animated?.transform
      useLayoutEffect(() => {
        updateElement() // TODO это здесь чтобы обновить элемент при начальном рендере
        transform?.onChange(requestUpdateElement)
        return () => transform?.removeOnChange(requestUpdateElement)
      }, [transform])
      
      const zIndex = animated?.zIndex
      useLayoutEffect(() => {
        updateElement()
        zIndex?.onChange(requestUpdateElement)
        return () => zIndex?.removeOnChange(requestUpdateElement)
      }, [zIndex])
      
      const scale = animated?.scale
      useLayoutEffect(() => {
        updateElement()
        scale?.onChange(requestUpdateElement)
        return () => scale?.removeOnChange(requestUpdateElement)
      }, [scale])
      
      const opacity = animated?.opacity
      useLayoutEffect(() => {
        updateElement()
        opacity?.onChange(requestUpdateElement)
        return () => opacity?.removeOnChange(requestUpdateElement)
      }, [opacity])
      
      
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


