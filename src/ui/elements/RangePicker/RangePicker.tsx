import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useImperativeHandle, useRef } from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils'
import { AppTheme } from '@util/theme/AppTheme.ts'
import PartialUndef = TypeUtils.PartialUndef
import Theme = AppTheme.Theme
import noop = TypeUtils.noop
import Setter = TypeUtils.Setter





export type RangePickerCustomProps = PartialUndef<{
  minMax: [number, number]
  range: [number, number]
  setRange: Setter<[number, number]>
}>
export type RangePickerForwardRefProps = React.JSX.IntrinsicElements['div']
//export type RangePickerForwardRefProps = Omit<React.JSX.IntrinsicElements['div'], 'children'>
export type RangePickerRefElement = HTMLDivElement
export type RangePickerProps = RangePickerCustomProps & RangePickerForwardRefProps



const RangePicker =
React.memo(
React.forwardRef<RangePickerRefElement, RangePickerProps>(
(props, forwardedRef)=>{
  const {
    minMax = [0, 100],
    range = [0, 50],
    setRange = noop,
    ...restProps
  } = props
  
  
  const elemRef = useRef<RangePickerRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  return <div css={frameStyle}
    {...restProps}
    ref={elemRef}
  >
    <div css={bar}/>
  </div>
}))
export default RangePicker



const frameStyle = (t: AppTheme.Theme) => css`
  width: 100%;
  height: 30px;
  position: relative;
  border-radius: 999999px;
  border: 1px solid gray;
`

const bar = (t: AppTheme.Theme) => css`
  position: absolute;
  height: 100%;
  background: black;
  
  left: 30%;
  width: 30%;
`