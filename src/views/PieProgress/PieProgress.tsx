/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import classNames from 'classnames'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { PieProgressStyle } from 'src/views/PieProgress/PieProgressStyle'
import PartialUndef = TypeUtils.PartialUndef
import Theme = AppTheme.Theme




export type PieProgressCustomProps = PartialUndef<{
  progress: number
  type: 'percent'|'oneBased'
}>
export type PieProgressForwardRefProps = JSX.IntrinsicElements['div']
export type PieProgressRefElement = HTMLDivElement
export type PieProgressProps = PieProgressCustomProps & PieProgressForwardRefProps



const PieProgress =
React.memo(
React.forwardRef<PieProgressRefElement, PieProgressProps>(
(props, forwardedRef)=>{
  const {
    progress = 0,
    type = 'percent',
    className,
    ...restProps
  } = props
  
  const rotation = function(){
    if (type==='percent')
      return progress/100+'turn'
    if (type==='oneBased')
      return progress+'turn'
  }()
  
  return <div css={[
    pieProgressStyle,
    PieProgressStyle.defolt,
    css`--rotation: ${rotation};`,
  ]}
    className={classNames(className, PieProgressStyle.El.clazz.pieProgress)}
    {...restProps}
    ref={forwardedRef}
  />
}))
export default PieProgress





const pieProgressStyle = (t:Theme)=>css`
  @property --rotation {
    syntax: '<angle>';
    initial-value: 0turn;
    inherits: false;
  }
  
  border-radius: 1000000px;
  transition: --rotation 1000ms;
  background-image: conic-gradient(
    ${PieProgressStyle.Prop.varr.progressColor} 0turn var(--rotation),
    ${PieProgressStyle.Prop.varr.restColor} var(--rotation) 1turn
  );
`


