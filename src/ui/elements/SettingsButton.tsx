import { css } from '@emotion/react'
import React from 'react'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons.tsx'
import GearIc = SvgIcons.GearIc
import PartialUndef = TypeUtils.PartialUndef




export type SettingsButtonCustomProps = PartialUndef<{}>
export type SettingsButtonForwardRefProps = React.JSX.IntrinsicElements['button']
export type SettingsButtonRefElement = HTMLButtonElement
export type SettingsButtonProps = SettingsButtonCustomProps & SettingsButtonForwardRefProps




const SettingsButton =
React.memo(
React.forwardRef<SettingsButtonRefElement, SettingsButtonProps>(
  (props, forwardedRef)=>{
  return <Button css={ButtonStyle.iconBigTransparent}
    {...props}
    ref={forwardedRef}
  >
    <GearIc/>
  </Button>
}))
export default SettingsButton