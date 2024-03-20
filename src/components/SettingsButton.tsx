/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import GearIc = SvgIcons.GearIc
import PartialUndef = TypeUtils.PartialUndef




export type SettingsButtonCustomProps = PartialUndef<{}>
export type SettingsButtonForwardRefProps = JSX.IntrinsicElements['button']
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