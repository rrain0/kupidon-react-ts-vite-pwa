import React from 'react'
import { IconButtonStyle } from 'src/ui/elements/buttons/IconButton/IconButtonStyle.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import Button from 'src/ui/elements/buttons/Button/Button.tsx'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import GearIc = SvgIcons.GearIc
import Callback = TypeUtils.Callback
import Puro = TypeUtils.Puro





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