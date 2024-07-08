import { css } from '@emotion/react'
import React, { useImperativeHandle, useRef } from 'react'
import { TypeU } from '@util/common/TypeU.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import PartialUndef = TypeU.PartialUndef










type ComponentProps = React.ComponentPropsWithoutRef<'div'> & PartialUndef<{
  // custom props
  hasError: boolean
}>




const Component = 
React.memo(
React.forwardRef<HTMLDivElement, ComponentProps>(
(props, forwardedRef) => {
  const { 
    
    ...restProps 
  } = props
  
  
  const elemRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(forwardedRef, () => elemRef.current!,[])
  
  
  return <div // Frame
    css={frameStyle}
    {...restProps}
    ref={elemRef}
  >
    
  </div>
}))
//export default Component



const frameStyle = (t: AppTheme.Theme) => css`

`