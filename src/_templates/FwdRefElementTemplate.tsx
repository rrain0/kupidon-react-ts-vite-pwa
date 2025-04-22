import { css } from '@emotion/react'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Pu = TypeU.Pu
import Children = ReactU.Children
import colC = EmotionCommon.colC




export type MyComponentExtraProps = Pu<{
  // custom props
  isError: boolean
}> & Children

export type MyComponentProps = React.ComponentPropsWithRef<'div'> & MyComponentExtraProps



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    children,
    isError,
    ...restProps
  } = props
  
  return (
    <div // Frame
      data-display-name="MyComponent"
      css={frameS}
      {...restProps}
    >
      {children}
    </div>
  )
})
MyComponent.displayName = 'MyComponent'
//export default MyComponent



const frameS = (t: AppTheme.Theme) => css`
  ${colC};
  width: 100%;
`
