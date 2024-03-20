/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import classNames from 'classnames'
import React from 'react'

import { ReactComponent as AddModuleSvg } from 'src/res/icon/add-module.svg'
import { ReactComponent as ArrowLinesSharp1Svg } from 'src/res/icon/arrow-lines-sharp-1.svg'
import { ReactComponent as ArrowAngledRoundedSvg } from 'src/res/icon/arrow-angled-rounded.svg'
import { ReactComponent as ArrowRefreshCwSvg } from 'src/res/icon/arrow-refresh-cw.svg'
import { ReactComponent as ArrowReloadSvg } from 'src/res/icon/arrow-reload.svg'

import { ReactComponent as BrowserSvg } from 'src/res/icon/browser.svg'
import { ReactComponent as BowArrowSvg } from 'src/res/icon/bow-arrow.svg'

import { ReactComponent as CardsHeartSvg } from 'src/res/icon/cards-heart.svg'
import { ReactComponent as CautionSvg } from 'src/res/icon/caution.svg'
import { ReactComponent as ChatRoundSvg } from 'src/res/icon/chat-round.svg'
import { ReactComponent as CheckmarkSvg } from 'src/res/icon/checkmark.svg'
import { ReactComponent as CheckmarkCircleToastifySvg } from 'src/res/icon/checkmark-circle-toastify.svg'
import { ReactComponent as ClearTrashSvg } from 'src/res/icon/clear-trash.svg'
import { ReactComponent as ClipSvg } from 'src/res/icon/clip.svg'
import { ReactComponent as CrossSvg } from 'src/res/icon/cross.svg'
import { ReactComponent as CrossInCircleSvg } from 'src/res/icon/cross-in-circle.svg'

import { ReactComponent as DangerRoundToastifySvg } from 'src/res/icon/danger-round-toastify.svg'
import { ReactComponent as DaySvg } from 'src/res/icon/day.svg'
import { ReactComponent as DayNightSvg } from 'src/res/icon/day-night.svg'
import { ReactComponent as DoubleCheckmarkSvg } from 'src/res/icon/double-checkmark.svg'
import { ReactComponent as Download1Svg } from 'src/res/icon/download-1.svg'
import { ReactComponent as Download2RoundSvg } from 'src/res/icon/download-2-round.svg'

import { ReactComponent as EyeSvg } from 'src/res/icon/eye.svg'
import { ReactComponent as EyeCrossedOutSvg } from 'src/res/icon/eye-crossed-out.svg'

import { ReactComponent as FloppyDisk1Svg } from 'src/res/icon/floppy-disk-1.svg'
import { ReactComponent as FullscreenSvg } from 'src/res/icon/fullscreen.svg'

import { ReactComponent as GearSvg } from 'src/res/icon/gear.svg'
import { ReactComponent as Gear2Svg } from 'src/res/icon/gear-2.svg'
import { ReactComponent as GenderSvg } from 'src/res/icon/gender.svg'
import { ReactComponent as GiftBoxSvg } from 'src/res/icon/gift-box.svg'

import { ReactComponent as HeartSvg } from 'src/res/icon/heart.svg'
import { ReactComponent as HelpSvg } from 'src/res/icon/help.svg'
import { ReactComponent as HomeSvg } from 'src/res/icon/home.svg'

import { ReactComponent as InfoToastifySvg } from 'src/res/icon/info-toastify.svg'

import { ReactComponent as LockSvg } from 'src/res/icon/lock.svg'

import { ReactComponent as MoonSvg } from 'src/res/icon/moon.svg'

import { ReactComponent as NameCardSvg } from 'src/res/icon/name-card.svg'
import { ReactComponent as NightSvg } from 'src/res/icon/night.svg'

import { ReactComponent as PlusSvg } from 'src/res/icon/plus.svg'
import { ReactComponent as ProfileSvg } from 'src/res/icon/profile.svg'

import { ReactComponent as RadioActiveSvg } from 'src/res/icon/radio-active.svg'
import { ReactComponent as RadioInactiveSvg } from 'src/res/icon/radio-inactive.svg'
import { ReactComponent as RingingBellSvg } from 'src/res/icon/ringing-bell.svg'

import { ReactComponent as Search2Svg } from 'src/res/icon/search-2.svg'
import { ReactComponent as Spinner8LinesSvg } from 'src/res/icon/spinner-8-lines.svg'
import { ReactComponent as SpinnerCircleQuarterSvg } from 'src/res/icon/spinner-circle-quarter.svg'

import { ReactComponent as WarnTriangleToastifySvg } from 'src/res/icon/warn-triangle-toastify.svg'

import { TypeUtils } from 'src/utils/common/TypeUtils'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import PartialUndef = TypeUtils.PartialUndef
import falsishToUndef = TypeUtils.falsyToUndef
import exists = TypeUtils.exists




export namespace SvgIcons {

  // Base interface for simple svg icons
  
  type BaseSimpleSvgIconCustomProps = PartialUndef<{
    color: string
    accentColor: string
    size: number|string
  }>
  
  type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string }
  type SvgComponentType = React.FunctionComponent<SvgProps>
  type BaseSimpleSvgIconSvgComponentProp = {
    SvgComponent: SvgComponentType
  }
  
  type BaseSimpleSvgIconForwardRefProps = JSX.IntrinsicElements['svg']
  type BaseSimpleSvgIconRefElement = SVGSVGElement
  
  
  export type BaseSimpleSvgIconProps =
    BaseSimpleSvgIconCustomProps & BaseSimpleSvgIconForwardRefProps & BaseSimpleSvgIconSvgComponentProp
  
  export const BaseSimpleSvgIcon =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, BaseSimpleSvgIconProps>(
  (props, forwardedRef) => {
    const {
      className,
      color, accentColor,
      size, width, height,
      SvgComponent,
      ...restProps
    } = props
    
    const w = width ?? size
    const h = height ?? size
    
    return <SvgComponent
      css={css`
        width:  ${falsishToUndef(!exists(w)) && SvgIcStyle.Prop.varr.size};
        height: ${falsishToUndef(!exists(h)) && SvgIcStyle.Prop.varr.size};
        //max-width: 100%;
        //max-height: 100%;
        fill: ${color ?? SvgIcStyle.Prop.vard.color('black')};
        stroke: ${color ?? SvgIcStyle.Prop.vard.color('black')};
        ${SvgIcStyle.Prop.prop.accentColor}:
                ${accentColor ?? SvgIcStyle.Prop.vard.accentColor('gray')}
      `}
      width={w}
      height={h}
      className={classNames(className,SvgIcStyle.El.clazz.icon)}
      {...restProps}
      ref={forwardedRef}
    />
  }))
  
  
  
  
  export type SimpleSvgIconProps = BaseSimpleSvgIconCustomProps & BaseSimpleSvgIconForwardRefProps
  function generateSimpleSvgIcon(SvgComponent: SvgComponentType){
    return (
    React.memo(
    React.forwardRef<BaseSimpleSvgIconRefElement, SimpleSvgIconProps>(
      (props, forwardedRef) =>
        <BaseSimpleSvgIcon {...props} SvgComponent={SvgComponent} ref={forwardedRef}/>
    )))
  }
  
  
  
  // Icons
  
  export const AddModuleIc = generateSimpleSvgIcon(AddModuleSvg)
  export const ArrowLinesSharp1Ic = generateSimpleSvgIcon(ArrowLinesSharp1Svg)
  export const ArrowAngledRoundedIc = generateSimpleSvgIcon(ArrowAngledRoundedSvg)
  export const ArrowRefreshCwIc = generateSimpleSvgIcon(ArrowRefreshCwSvg)
  export const ArrowReloadIc = generateSimpleSvgIcon(ArrowReloadSvg)
  
  
  export const BrowserIc = generateSimpleSvgIcon(BrowserSvg)
  export const BowArrowIc = generateSimpleSvgIcon(BowArrowSvg)
  
  
  export const CardsHeartIc = generateSimpleSvgIcon(CardsHeartSvg)
  export const CautionIc = generateSimpleSvgIcon(CautionSvg)
  export const ChatRoundIc = generateSimpleSvgIcon(ChatRoundSvg)
  export const CheckmarkIc = generateSimpleSvgIcon(CheckmarkSvg)
  export const CheckmarkCircleToastifyIc = generateSimpleSvgIcon(CheckmarkCircleToastifySvg)
  export const ClearTrashIc = generateSimpleSvgIcon(ClearTrashSvg)
  export const ClipIc = generateSimpleSvgIcon(ClipSvg)
  export const CrossIc = generateSimpleSvgIcon(CrossSvg)
  export const CrossInCircleIc = generateSimpleSvgIcon(CrossInCircleSvg)
  
  
  export const DangerRoundToastifyIc = generateSimpleSvgIcon(DangerRoundToastifySvg)
  export const DayIc = generateSimpleSvgIcon(DaySvg)
  export const DayNightIc = generateSimpleSvgIcon(DayNightSvg)
  export const DoubleCheckmarkIc = generateSimpleSvgIcon(DoubleCheckmarkSvg)
  export const Download1Ic = generateSimpleSvgIcon(Download1Svg)
  export const Download2RoundIc = generateSimpleSvgIcon(Download2RoundSvg)
  
  
  export const EyeIc = generateSimpleSvgIcon(EyeSvg)
  export const EyeCrossedOutIc = generateSimpleSvgIcon(EyeCrossedOutSvg)
  
  
  export const FloppyDisk1Ic = generateSimpleSvgIcon(FloppyDisk1Svg)
  export const FullscreenIc = generateSimpleSvgIcon(FullscreenSvg)
  
  
  export const GearIc = generateSimpleSvgIcon(GearSvg)
  export const Gear2Ic = generateSimpleSvgIcon(Gear2Svg)
  export const GenderIc = generateSimpleSvgIcon(GenderSvg)
  export const GiftBoxIc = generateSimpleSvgIcon(GiftBoxSvg)
  
  
  export const HeartIc = generateSimpleSvgIcon(HeartSvg)
  export const HelpIc = generateSimpleSvgIcon(HelpSvg)
  export const HomeIc = generateSimpleSvgIcon(HomeSvg)
  
  
  export const InfoToastifyIc = generateSimpleSvgIcon(InfoToastifySvg)
  
  
  export const LockIc = generateSimpleSvgIcon(LockSvg)
  
  
  export const MoonIc = generateSimpleSvgIcon(MoonSvg)
  
  
  export const NameCardIc = generateSimpleSvgIcon(NameCardSvg)
  export const NightIc = generateSimpleSvgIcon(NightSvg)
  
  
  export const PlusIc = generateSimpleSvgIcon(PlusSvg)
  export const ProfileIc = generateSimpleSvgIcon(ProfileSvg)
  
  
  export const RadioActiveIc = generateSimpleSvgIcon(RadioActiveSvg)
  export const RadioInactiveIc = generateSimpleSvgIcon(RadioInactiveSvg)
  export const RingingBellIc = generateSimpleSvgIcon(RingingBellSvg)
  
  
  export const Search2Ic = generateSimpleSvgIcon(Search2Svg)
  export const Spinner8LinesIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SimpleSvgIconProps>(
  function(){
    const rotation = keyframes`
      100% { rotate: 1turn }
    `
    const Spinner8Lines_ = styled(Spinner8LinesSvg)`
      animation: ${rotation} 3s linear infinite;
    `
    return (props, forwardedRef) =>
      <BaseSimpleSvgIcon {...props} SvgComponent={Spinner8Lines_} ref={forwardedRef} />
  }()
  ))
  export const SpinnerCircleQuarterIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SimpleSvgIconProps>(
  function(){
    const rotation = keyframes`
      100% { rotate: 1turn }
    `
    const SpinnerCircleQuarter_ = styled(SpinnerCircleQuarterSvg)`
      animation: ${rotation} .65s linear infinite;
    `
    return (props, forwardedRef) =>
      <BaseSimpleSvgIcon {...props} SvgComponent={SpinnerCircleQuarter_} ref={forwardedRef} />
  }()
  ))
  
  
  export const WarnTriangleToastifyIc = generateSimpleSvgIcon(WarnTriangleToastifySvg)
  
  
  
}



