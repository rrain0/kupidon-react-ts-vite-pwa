import styled from '@emotion/styled'
import { animated, useSpring, config, easings } from '@react-spring/web'
import React from 'react'
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
    TODO
     move BezierEasing here
     use linear-gradient for ripple to become edges darker
     */
    
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
        //import { config, easings } from '@react-spring/web'
        //config: config.default,
        reset: true,
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
