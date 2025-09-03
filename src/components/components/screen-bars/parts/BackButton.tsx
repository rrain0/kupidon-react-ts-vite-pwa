import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import ArrowAngledRoundedIc from 'src/components/elems/icons/SvgIcons/pack/ui/ArrowAngledRoundedIc.tsx'




const BackButton = React.memo(() => {
  const navigate = useNavigate()
  const back = useCallback(() => navigate(-1), [navigate])
  
  return (
    <Button
      css={IconButtonS6.t(backButtonS)}
      onClick={back}
      data-display-name='BackButton'
    >
      <ArrowAngledRoundedIc/>
    </Button>
  )
})
BackButton.displayName = 'BackButton'
export default BackButton




const backButtonS: AppWidgetStyle = t => [
  IconButtonS6.S.trans.round.lg.normal, {
    button: { justifySelf: 'start' },
    icon: { sz: 24, rotate: '0.5turn' },
  },
]