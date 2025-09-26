import React from 'react'

import { Pu } from '@utils/base/tsUtils.ts'




const ToBeExtended = (props: React.ComponentProps<'div'>) => <div/>


export type MyComponentExtraProps = Pu<{
  myProp: boolean
}>

export type MyComponentProps =
  & Omit<React.ComponentProps<typeof ToBeExtended>, 'children'>
  & MyComponentExtraProps



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    myProp,
    ...restProps
  } = props
  
  
  return (
    <ToBeExtended
      data-display-name='MyComponent'
      {...restProps}
    />
  )
})
MyComponent.displayName = 'MyComponent'
export default MyComponent


