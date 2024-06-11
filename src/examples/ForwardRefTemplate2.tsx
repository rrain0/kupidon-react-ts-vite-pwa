import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useImperativeHandle, useRef } from 'react'
import Ripple, { RippleProps } from 'src/ui/elements/Ripple/Ripple.tsx'
import { TypeUtils } from 'src/util/common/TypeUtils'
import { AppTheme } from '@util/theme/AppTheme.ts'
import PartialUndef = TypeUtils.PartialUndef










type ComponentElement = HTMLDivElement
type ComponentProps = React.ComponentPropsWithoutRef<'div'> & PartialUndef<{
  // custom props
  hasError: boolean
}>




const Component = 
React.memo(
React.forwardRef<ComponentElement, ComponentProps>(
(props, forwardedRef)=>{
  const { 
    
    ...restProps 
  } = props
  
  
  const elemRef = useRef<ComponentElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  return <div css={frameStyle}
    {...restProps}
    ref={elemRef}
  >
    
  </div>
}))
//export default Component



const frameStyle = (t: AppTheme.Theme) => css`

`