import React from 'react'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Children = ReactU.Children
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle



/* export */ type ComponentProps = ClassStyle & Children & Puro<{
  
}>

const Component = React.memo(
  (props: ComponentProps) => {
    
    const {
      children,
      ...restProps
    } = props
    
    return (
      <div {...restProps}>
        {children}
      </div>
    )
  }
)
//export default Component

