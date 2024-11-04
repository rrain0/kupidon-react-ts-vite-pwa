import clsx from 'clsx'
import React from 'react'
import { LineProgressS } from 'src/ui/0-elements/LineProgress/LineProgressS'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle



export type LineProgressProps = ClassStyle & Puro<{
  progress?: number | undefined // float 0..100
}>

const LineProgress = React.memo(
  (props: LineProgressProps) => {
    
    const {
      progress = 0,
      className,
      ...restProps
    } = props
    
    return (
      <div
        className={clsx(LineProgressS.W.e.frame.e.name, className)}
        {...restProps}
      >
        <div
          className={LineProgressS.W.e.line.e.name}
          style={{ width: `${progress}%` }}
        />
      </div>
    )
  }
)
export default LineProgress

