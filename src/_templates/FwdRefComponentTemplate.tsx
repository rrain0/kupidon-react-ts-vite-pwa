import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU.ts'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import Puro = TypeU.Puro
import Children = ReactU.Children
import colC = EmotionCommon.colC
import resetButton = EmotionCommon.resetButton




const ExtensibleComponent = styled.button`
  ${resetButton};
`



type ComponentProps =
  React.ComponentPropsWithoutRef<typeof ExtensibleComponent>
  & Children
  & Puro<{
  // custom props
  isError: boolean
}>




const Component = React.memo(
  React.forwardRef<HTMLButtonElement, ComponentProps>(
    (props, forwardedRef) => {
      const {
        children,
        ...restProps
      } = props
      
      
      const elemRef = useRef<HTMLButtonElement>(null)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      
      
      return (
        <ExtensibleComponent // Frame
          css={frameStyle}
          {...restProps}
          ref={elemRef}
        >
        
        </ExtensibleComponent>
      )
    }
  )
)
//export default Component



const frameStyle = (t: AppTheme.Theme) => css`
  ${colC};
  width: 100%;
`
