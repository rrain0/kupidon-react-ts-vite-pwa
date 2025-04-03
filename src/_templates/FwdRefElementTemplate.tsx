import { css } from '@emotion/react'
import React, { useImperativeHandle, useRef } from 'react'
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

export type MyComponentRefElement = HTMLDivElement
export type MyComponentProps =
  React.ComponentPropsWithoutRef<'div'> & MyComponentExtraProps




const MyComponent = React.memo(
  React.forwardRef<MyComponentRefElement, MyComponentProps>(
    (props, forwardedRef) => {
      const {
        children,
        ...restProps
      } = props
      
      
      const elemRef = useRef<MyComponentRefElement>(null)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      
      
      return (
        <div // Frame
          data-display-name="MyComponent"
          css={frameS}
          {...restProps}
          ref={elemRef}
        >
          {children}
        </div>
      )
    }
  )
)
MyComponent.displayName = 'MyComponent'
//export default MyComponent



const frameS = (t: AppTheme.Theme) => css`
  ${colC};
  width: 100%;
`
