import React from 'react'
import { TypeU } from 'src/util/common/TypeU'
import Pu = TypeU.Pu




export type MyComponentProps = Pu<{
  prop: number
  children: (props: MyComponentRenderProps) => React.ReactNode
}>
export type MyComponentRenderProps = {

}



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    children,
    prop = 0,
  } = props
  
  return children?.({ })
})
MyComponent.displayName = 'MyComponent'
//export default MyComponent

