import { TypeU } from '@utils/common/TypeU.ts'
import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import Callback = TypeU.Callback
import CheckmarkIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CheckmarkIc.tsx'




const AcceptButton = React.memo(({ onClick }: { onClick: Callback }) => {
  return (
    <Button
      css={IconButtonS6.t([IconButtonS6.S.filled.round.lg.accent, actionButtonS])}
      onClick={onClick}
      data-display-name='AcceptButton'
    >
      <CheckmarkIc/>
    </Button>
  )
})
AcceptButton.displayName = 'AcceptButton'
export default AcceptButton



const actionButtonS: AppWidgetStyle = t => [{
  button: { boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` },
}]
