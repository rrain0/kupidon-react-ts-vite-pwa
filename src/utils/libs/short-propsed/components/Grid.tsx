import styled from '@emotion/styled'
import {
  type GridViewShortProps,
  processGridViewShortProps,
} from 'src/utils/libs/short-propsed/props/processGridViewShortProps.ts'
import clsx from 'clsx'
import React from 'react'



export type GridProps = React.ComponentProps<typeof GridDiv> & GridViewShortProps

const Grid = React.memo((props: GridProps) => {
  
  const { css, gridViewRest } = processGridViewShortProps(props)
  const { children, className, ...restProps } = gridViewRest
  
  const gridStyleClassName = 'gridStyle'
  
  return (
    <GridDiv
      data-display-name='Grid'
      {...restProps}
      css={{
        [`&.${gridStyleClassName}`]: css,
      }}
      className={clsx(className, gridStyleClassName)}
    >
      {children}
    </GridDiv>
  )
})
Grid.displayName = 'Grid'
export default Grid



const GridDiv = styled.div({ display: 'grid' })
