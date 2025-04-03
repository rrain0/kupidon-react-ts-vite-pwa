import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Pu = TypeU.Pu
import Children = ReactU.Children
import colC = EmotionCommon.colC
import resetButton = EmotionCommon.resetButton




const ExtensibleComponent = styled.button`
  ${resetButton};
`


type ComponentExtraProps = Pu<{
  isError: boolean
}> & Children

type ComponentRefElement = HTMLButtonElement
type ComponentProps = React.ComponentPropsWithoutRef<typeof ExtensibleComponent> & ComponentExtraProps




const Component = React.memo(
  React.forwardRef<ComponentRefElement, ComponentProps>(
    (props, forwardedRef) => {
      const {
        children,
        ...restProps
      } = props
      
      
      const elemRef = useRef<ComponentRefElement>(null)
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
