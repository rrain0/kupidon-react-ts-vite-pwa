import styled from '@emotion/styled'
import { animated, useSpring, config, easings } from '@react-spring/web'
import React, { useState } from 'react'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Puro = TypeU.Puro
import ClassStyleProps = ReactU.ClassStyleProps



type RippleProps = ClassStyleProps & Puro<{
  isShow: boolean
}>

const Ripple = React.memo(
  (props: RippleProps) => {
    
    const { isShow, ...restProps } = props
    
    console.log('isShow', isShow)
    
    
    /*
    // SPRING EXAMPLE
    const [hovered, setHover] = useState(false)
    // if passing an object, it updates on every rerender
    const { progress } = useSpring({
      progress: hovered ? 1 : 0,
      
      // config types:
      
      // Predefined Spring Config
      //import { config } from '@react-spring/web'
      config: config.default,
     
      // Predefined Spring Easing Config
      //import { easings } from '@react-spring/web'
      config: {
        duration: 4000,
        easing: easings.easeOutCubic,
      },
     
      // Custom Easing Config via 'bezier-easing' package
      // css 'cubic-bezier(0.17, 0.84, 0.44, 1)'
      //import BezierEasing from 'bezier-easing'
      //const animationEasing = BezierEasing(0.17, 0.84, 0.44, 1)
      config: {
        duration: 4000,
        easing: animationEasing,
      },
    })
    */
    
    
    /*
     TODO
      use linear-gradient for ripple to become edges darker
     */
    const [{ opacity }] = useSpring(() => {
      return {
        from: { opacity: 1 },
        to: { opacity: 0 },
        config: {
          duration: 4000,
          easing: easings.easeOutCubic,
        },
        reset: true,
        //import { config, easings } from '@react-spring/web'
        //config: config.default,
      }
    }, [isShow])
    
    const [{ opacity }] = useSpring(() => {
      if (!isShow) return {
        to: { opacity: 0 },
      }
      return {
        from: { opacity: 1 },
        to: { opacity: 0 },
        config: {
          duration: 4000,
          easing: easings.easeOutCubic,
        },
        reset: true,
        //import { config, easings } from '@react-spring/web'
        //config: config.default,
      }
    }, [isShow])
    
    
    const [{ width, height }] = useSpring(curr => {
      return {
        from: {
          width: '100%',
          height: '100%',
        },
        to: {
          width: '100%',
          height: '100%',
        },
      }
    }, [isShow])
    
    
    return (
      <RippleFrame
        {...restProps}
      >
        <RippleAnim
          style={{
            opacity,
          }}
        />
      </RippleFrame>
    )
  }
)
export default Ripple



const RippleFrame = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`


const RippleAnim = styled(animated.div)`
  position: absolute;
  /*left: 50%;
  top: 50%;
  width: 0;
  height: 0;*/
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: azure;
`
