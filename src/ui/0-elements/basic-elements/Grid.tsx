import styled from '@emotion/styled'
import {
  GridViewShortProps,
  processGridViewShortProps,
} from '@util/react/short-props/processGridViewShortProps.ts'
import React from 'react'



export type GridProps = React.ComponentProps<typeof GridBox> & GridViewShortProps

export const Grid = React.memo((props: GridProps) => {
  
  const { css, gridViewRest } = processGridViewShortProps(props)
  const { children, ...restProps } = gridViewRest
  
  return (
    <GridBox
      data-display-name='Grid'
      css={{ '&&': css }}
      {...restProps}
    >
      {children}
    </GridBox>
  )
})
Grid.displayName = 'Grid'
export default Grid


const GridBox = styled.div({ display: 'grid' })




