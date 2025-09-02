import React from 'react'
import { TypeU } from '@utils/common/TypeU.ts'
import Pu = TypeU.Pu




export type MyComponentProps = Pu<{
  myProp: number
  children: (props: MyComponentRenderProps) => React.ReactNode
}>
export type MyComponentRenderProps = {
  myRenderProp: boolean
}



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    children,
    myProp = 0,
  } = props
  
  return children?.({ myRenderProp: true })
})
MyComponent.displayName = 'MyComponent'
export default MyComponent

