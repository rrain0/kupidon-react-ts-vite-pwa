import React from 'react'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Children = ReactU.Children
import Puro = TypeU.Puro



/* export */ type ComponentProps =
  Children
  & Puro<{
  
  }>

const Component = React.memo(
  (props: ComponentProps) => {
    
    const {
      children,
    } = props
    
    return (
      <>{children}</>
    )
  }
)
//export default Component

