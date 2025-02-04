import clsx from 'clsx'
import React from 'react'
import { SelectMeterS6 } from 'src/ui/0-elements/select-item/SelectMeter/SelectMeterS6.ts'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle




export type IndicatorSelection = 0 | false | 1 | 2 | true

type SelectItemProps = ClassStyle & Puro<{
  metersValues: IndicatorSelection[]
}>

const SelectMeter = React.memo((props: SelectItemProps) => {
  const {
    metersValues,
    className,
    style,
  } = props
  
  
  return (
    <div
      data-display-name="SelectMeter - Frame"
      className={clsx(SelectMeterS6.W.els.meter.n, className)}
      style={style}
    >
      {metersValues?.map((it, i) => (
        <React.Fragment key={`${i} ${it}`}>
          {(() => {
            if (it === 0 || it === false) return (
              <div
                data-display-name="SelectMeter - Meter0"
                className={SelectMeterS6.W.els.meter0.n}
              />
            )
            if (it === 1) return (
              <div
                data-display-name="SelectMeter - Meter1"
                className={SelectMeterS6.W.els.meter1.n}
              />
            )
            if (it === 2 || it === true) return (
              <div
                data-display-name="SelectMeter - Meter2"
                className={SelectMeterS6.W.els.meter2.n}
              />
            )
          })()}
        </React.Fragment>
      ))}
    </div>
  )
})
SelectMeter.displayName = 'SelectMeter'
export default SelectMeter





