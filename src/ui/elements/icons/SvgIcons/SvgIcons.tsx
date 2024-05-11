import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import React from 'react'

import AddModuleSvg from '@ic/add-module.svg?react'
import ArrowAngledRoundedSvg from '@ic/arrow-angled-rounded.svg?react'
import ArrowLinesSharp1Svg from '@ic/arrow-lines-sharp-1.svg?react'
import ArrowRefreshCwSvg from '@ic/arrow-refresh-cw.svg?react'
import ArrowReloadSvg from '@ic/arrow-reload.svg?react'

import BrowserSvg from '@ic/browser.svg?react'
import BowArrowSvg from '@ic/bow-arrow.svg?react'

import CardsHeartSvg from '@ic/cards-heart.svg?react'
import CautionSvg from '@ic/caution.svg?react'
import ChatRoundSvg from '@ic/chat-round.svg?react'
import CheckmarkSvg from '@ic/checkmark.svg?react'
import CheckmarkCircleToastifySvg from '@ic/checkmark-circle-toastify.svg?react'
import ClearTrashSvg from '@ic/clear-trash.svg?react'
import ClipSvg from '@ic/clip.svg?react'
import CrossSvg from '@ic/cross.svg?react'
import CrossInCircleSvg from '@ic/cross-in-circle.svg?react'

import DangerRoundToastifySvg from '@ic/danger-round-toastify.svg?react'
import DaySvg from '@ic/day.svg?react'
import DayNightSvg from '@ic/day-night.svg?react'
import DoubleCheckmarkSvg from '@ic/double-checkmark.svg?react'
import Download1Svg from '@ic/download-1.svg?react'
import Download2RoundSvg from '@ic/download-2-round.svg?react'

import EyeSvg from '@ic/eye.svg?react'
import EyeCrossedOutSvg from '@ic/eye-crossed-out.svg?react'

import FloppyDisk1Svg from '@ic/floppy-disk-1.svg?react'
import FullscreenSvg from '@ic/fullscreen.svg?react'

import GearSvg from '@ic/gear.svg?react'
import Gear2Svg from '@ic/gear-2.svg?react'
import GenderSvg from '@ic/gender.svg?react'
import GiftBoxSvg from '@ic/gift-box.svg?react'

import HeartSvg from '@ic/heart.svg?react'
import HelpSvg from '@ic/help.svg?react'
import HomeSvg from '@ic/home.svg?react'

import InfoToastifySvg from '@ic/info-toastify.svg?react'

import LockSvg from '@ic/lock.svg?react'

import MoonSvg from '@ic/moon.svg?react'

import NameCardSvg from '@ic/name-card.svg?react'
import NightSvg from '@ic/night.svg?react'

import PencilWrite2Svg from '@ic/pencil-write-2.svg?react'
import PlusSvg from '@ic/plus.svg?react'
import ProfileSvg from '@ic/profile.svg?react'

import RadioActiveSvg from '@ic/radio-active.svg?react'
import RadioInactiveSvg from '@ic/radio-inactive.svg?react'
import RingingBellSvg from '@ic/ringing-bell.svg?react'

import Search2Svg from '@ic/search-2.svg?react'
import Spinner8LinesSvg from '@ic/spinner-8-lines.svg?react'
import SpinnerCircleQuarterSvg from '@ic/spinner-circle-quarter.svg?react'

import WarnTriangleToastifySvg from '@ic/warn-triangle-toastify.svg?react'

import { TypeUtils } from '@util/common/TypeUtils.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import PartialUndef = TypeUtils.PartialUndef
import falsyToUndef = TypeUtils.falsyToUndef
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
    
    const sizeProp = SvgIconsStyle.El.root.props.size
    const colorProp = SvgIconsStyle.El.root.props.color
    const accentColorProp = SvgIconsStyle.El.root.props.accentColor
    
    return <SvgComponent
      css={css`
        width:  ${falsyToUndef(!exists(w)) && sizeProp.var()};
        height: ${falsyToUndef(!exists(h)) && sizeProp.var()};
        //max-width: 100%;
        //max-height: 100%;
        fill: ${color || colorProp.var('black')};
        stroke: ${color || colorProp.var('black')};
        ${accentColorProp.name}: ${accentColor ?? accentColorProp.var('gray')};
      `}
      width={w}
      height={h}
      className={clsx(className, SvgIconsStyle.El.icon.name)}
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
  
  
  export const PencilWrite2Ic = generateSimpleSvgIcon(PencilWrite2Svg)
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



