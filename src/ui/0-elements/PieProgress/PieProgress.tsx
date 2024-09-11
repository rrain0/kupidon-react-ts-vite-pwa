import { css } from '@emotion/react'
import React from 'react'
import clsx from 'clsx'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { PieProgressStyle } from 'src/ui/0-elements/PieProgress/PieProgressStyle.ts'
import PartialUndef = TypeU.PartialUndef
import ClassStyle = ReactU.ClassStyle





export type PieProgressProps = ClassStyle & PartialUndef<{
  progress: number
  type: 'percent' | 'oneBased'
}>


const PieProgress = React.memo(
  (props: PieProgressProps) => {
    const {
      progress = 0,
      type = 'percent',
      className,
      ...restProps
    } = props
    
    const rotation = (() => {
      if (type === 'percent') return `${progress / 100}turn`
      if (type === 'oneBased') return `${progress}turn`
    })()
    
    return (
      <div
        css={[
          pieProgressStyle,
          PieProgressStyle.defolt,
        ]}
        style={{ '--rotation': rotation }}
        className={clsx(className, PieProgressStyle.El.clazz.pieProgress)}
        {...restProps}
      />
    )
  }
)
export default PieProgress





const pieProgressStyle = (t: AppTheme.Theme) => css`
  @property --rotation {
    syntax: '<angle>';
    initial-value: 0turn;
    inherits: false;
  }
  
  border-radius: 999999px;
  transition: --rotation 1000ms;
  background-image: conic-gradient(
    ${PieProgressStyle.Prop.varr.progressColor} 0turn var(--rotation),
    ${PieProgressStyle.Prop.varr.restColor} var(--rotation) 1turn
  );
`


