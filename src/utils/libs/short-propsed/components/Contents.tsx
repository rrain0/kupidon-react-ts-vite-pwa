import React from 'react'



export type ContentsProps = React.ComponentProps<'div'>

const Contents = React.memo((props: ContentsProps) => {
  return (
    <div data-display-name='Contents' {...props}/>
  )
})
Contents.displayName = 'Contents'
export default Contents
