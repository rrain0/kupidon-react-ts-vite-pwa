import { CssU } from '@util/css/CssU.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React from 'react'
import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu
import mapToCssCustomProps = ReactU.mapToCssCustomProps
import CssLength = CssU.CssLength




// Use typed css prop names
export const MyComponentCssProps = (cssProps: Pu<{
  ph: CssLength
  pv: CssLength
}> = { }) => mapToCssCustomProps(cssProps)

export type MyComponentExtraProps = Pu<{
  // custom props
  myProp: boolean
}>

export type MyComponentProps =
  & React.ComponentProps<'div'>
  & MyComponentExtraProps



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    children,
    myProp,
    ...restProps
  } = props
  
  return (
    <div
      data-display-name='MyComponent'
      {...restProps}
    >
      {children}
    </div>
  )
})
MyComponent.displayName = 'MyComponent'
//export default MyComponent



