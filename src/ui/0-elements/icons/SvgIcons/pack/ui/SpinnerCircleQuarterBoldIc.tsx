import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import {
  BaseSvgIcon,
  SvgIconProps,
} from 'src/ui/0-elements/icons/SvgIcons/SvgIcon.tsx'
import SpinnerCircleQuarterBoldSvg from '@ic/normal/ui/spinner-circle-quarter-bold.svg?react'




const SpinnerCircleQuarterBoldIc = React.memo(
  (() => {
    const rotation = keyframes({ to: { rotate: '1turn' } })
    const SpinnerCircleQuarter2 = styled(SpinnerCircleQuarterBoldSvg)({
      animation: `${rotation} 650ms linear infinite`,
    })
    return (props: SvgIconProps) => (
      <BaseSvgIcon {...props} SvgComponent={SpinnerCircleQuarter2}/>
    )
  })()
)
SpinnerCircleQuarterBoldIc.displayName = 'SpinnerCircleQuarterBoldIc'
export default SpinnerCircleQuarterBoldIc