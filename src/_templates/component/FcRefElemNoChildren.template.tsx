import { CssLength } from '@utils/css/cssUtils.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import React from 'react'
import { Pu } from '@utils/base/typeUtils.ts'
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
  & Omit<React.ComponentProps<'div'>, 'children'>
  & MyComponentExtraProps



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    myProp,
    ...restProps
  } = props
  
  return (
    <div
      data-display-name='MyComponent'
      {...restProps}
    />
  )
})
MyComponent.displayName = 'MyComponent'
export default MyComponent



