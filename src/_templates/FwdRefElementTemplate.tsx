import { css } from '@emotion/react'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU.ts'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import Puro = TypeU.Puro
import Children = ReactU.Children
import colC = EmotionCommon.colC




type ComponentProps =
  React.ComponentPropsWithoutRef<'div'>
  & Children
  & Puro<{
    // custom props
    isError: boolean
  }>




const Component = React.memo(
  React.forwardRef<HTMLDivElement, ComponentProps>(
  (props, forwardedRef) => {
      const {
        children,
        ...restProps
      } = props
      
      
      const elemRef = useRef<HTMLDivElement>(null)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      
      
      return (
        <div // Frame
          css={frameStyle}
          {...restProps}
          ref={elemRef}
        >
        
        </div>
      )
    }
  )
)
//export default Component



const frameStyle = (t: AppTheme.Theme) => css`
  ${colC};
  width: 100%;
`
