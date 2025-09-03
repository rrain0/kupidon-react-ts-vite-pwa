import React, { useImperativeHandle, useRef } from 'react'
import { ReactU } from '@utils/react/ReactU.ts'

import { Pu } from '@utils/base/TypeUtils.ts'
import Children = ReactU.Children




const ToBeExtended = (props: React.ComponentProps<'div'>) => <div/>


export type MyComponentExtraProps = Pu<{
  myProp: boolean
}> & Children

export type MyComponentProps =
  & React.ComponentProps<typeof ToBeExtended> 
  & MyComponentExtraProps



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    ref, children,
    ...restProps
  } = props
  
  
  const elemRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  
  return (
    <ToBeExtended
      data-display-name='MyComponent'
      {...restProps}
      ref={elemRef}
    >
      {children}
    </ToBeExtended>
  )
})
MyComponent.displayName = 'MyComponent'
export default MyComponent

