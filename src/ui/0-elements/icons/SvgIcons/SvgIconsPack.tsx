import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import React from 'react'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu

// UI icons
import AddModuleSvg from '@ic/normal/ui/add-module.svg?react'
import ArchiveBoxOutlinedSvg from '@ic/normal/ui/archive-box-outlined.svg?react'
import ArrowAngledRoundedSvg from '@ic/normal/ui/arrow-angled-rounded.svg?react'
import ArrowBackSvg from '@ic/normal/ui/arrow-back.svg?react'
import ArrowLinesSharp1Svg from '@ic/normal/ui/arrow-lines-sharp-1.svg?react'
import ArrowRefreshCwSvg from '@ic/normal/ui/arrow-refresh-cw.svg?react'
import ArrowReloadSvg from '@ic/normal/ui/arrow-reload.svg?react'

import CalendarSvg from '@ic/normal/ui/calendar.svg?react'
import Calendar2Svg from '@ic/normal/ui/calendar-2.svg?react'
import ChatRoundSvg from '@ic/normal/ui/chat-round.svg?react'
import CheckmarkSvg from '@ic/normal/ui/checkmark.svg?react'
import CheckmarkBoldSvg from '@ic/normal/ui/checkmark-bold.svg?react'
import CheckmarkDoubleSvg from '@ic/normal/ui/checkmark-double.svg?react'
import CheckmarkCircleToastifySvg from '@ic/normal/ui/checkmark-circle-toastify.svg?react'
import ClearTrashSvg from '@ic/normal/ui/clear-trash.svg?react'
import ClipSvg from '@ic/normal/ui/clip.svg?react'
import CopySvg from '@ic/normal/ui/copy.svg?react'
import CrossSvg from '@ic/normal/ui/cross.svg?react'
import CrossBoldSvg from '@ic/normal/ui/cross-bold.svg?react'
import CrossInCircleSvg from '@ic/normal/ui/cross-in-circle.svg?react'

import DangerRoundToastifySvg from '@ic/normal/ui/danger-round-toastify.svg?react'
import DaySvg from '@ic/normal/ui/day.svg?react'
import DayNightSvg from '@ic/normal/ui/day-night.svg?react'
import DocumentErrorSvg from '@ic/normal/ui/document-error.svg?react'
import DownloadSvg from '@ic/normal/ui/download.svg?react'

import EyeSvg from '@ic/normal/ui/eye.svg?react'
import EyeCrossedOutSvg from '@ic/normal/ui/eye-crossed-out.svg?react'
import EyeWideSvg from '@ic/normal/ui/eye-wide.svg?react'

import FloppyDisk1Svg from '@ic/normal/ui/floppy-disk-1.svg?react'
import FourDotsSvg from '@ic/normal/ui/four-dots.svg?react'
import FullscreenSvg from '@ic/normal/ui/fullscreen.svg?react'
import FunnelFilterListSvg from '@ic/normal/ui/funnel-filter-list.svg?react'

import GearSvg from '@ic/normal/ui/gear.svg?react'
import GearOutlinedSvg from '@ic/normal/ui/gear-outlined.svg?react'

import InfoToastifySvg from '@ic/normal/ui/info-toastify.svg?react'

import LocationSvg from '@ic/normal/ui/location.svg?react'
import LockSvg from '@ic/normal/ui/lock.svg?react'

import MapLocationSvg from '@ic/normal/ui/map-location.svg?react'
import MoonSvg from '@ic/normal/ui/moon.svg?react'

import NightSvg from '@ic/normal/ui/night.svg?react'

import PencilWrite2Svg from '@ic/normal/ui/pencil-write-2.svg?react'
import PictureSvg from '@ic/normal/ui/picture.svg?react'
import PinSvg from '@ic/normal/ui/pin.svg?react'
import Pin2Svg from '@ic/normal/ui/pin-2.svg?react'
import PlanetFrameSvg from '@ic/normal/ui/planet-frame.svg?react'
import PlusSvg from '@ic/normal/ui/plus.svg?react'
import ProfileSvg from '@ic/normal/ui/profile.svg?react'

import RadioActiveSvg from '@ic/normal/ui/radio-active.svg?react'
import RadioInactiveSvg from '@ic/normal/ui/radio-inactive.svg?react'
import RestrictSvg from '@ic/normal/ui/restrict.svg?react'
import RingingBellSvg from '@ic/normal/ui/ringing-bell.svg?react'

import SearchSvg from '@ic/normal/ui/search.svg?react'
import SoundOffSvg from '@ic/normal/ui/sound-off.svg?react'
import SoundOnSvg from '@ic/normal/ui/sound-on.svg?react'
import Spinner8LinesSvg from '@ic/normal/ui/spinner-8-lines.svg?react'
import SpinnerCircleQuarterSvg from '@ic/normal/ui/spinner-circle-quarter.svg?react'
import SpinnerCircleQuarterBoldSvg from '@ic/normal/ui/spinner-circle-quarter-bold.svg?react'
import SyncErrorSvg from '@ic/normal/ui/sync-error.svg?react'

import Unpin2Svg from '@ic/normal/ui/unpin-2.svg?react'

import VolumeSvg from '@ic/normal/ui/volume.svg?react'
import VolumeMuteSvg from '@ic/normal/ui/volume-mute.svg?react'

import WarnCircleOutlinedSvg from '@ic/normal/ui/warn-circle-outlined.svg?react'
import WarnTriangleToastifySvg from '@ic/normal/ui/warn-triangle-toastify.svg?react'
import WarnTriangleOutlinedSvg from '@ic/normal/ui/warn-triangle-outlined.svg?react'


// Special icons
import BlacklistSvg from '@ic/normal/special/blacklist.svg?react'
import BowArrowSvg from '@ic/normal/special/bow-arrow.svg?react'

import CardsHeartSvg from '@ic/normal/special/cards-heart.svg?react'
import CoffeeCupSvg from '@ic/normal/special/coffee-cup.svg?react'

import DumbbellSvg from '@ic/normal/special/dumbbell.svg?react'

import EnvelopeSvg from '@ic/normal/special/envelope.svg?react'

import Film2Svg from '@ic/normal/special/film-2.svg?react'
import FountainSvg from '@ic/normal/special/fountain.svg?react'

import GenderSvg from '@ic/normal/special/gender.svg?react'
import GiftBoxSvg from '@ic/normal/special/gift-box.svg?react'
import GlassAndDishSvg from '@ic/normal/special/glass-and-dish.svg?react'

import HandsetSvg from '@ic/normal/special/handset.svg?react'
import HeartSvg from '@ic/normal/special/heart.svg?react'
import HeartFilledSvg from '@ic/normal/special/heart-filled.svg?react'
import HeartLockSvg from '@ic/normal/special/heart-lock.svg?react'
import HeartsDoubleSvg from '@ic/normal/special/hearts-double.svg?react'
import HelpSvg from '@ic/normal/special/help.svg?react'
import HomeSvg from '@ic/normal/special/home.svg?react'

import MasksTheatreSvg from '@ic/normal/special/masks-theatre.svg?react'

import NameCardSvg from '@ic/normal/special/name-card.svg?react'

import PictureArtSvg from '@ic/normal/special/picture-art.svg?react'
import PresentationScreenSvg from '@ic/normal/special/presentation-screen.svg?react'
import PriceTagSvg from '@ic/normal/special/price-tag.svg?react'
import ProfileCardSvg from '@ic/normal/special/profile-card.svg?react'

import RulerCornerSvg from '@ic/normal/special/ruler-corner.svg?react'

import SoupSvg from '@ic/normal/special/soup.svg?react'

import TelegramSvg from '@ic/normal/special/telegram.svg?react'

import VaseMuseumSvg from '@ic/normal/special/vase-museum.svg?react'

import WhatsappSvg from '@ic/normal/special/whatsapp.svg?react'




export namespace SvgIconsPack {

  // Base interface for simple svg icons
  
  type BaseSimpleSvgIconCustomProps = Pu<{
    color: string
    colorAccent: string
    size: number | string
  }>
  
  type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string }
  type SvgComponentType = React.FC<SvgProps>
  type BaseSimpleSvgIconSvgComponentProp = {
    SvgComponent: SvgComponentType
  }
  
  type BaseSimpleSvgIconSvgElemProps = React.ComponentProps<'svg'>
  
  
  export type BaseSimpleSvgIconProps =
    & BaseSimpleSvgIconCustomProps
    & BaseSimpleSvgIconSvgElemProps
    & BaseSimpleSvgIconSvgComponentProp
  
  export const BaseSimpleSvgIcon = React.memo((props: BaseSimpleSvgIconProps) => {
    const {
      className,
      color, colorAccent,
      size,
      width: w = size,
      height: h = size,
      SvgComponent,
      ...restProps
    } = props
    
    const sizeProp = SvgIconS6.W.els.icon.ps!.size
    const colorProp = SvgIconS6.W.els.icon.ps!.color
    const colorAccentProp = SvgIconS6.W.els.icon.ps!.colorAcc
    
    return (
      <SvgComponent
        css={{
          width: w ?? sizeProp.var(),
          height: h ?? sizeProp.var(),
          fill: color ?? colorProp.var('black'),
          stroke: color ?? colorProp.var('black'),
          [colorAccentProp.n]: colorAccent ?? colorAccentProp.var('gray'),
        }}
        className={clsx(className, SvgIconS6.W.els.icon.n)}
        {...restProps}
      />
    )
  })
  
  
  
  
  export type SimpleSvgIconProps =
    & BaseSimpleSvgIconCustomProps
    & BaseSimpleSvgIconSvgElemProps
  
  
  function generateSimpleSvgIcon(SvgComponent: SvgComponentType) {
    return React.memo((props: SimpleSvgIconProps) => (
      <BaseSimpleSvgIcon {...props} SvgComponent={SvgComponent}/>
    ))
  }
  
  
  
  // UI Icons
  export const AddModuleIc = generateSimpleSvgIcon(AddModuleSvg)
  export const ArchiveBoxOutlinedIc = generateSimpleSvgIcon(ArchiveBoxOutlinedSvg)
  export const ArrowLinesSharp1Ic = generateSimpleSvgIcon(ArrowLinesSharp1Svg)
  export const ArrowAngledRoundedIc = generateSimpleSvgIcon(ArrowAngledRoundedSvg)
  export const ArrowBackIc = generateSimpleSvgIcon(ArrowBackSvg)
  export const ArrowRefreshCwIc = generateSimpleSvgIcon(ArrowRefreshCwSvg)
  export const ArrowReloadIc = generateSimpleSvgIcon(ArrowReloadSvg)
  
  
  export const CalendarIc = generateSimpleSvgIcon(CalendarSvg)
  export const Calendar2Ic = generateSimpleSvgIcon(Calendar2Svg)
  export const ChatRoundIc = generateSimpleSvgIcon(ChatRoundSvg)
  export const CheckmarkIc = generateSimpleSvgIcon(CheckmarkSvg)
  export const CheckmarkBoldIc = generateSimpleSvgIcon(CheckmarkBoldSvg)
  export const CheckmarkCircleToastifyIc = generateSimpleSvgIcon(CheckmarkCircleToastifySvg)
  export const ClearTrashIc = generateSimpleSvgIcon(ClearTrashSvg)
  export const ClipIc = generateSimpleSvgIcon(ClipSvg)
  export const CopyIc = generateSimpleSvgIcon(CopySvg)
  export const CrossIc = generateSimpleSvgIcon(CrossSvg)
  export const CrossBoldIc = generateSimpleSvgIcon(CrossBoldSvg)
  export const CrossInCircleIc = generateSimpleSvgIcon(CrossInCircleSvg)
  
  
  export const DangerRoundToastifyIc = generateSimpleSvgIcon(DangerRoundToastifySvg)
  export const DayIc = generateSimpleSvgIcon(DaySvg)
  export const DayNightIc = generateSimpleSvgIcon(DayNightSvg)
  export const DocumentErrorIc = generateSimpleSvgIcon(DocumentErrorSvg)
  export const CheckmarkDoubleIc = generateSimpleSvgIcon(CheckmarkDoubleSvg)
  export const DownloadIc = generateSimpleSvgIcon(DownloadSvg)
  
  
  export const EyeIc = generateSimpleSvgIcon(EyeSvg)
  export const EyeCrossedOutIc = generateSimpleSvgIcon(EyeCrossedOutSvg)
  export const EyeWideIc = generateSimpleSvgIcon(EyeWideSvg)
  
  
  export const FloppyDisk1Ic = generateSimpleSvgIcon(FloppyDisk1Svg)
  export const FourDotsIc = generateSimpleSvgIcon(FourDotsSvg)
  export const FullscreenIc = generateSimpleSvgIcon(FullscreenSvg)
  export const FunnelFilterListIc = generateSimpleSvgIcon(FunnelFilterListSvg)
  
  
  export const GearIc = generateSimpleSvgIcon(GearSvg)
  export const GearOutlinedIc = generateSimpleSvgIcon(GearOutlinedSvg)
  
  
  export const InfoToastifyIc = generateSimpleSvgIcon(InfoToastifySvg)
  
  
  export const LocationIc = generateSimpleSvgIcon(LocationSvg)
  export const LockIc = generateSimpleSvgIcon(LockSvg)
  
  
  export const MapLocationIc = generateSimpleSvgIcon(MapLocationSvg)
  export const MoonIc = generateSimpleSvgIcon(MoonSvg)
  
  
  export const NightIc = generateSimpleSvgIcon(NightSvg)
  
  
  export const PencilWrite2Ic = generateSimpleSvgIcon(PencilWrite2Svg)
  export const PictureIc = generateSimpleSvgIcon(PictureSvg)
  export const PinIc = generateSimpleSvgIcon(PinSvg)
  export const Pin2Ic = generateSimpleSvgIcon(Pin2Svg)
  export const PlanetFrameIc = generateSimpleSvgIcon(PlanetFrameSvg)
  export const PlusIc = generateSimpleSvgIcon(PlusSvg)
  export const ProfileIc = generateSimpleSvgIcon(ProfileSvg)
  
  
  export const RadioActiveIc = generateSimpleSvgIcon(RadioActiveSvg)
  export const RadioInactiveIc = generateSimpleSvgIcon(RadioInactiveSvg)
  export const RestrictIc = generateSimpleSvgIcon(RestrictSvg)
  export const RingingBellIc = generateSimpleSvgIcon(RingingBellSvg)
  
  
  export const SearchIc = generateSimpleSvgIcon(SearchSvg)
  export const SoundOffIc = generateSimpleSvgIcon(SoundOffSvg)
  export const SoundOnIc = generateSimpleSvgIcon(SoundOnSvg)
  
  export const Spinner8LinesIc = React.memo(
    (() => {
      const rotation = keyframes`
        100% { rotate: 1turn }
      `
      const Spinner8Lines2 = styled(Spinner8LinesSvg)`
        animation: ${rotation} 3s linear infinite;
      `
      return (props: SimpleSvgIconProps) => (
        <BaseSimpleSvgIcon {...props} SvgComponent={Spinner8Lines2}/>
      )
    })()
  )
  
  export const SpinnerCircleQuarterIc = React.memo(
    (() => {
      const rotation = keyframes`
        100% { rotate: 1turn }
      `
      const SpinnerCircleQuarter2 = styled(SpinnerCircleQuarterSvg)`
        animation: ${rotation} 650ms linear infinite;
      `
      return (props: SimpleSvgIconProps) => (
        <BaseSimpleSvgIcon {...props} SvgComponent={SpinnerCircleQuarter2}/>
      )
    })()
  )
  export const SpinnerCircleQuarterBoldIc = React.memo(
    (() => {
      const rotation = keyframes`
        100% { rotate: 1turn }
      `
      const SpinnerCircleQuarter2 = styled(SpinnerCircleQuarterBoldSvg)`
        animation: ${rotation} 650ms linear infinite;
      `
      return (props: SimpleSvgIconProps) => (
        <BaseSimpleSvgIcon {...props} SvgComponent={SpinnerCircleQuarter2}/>
      )
    })()
  )
  
  export const SyncErrorIc = generateSimpleSvgIcon(SyncErrorSvg)
  
  export const Unpin2Ic = generateSimpleSvgIcon(Unpin2Svg)
  
  export const VolumeIc = generateSimpleSvgIcon(VolumeSvg)
  export const VolumeMuteIc = generateSimpleSvgIcon(VolumeMuteSvg)
  
  export const WarnCircleOutlinedIc = generateSimpleSvgIcon(WarnCircleOutlinedSvg)
  export const WarnTriangleToastifyIc = generateSimpleSvgIcon(WarnTriangleToastifySvg)
  export const WarnTriangleOutlinedIc = generateSimpleSvgIcon(WarnTriangleOutlinedSvg)
  
  
  
  
  // Special icons
  export const BlacklistIc = generateSimpleSvgIcon(BlacklistSvg)
  export const BowArrowIc = generateSimpleSvgIcon(BowArrowSvg)
  
  export const CardsHeartIc = generateSimpleSvgIcon(CardsHeartSvg)
  export const CoffeeCupIc = generateSimpleSvgIcon(CoffeeCupSvg)
  
  export const DumbbellIc = generateSimpleSvgIcon(DumbbellSvg)
  
  export const EnvelopeIc = generateSimpleSvgIcon(EnvelopeSvg)
  
  export const Film2Ic = generateSimpleSvgIcon(Film2Svg)
  export const FountainIc = generateSimpleSvgIcon(FountainSvg)
  
  export const GenderIc = generateSimpleSvgIcon(GenderSvg)
  export const GiftBoxIc = generateSimpleSvgIcon(GiftBoxSvg)
  export const GlassAndDishIc = generateSimpleSvgIcon(GlassAndDishSvg)
  
  export const HandsetIc = generateSimpleSvgIcon(HandsetSvg)
  export const HeartIc = generateSimpleSvgIcon(HeartSvg)
  export const HeartFilledIc = generateSimpleSvgIcon(HeartFilledSvg)
  export const HeartLockIc = generateSimpleSvgIcon(HeartLockSvg)
  export const HeartsDoubleIc = generateSimpleSvgIcon(HeartsDoubleSvg)
  export const HelpIc = generateSimpleSvgIcon(HelpSvg)
  export const HomeIc = generateSimpleSvgIcon(HomeSvg)
  
  export const MasksTheatreIc = generateSimpleSvgIcon(MasksTheatreSvg)
  
  export const NameCardIc = generateSimpleSvgIcon(NameCardSvg)
  
  export const PictureArtIc = generateSimpleSvgIcon(PictureArtSvg)
  export const PresentationScreenIc = generateSimpleSvgIcon(PresentationScreenSvg)
  export const PriceTagIc = generateSimpleSvgIcon(PriceTagSvg)
  export const ProfileCardIc = generateSimpleSvgIcon(ProfileCardSvg)
  
  export const RulerCornerIc = generateSimpleSvgIcon(RulerCornerSvg)
  
  export const SoupIc = generateSimpleSvgIcon(SoupSvg)
  
  export const TelegramIc = generateSimpleSvgIcon(TelegramSvg)
  
  export const VaseMuseumIc = generateSimpleSvgIcon(VaseMuseumSvg)
  
  export const WhatsappIc = generateSimpleSvgIcon(WhatsappSvg)
  
  
  
}



