import clsx from 'clsx'
import React from 'react'
import { SelectItemIndicatorS } from 'src/ui/0-elements/select-item/SelectItemIndicator/SelectItemIndicatorS'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle




export type IndicatorSelection = 0 | false | 1 | 2 | true

type SelectItemProps =
  ClassStyle &
  Puro<{
    indicators: IndicatorSelection[]
  }>

const SelectItemIndicator = React.memo(
  (props: SelectItemProps) => {
    
    const {
      indicators,
      className,
      style,
    } = props
    
    
    
    return (
      <div
        //displayName={'IndicatorFrame'}
        className={clsx(SelectItemIndicatorS.W.e.indicatorFrame.e.name, className)}
        style={style}
      >
        <div
          //displayName={'IndicatorBox'}
          className={SelectItemIndicatorS.W.e.indicatorBox.e.name}
        >
          {indicators.map((it, i) => (
            <React.Fragment key={`${i} ${it}`}>
              {(() => {
                if (it === 0 || it === false) return (
                  <div
                    //displayName={'Indicator0'}
                    className={SelectItemIndicatorS.W.e.indicator0.e.name}
                  />
                )
                if (it === 1) return (
                  <div
                    //displayName={'Indicator1'}
                    className={SelectItemIndicatorS.W.e.indicator1.e.name}
                  />
                )
                if (it === 2 || it === true) return (
                  <div
                    //displayName={'Indicator2'}
                    className={SelectItemIndicatorS.W.e.indicator2.e.name}
                  />
                )
              })()}
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }
)
export default SelectItemIndicator





