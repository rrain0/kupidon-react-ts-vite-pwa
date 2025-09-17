import styled from '@emotion/styled'
import React from 'react'



export type ContentsProps = React.ComponentProps<'div'>

const Contents = React.memo((props: ContentsProps) => {
  return (
    <ContentsDiv data-display-name='Contents' {...props}/>
  )
})
Contents.displayName = 'Contents'
export default Contents



const ContentsDiv = styled.div({ display: 'contents' })
