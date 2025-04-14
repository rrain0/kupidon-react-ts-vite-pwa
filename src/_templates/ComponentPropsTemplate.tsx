import React from 'react'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Children = ReactU.Children
import Pu = TypeU.Pu
import ClassStyle = ReactU.ClassStyle




export type MyComponentProps = Pu<{
  prop: number
}> & ClassStyle & Children

export const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    className,
    style,
    children,
    prop = 0,
  } = props
  
  return (
    <div
      data-display-name="MyComponent"
      className={className}
      style={style}
    >
      <>
      
      </>
    </div>
  )
})
MyComponent.displayName = 'MyComponent'
export default MyComponent

