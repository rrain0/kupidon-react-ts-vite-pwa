import styled from '@emotion/styled'
import {
  GridViewShortProps,
  processGridViewShortProps,
} from '@util/react/short-props/processGridViewShortProps.ts'
import React from 'react'



export type GridProps = React.ComponentProps<'div'> & GridViewShortProps

export const Grid = React.memo((props: GridProps) => {
  
  const { css, gridViewRest } = processGridViewShortProps(props)
  const { children, ...restProps } = gridViewRest
  
  return (
    <GridDiv
      data-display-name='Grid'
      css={css}
      {...restProps}
    >
      {children}
    </GridDiv>
  )
})
Grid.displayName = 'Grid'
export default Grid


const GridDiv = styled.div({ display: 'grid' })




