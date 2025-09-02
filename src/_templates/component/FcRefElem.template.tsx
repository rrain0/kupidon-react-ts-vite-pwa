import { CssU } from '@utils/css/CssU.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import React from 'react'
import { TypeU } from '@utils/common/TypeU.ts'
import Pu = TypeU.Pu
import CssLength = CssU.CssLength
import createCssCustomPropsMapper = ReactU.createCssCustomPropsMapper




// Use typed css prop names
export const MyComponentCssProps = createCssCustomPropsMapper<Pu<{
  ph: CssLength
  pv: CssLength
}>>()

export type MyComponentExtraProps = Pu<{
  // custom props
  myProp: boolean
}>

export type MyComponentProps =
  & React.ComponentProps<'div'>
  & MyComponentExtraProps



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    children,
    myProp,
    ...restProps
  } = props
  
  return (
    <div
      data-display-name='MyComponent'
      {...restProps}
    >
      {children}
    </div>
  )
})
MyComponent.displayName = 'MyComponent'
export default MyComponent



