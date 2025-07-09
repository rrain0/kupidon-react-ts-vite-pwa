import { TypeU } from '@util/common/TypeU.ts'
import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import Callback = TypeU.Callback
import CrossIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CrossIc.tsx'




const CancelButton = React.memo(({ onClick }: { onClick: Callback }) => {
  return (
    <Button
      css={IconButtonS6.t([IconButtonS6.S.filled.round.lg2.normal2, actionButtonS])}
      onClick={onClick}
      data-display-name='CancelButton'
    >
      <CrossIc/>
    </Button>
  )
})
CancelButton.displayName = 'CancelButton'
export default CancelButton



const actionButtonS: AppWidgetStyle = t => [{
  button: { boxShadow: `${StyleVals.shadowSz} ${t.shadow.bg}` },
}]
