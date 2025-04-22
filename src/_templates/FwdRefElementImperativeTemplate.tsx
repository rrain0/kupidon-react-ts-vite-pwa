import { css } from '@emotion/react'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Pu = TypeU.Pu
import Children = ReactU.Children
import colC = EmotionCommon.colC
import ClassStyle = ReactU.ClassStyle




export type MyComponentExtraProps = Pu<{
  // custom props
  isError: boolean
}> & ClassStyle & Children

export type MyComponentProps = React.ComponentPropsWithRef<'div'> & MyComponentExtraProps



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    ref, children,
    isError,
    ...restProps
  } = props
  
  const elemRef = useRef<HTMLDivElement>(null)
  // Хук просто пихает всё что мы вернём из функции в переданный ref,
  // учитывая, что он может быть функцией или объектом
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  
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
})
MyComponent.displayName = 'MyComponent'
//export default MyComponent



const frameS = (t: AppTheme.Theme) => css`
  ${colC};
  width: 100%;
`
