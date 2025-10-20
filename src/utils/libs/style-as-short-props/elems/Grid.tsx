import styled from '@emotion/styled'
import {
  type GridViewShortProps,
  processGridViewShortProps,
} from 'src/utils/libs/style-as-short-props/props/processGridViewShortProps.ts'
import React from 'react'



export type GridProps = React.ComponentProps<typeof GridDiv> & GridViewShortProps

const Grid = React.memo((props: GridProps) => {
  
  const { css, gridViewRest } = processGridViewShortProps(props)
  const { children, ...restProps } = gridViewRest
  
  return (
    <GridDiv
      data-display-name='Grid'
      {...restProps}
      css={css}
    >
      {children}
    </GridDiv>
  )
})
Grid.displayName = 'Grid'
export default Grid



const GridDiv = styled.div({ display: 'grid' })
