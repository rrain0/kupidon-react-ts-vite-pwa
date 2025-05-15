import styled from '@emotion/styled'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu
import Children = ReactU.Children
import resetButton = EmotionCommon.resetButton




const ToBeExtended = styled.button`
  ${resetButton};
`


type MyComponentExtraProps = Pu<{
  myProp: boolean
}> & Children

type MyComponentProps = 
  & React.ComponentProps<typeof ToBeExtended> 
  & MyComponentExtraProps



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    ref, children,
    ...restProps
  } = props
  
  
  const elemRef = useRef<HTMLButtonElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  
  return (
    <ToBeExtended // Frame
      data-display-name='MyComponent'
      {...restProps}
      ref={elemRef}
    >
      {children}
    </ToBeExtended>
  )
})
MyComponent.displayName = 'MyComponent'
//export default MyComponent

