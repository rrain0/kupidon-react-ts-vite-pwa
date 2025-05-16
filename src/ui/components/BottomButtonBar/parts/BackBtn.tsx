import { TypeU } from '@util/common/TypeU.ts'
import { virtualOffset } from '@util/css/virtualOffset.ts'
import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ArrowAngledRoundedIc = SvgIconsPack.ArrowAngledRoundedIc
import Pu = TypeU.Pu




export type BackBtnProps = Pu<{
  withVirtualOffset: boolean
}>
const BackBtn = React.memo(({ withVirtualOffset }: BackBtnProps) => {
  const navigate = useNavigate()
  const back = useCallback(() => navigate(-1), [navigate])
  
  return (
    <Button
      css={IconButtonS6.t([backButtonS, {
        button: {
          ...withVirtualOffset && {
            sz: 'ct',
            ...virtualOffset({ a: 13 }),
          },
        },
      }])}
      onClick={back}
    >
      <ArrowAngledRoundedIc/>
    </Button>
  )
})
BackBtn.displayName = 'BackBtn'
export default BackBtn



const backButtonS: AppWidgetStyle = t => [
  IconButtonS6.S.trans.round.lg.normal, {
    button: { justifySelf: 'start' },
    icon: { sz: 24, rotate: '0.5turn' },
  },
]