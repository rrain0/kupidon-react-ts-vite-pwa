import React from 'react'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Children = ReactU.Children
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle




export type MyComponentProps = ClassStyle & Children & Puro<{
  prop: number
}>
export const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    className,
    style,
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

