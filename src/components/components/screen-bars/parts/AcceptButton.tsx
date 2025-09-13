
import React from 'react'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import { Cb } from '@utils/base/typeUtils.ts'
import CheckmarkIc from 'src/components/elems/icons/SvgIcons/pack/ui/CheckmarkIc.tsx'




const AcceptButton = React.memo(({ onClick }: { onClick: Cb }) => {
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
