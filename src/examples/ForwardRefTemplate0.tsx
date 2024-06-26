import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useImperativeHandle, useRef } from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils'
import { AppTheme } from '@util/theme/AppTheme.ts'
import PartialUndef = TypeUtils.PartialUndef





export type ComponentCustomProps = PartialUndef<{
    
}>
export type ComponentForwardRefProps = React.JSX.IntrinsicElements['div']
//export type ComponentForwardRefProps = Omit<React.JSX.IntrinsicElements['div'], 'children'>
export type ComponentRefElement = HTMLDivElement
export type ComponentProps = ComponentCustomProps & ComponentForwardRefProps



const Component = 
React.memo(
React.forwardRef<ComponentRefElement, ComponentProps>(
(props, forwardedRef)=>{
  const { 
    
    ...restProps 
  } = props
  
  
  const elemRef = useRef<ComponentRefElement>(null)
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