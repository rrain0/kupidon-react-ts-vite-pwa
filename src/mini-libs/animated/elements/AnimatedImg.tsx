import { useAsRefGet } from '@util/react-state/useAsRefGet.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import React, {
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react'
import { AnimatedString } from 'src/mini-libs/animated/AnimatedStyle.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Puro = TypeU.Puro



type AnimatedImgExtraProps = Puro<{
  animated: Puro<{
    src: AnimatedString
  }>
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
      
      const [getAnimated] = useAsRefGet(animated)
      const [getIsFrameRequested, setIsFrameRequested] = useRefGetSet(false)
      
      const updateElement = useCallback(() => {
        const el = elemRef.current
        if (el) {
          el.src = `${(getAnimated()?.src?.get() ?? '')}`
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
      
      const src = animated?.src
      useLayoutEffect(() => {
        updateElement()
        src?.onChange(requestUpdateElement)
        return () => src?.removeOnChange(requestUpdateElement)
      }, [src])
      
      
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


