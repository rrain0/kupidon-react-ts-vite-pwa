import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Pu = TypeU.Pu
import Children = ReactU.Children
import colC = EmotionCommon.colC
import resetButton = EmotionCommon.resetButton




const ToBeExtended = styled.button`
  ${resetButton};
`


type MyComponentExtraProps = Pu<{
  isError: boolean
}> & Children

type MyComponentProps = 
  & React.ComponentPropsWithRef<typeof ToBeExtended> 
  & MyComponentExtraProps



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    children,
    ...restProps
  } = props
  
  
  return (
    <ToBeExtended // Frame
      data-display-name='MyComponent'
      css={frameStyle}
      {...restProps}
    >
      {children}
    </ToBeExtended>
  )
})
MyComponent.displayName = 'MyComponent'
//export default MyComponent



const frameStyle = (t: AppTheme.Theme) => css`
  ${colC};
  width: 100%;
`
