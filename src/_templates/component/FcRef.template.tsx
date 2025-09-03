import styled from '@emotion/styled'
import React from 'react'
import { TypeU } from '@utils/base/TypeU.ts'
import Pu = TypeU.Pu




const ToBeExtended = styled.div()


type MyComponentExtraProps = Pu<{
  myProp: boolean
}>

type MyComponentProps = 
  & React.ComponentProps<typeof ToBeExtended> 
  & MyComponentExtraProps



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    children,
    myProp,
    ...restProps
  } = props
  
  
  return (
    <ToBeExtended
      data-display-name='MyComponent'
      {...restProps}
    >
      {children}
    </ToBeExtended>
  )
})
MyComponent.displayName = 'MyComponent'
export default MyComponent


