import clsx from 'clsx'
import React from 'react'
import { SelectMeterS6 } from 'src/components/elems/select-item/SelectMeter/SelectMeterS6.ts'
import { ReactU } from 'src/utils/react/ReactU'

import { Pu } from '@utils/base/typeUtils.ts'
import ClassStyle = ReactU.ClassStyle




export type IndicatorSelection = 0 | false | 1 | 2 | true

type SelectItemProps = Pu<{
  metersValues: IndicatorSelection[]
}> & ClassStyle

const SelectMeter = React.memo((props: SelectItemProps) => {
  const {
    metersValues,
    className,
    style,
  } = props
  
  
  return (
    <div
      data-display-name="SelectMeter - Frame"
      className={clsx(SelectMeterS6.W.els.meterFrame.n, className)}
      style={style}
    >
      {metersValues?.map((it, i) => (
        <React.Fragment key={`${i} ${it}`}>
          {(() => {
            if (it === 0 || it === false) return (
              <div
                data-display-name="SelectMeter - Meter0"
                className={clsx(
                  SelectMeterS6.W.els.meter.n,
                  SelectMeterS6.W.els.meter0.n
                )}
              />
            )
            if (it === 1) return (
              <div
                data-display-name="SelectMeter - Meter1"
                className={clsx(
                  SelectMeterS6.W.els.meter.n,
                  SelectMeterS6.W.els.meter1.n
                )}
              />
            )
            if (it === 2 || it === true) return (
              <div
                data-display-name="SelectMeter - Meter2"
                className={clsx(
                  SelectMeterS6.W.els.meter.n,
                  SelectMeterS6.W.els.meter2.n
                )}
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





