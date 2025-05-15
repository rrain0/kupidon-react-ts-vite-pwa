import React, { useImperativeHandle, useRef } from 'react'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu
import Children = ReactU.Children




export type MyComponentExtraProps = Pu<{
  // custom props
  myProp: boolean
}> & Children

export type MyComponentProps = 
  & React.ComponentProps<'div'> 
  & MyComponentExtraProps



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    ref, children,
    myProp,
    ...restProps
  } = props
  
  const elemRef = useRef<HTMLDivElement>(null)
  // Хук просто пихает всё что мы вернём из функции в переданный ref,
  // учитывая, что он может быть функцией или объектом
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  
  return (
    <div // Frame
      data-display-name='MyComponent'
      {...restProps}
      ref={elemRef}
    >
      {children}
    </div>
  )
})
MyComponent.displayName = 'MyComponent'
//export default MyComponent



