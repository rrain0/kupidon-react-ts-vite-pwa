import React from 'react'



export type MyComponentProps = {
  prop: string
}

const MyComponent = React.memo((props: MyComponentProps) => {
  const { prop } = props
  
  return (
    <div
      data-display-name='MyComponent'
    >
    </div>
  )
})
MyComponent.displayName = 'MyComponent'
export default MyComponent

