/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import {
  UseContainerScrollStateProps,
  useContainerScrollState,
} from 'src/views/Scrollbar/useContainerScrollState'



export type UseScrollbarsProps = UseContainerScrollStateProps & {
  render: (props: ReturnType<typeof useContainerScrollState>)=>React.ReactNode
}
const UseScrollbars =
React.memo(
(props: UseScrollbarsProps)=>{
  const { render, ...restProps } = props
  
  const scrollbarProps = useContainerScrollState(restProps)
  
  return props.render(scrollbarProps)
})
export default UseScrollbars