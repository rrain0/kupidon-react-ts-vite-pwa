/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useImperativeHandle, useRef } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { AppTheme } from 'src/utils/theme/AppTheme'
import PartialUndef = TypeUtils.PartialUndef
import Theme = AppTheme.Theme





export type ComponentCustomProps = PartialUndef<{
    
}>
export type ComponentForwardRefProps = JSX.IntrinsicElements['div']
//export type ComponentForwardRefProps = Omit<JSX.IntrinsicElements['div'], 'children'>
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



const frameStyle = (t:Theme)=>css`

`