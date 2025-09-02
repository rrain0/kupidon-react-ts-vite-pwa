import React from 'react'
import { ReactU } from '@utils/react/ReactU.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import Children = ReactU.Children
import Pu = TypeU.Pu
import ClassStyle = ReactU.ClassStyle




export type MyComponentProps = Pu<{
  prop: number
}> & ClassStyle & Children



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    className, style, children,
    prop = 0,
  } = props
  
  return (
    <div
      data-display-name='MyComponent'
      className={className}
      style={style}
    >
      {children}
    </div>
  )
})
MyComponent.displayName = 'MyComponent'
export default MyComponent

