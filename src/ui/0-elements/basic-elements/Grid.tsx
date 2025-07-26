import styled from '@emotion/styled'
import {
  GridViewShortProps,
  processGridViewShortProps,
} from '@util/react/short-props/props/processGridViewShortProps.ts'
import clsx from 'clsx'
import React from 'react'



export type GridProps = React.ComponentProps<typeof GridBox> & GridViewShortProps

export const Grid = React.memo((props: GridProps) => {
  
  const { css, gridViewRest } = processGridViewShortProps(props)
  const { children, className, ...restProps } = gridViewRest
  
  const gridStyleClassName = 'gridStyle'
  
  return (
    <GridBox
      data-display-name='Grid'
      {...restProps}
      css={{
        [`&.${gridStyleClassName}`]: css,
      }}
      className={clsx(className, gridStyleClassName)}
    >
      {children}
    </GridBox>
  )
})
Grid.displayName = 'Grid'
export default Grid


const GridBox = styled.div({ display: 'grid' })




