import { css } from '@emotion/react'
import React from 'react'
import clsx from 'clsx'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { PieProgressStyle } from 'src/ui/elements/PieProgress/PieProgressStyle.ts'
import PartialUndef = TypeUtils.PartialUndef
import Theme = AppTheme.Theme





type PieProgressElement = HTMLDivElement
type PieProgressProps = React.ComponentPropsWithoutRef<'div'> & PartialUndef<{
  progress: number
  type: 'percent'|'oneBased'
}>



const PieProgress =
React.memo(
React.forwardRef<PieProgressElement, PieProgressProps>(
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
    className={clsx(className, PieProgressStyle.El.clazz.pieProgress)}
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


