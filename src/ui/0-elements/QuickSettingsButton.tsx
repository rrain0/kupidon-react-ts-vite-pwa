import React from 'react'
import { IconButtonStyle } from 'src/ui/0-elements/buttons/IconButton/IconButtonStyle.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { SvgIcons } from 'src/ui/0-elements/icons/SvgIcons/SvgIcons.tsx'
import GearIc = SvgIcons.GearIc
import Callback = TypeU.Callback
import Puro = TypeU.Puro





type QuickSettingsButtonProps = Puro<{
  onClick: Callback
}>

const QuickSettingsButton =
React.memo(
(props: QuickSettingsButtonProps) => {
  return <Button
    css={IconButtonStyle.iconBigTransparent}
    {...props}
  >
    <GearIc/>
  </Button>
})
export default QuickSettingsButton