import React from 'react'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import GearIc = SvgIconsPack.GearIc
import Callback = TypeU.Callback
import Puro = TypeU.Puro





type QuickSettingsButtonProps = Puro<{
  onClick: Callback
}>

const QuickSettingsButton = React.memo((props: QuickSettingsButtonProps) => {
  return (
    <Button
      css={IconButtonS6.t(IconButtonS6.S.Trans.Round.Big.normal2)}
      {...props}
    >
      <GearIc />
    </Button>
  )
})
export default QuickSettingsButton