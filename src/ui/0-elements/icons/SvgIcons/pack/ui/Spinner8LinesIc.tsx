import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import {
  BaseSvgIcon,
  SvgIconProps,
} from 'src/ui/0-elements/icons/SvgIcons/SvgIcon.tsx'
import Spinner8LinesSvg from '@ic/normal/ui/spinner-8-lines.svg?react'




const Spinner8LinesIc = React.memo(
  (() => {
    const rotation = keyframes({ to: { rotate: '1turn' } })
    const Spinner8Lines2 = styled(Spinner8LinesSvg)({
      animation: `${rotation} 1600ms linear infinite`,
    })
    return (props: SvgIconProps) => (
      <BaseSvgIcon {...props} SvgComponent={Spinner8Lines2}/>
    )
  })()
)
Spinner8LinesIc.displayName = 'Spinner8LinesIc'
export default Spinner8LinesIc