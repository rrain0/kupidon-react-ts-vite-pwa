
import React from 'react'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import { Cb } from '@utils/base/typeUtils.ts'
import CrossIc from 'src/components/elems/icons/SvgIcons/pack/ui/CrossIc.tsx'




const CancelButton = React.memo(({ onClick }: { onClick: Cb }) => {
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
