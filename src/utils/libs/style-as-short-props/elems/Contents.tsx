import styled from '@emotion/styled'
import React from 'react'
import {
  type CommonViewShortProps, processCommonViewShortProps,
} from 'src/utils/libs/style-as-short-props/props/processCommonViewShortProps.ts'



export type ContentsProps = React.ComponentProps<'div'> & CommonViewShortProps

const Contents = React.memo((props: ContentsProps) => {
  
  const { css, commonViewRest } = processCommonViewShortProps(props)
  const { children, ...restProps } = commonViewRest
  
  return (
    <ContentsDiv
      data-display-name='Contents'
      {...restProps}
      css={css}
    >
      {children}
    </ContentsDiv>
  )
})
Contents.displayName = 'Contents'
export default Contents



const ContentsDiv = styled.div({ display: 'contents' })
