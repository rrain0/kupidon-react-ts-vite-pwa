import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import classNames from 'classnames'
import React from 'react'

import AddModuleSvg from '@res/icon/add-module.svg?react'
import ArrowAngledRoundedSvg from '@res/icon/arrow-angled-rounded.svg?react'
import ArrowLinesSharp1Svg from '@res/icon/arrow-lines-sharp-1.svg?react'
import ArrowRefreshCwSvg from '@res/icon/arrow-refresh-cw.svg?react'
import ArrowReloadSvg from '@res/icon/arrow-reload.svg?react'

import BrowserSvg from '@res/icon/browser.svg?react'
import BowArrowSvg from '@res/icon/bow-arrow.svg?react'

import CardsHeartSvg from '@res/icon/cards-heart.svg?react'
import CautionSvg from '@res/icon/caution.svg?react'
import ChatRoundSvg from '@res/icon/chat-round.svg?react'
import CheckmarkSvg from '@res/icon/checkmark.svg?react'
import CheckmarkCircleToastifySvg from '@res/icon/checkmark-circle-toastify.svg?react'
import ClearTrashSvg from '@res/icon/clear-trash.svg?react'
import ClipSvg from '@res/icon/clip.svg?react'
import CrossSvg from '@res/icon/cross.svg?react'
import CrossInCircleSvg from '@res/icon/cross-in-circle.svg?react'

import DangerRoundToastifySvg from '@res/icon/danger-round-toastify.svg?react'
import DaySvg from '@res/icon/day.svg?react'
import DayNightSvg from '@res/icon/day-night.svg?react'
import DoubleCheckmarkSvg from '@res/icon/double-checkmark.svg?react'
import Download1Svg from '@res/icon/download-1.svg?react'
import Download2RoundSvg from '@res/icon/download-2-round.svg?react'

import EyeSvg from '@res/icon/eye.svg?react'
import EyeCrossedOutSvg from '@res/icon/eye-crossed-out.svg?react'

import FloppyDisk1Svg from '@res/icon/floppy-disk-1.svg?react'
import FullscreenSvg from '@res/icon/fullscreen.svg?react'

import GearSvg from '@res/icon/gear.svg?react'
import Gear2Svg from '@res/icon/gear-2.svg?react'
import GenderSvg from '@res/icon/gender.svg?react'
import GiftBoxSvg from '@res/icon/gift-box.svg?react'

import HeartSvg from '@res/icon/heart.svg?react'
import HelpSvg from '@res/icon/help.svg?react'
import HomeSvg from '@res/icon/home.svg?react'

import InfoToastifySvg from '@res/icon/info-toastify.svg?react'

import LockSvg from '@res/icon/lock.svg?react'

import MoonSvg from '@res/icon/moon.svg?react'

import NameCardSvg from '@res/icon/name-card.svg?react'
import NightSvg from '@res/icon/night.svg?react'

import PlusSvg from '@res/icon/plus.svg?react'
import ProfileSvg from '@res/icon/profile.svg?react'

import RadioActiveSvg from '@res/icon/radio-active.svg?react'
import RadioInactiveSvg from '@res/icon/radio-inactive.svg?react'
import RingingBellSvg from '@res/icon/ringing-bell.svg?react'

import Search2Svg from '@res/icon/search-2.svg?react'
import Spinner8LinesSvg from '@res/icon/spinner-8-lines.svg?react'
import SpinnerCircleQuarterSvg from '@res/icon/spinner-circle-quarter.svg?react'

import WarnTriangleToastifySvg from '@res/icon/warn-triangle-toastify.svg?react'

import { TypeUtils } from '@util/common/TypeUtils.ts'
import { SvgIcStyle } from 'src/ui/elements/icons/SvgIcStyle.ts'
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
  
  type BaseSimpleSvgIconForwardRefProps = React.JSX.IntrinsicElements['svg']
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



