import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { BaseSvgIcon, generateSvgIcon, SvgIconProps } from './SvgIcon'


// TODO refactor - extract to folder as separate components

// UI icons
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

import VideoCameraSvg from '@ic/normal/ui/video-camera.svg?react'
import VolumeSvg from '@ic/normal/ui/volume.svg?react'
import VolumeMuteSvg from '@ic/normal/ui/volume-mute.svg?react'

import WarnCircleOutlinedSvg from '@ic/normal/ui/info-circle-outlined.svg?react'
import WarnTriangleToastifySvg from '@ic/normal/ui/warn-triangle-toastify.svg?react'
import WarnTriangleOutlinedSvg from '@ic/normal/ui/warn-triangle-outlined.svg?react'


// Special icons
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
import PlaneSendSvg from '@ic/normal/special/plane-send.svg?react'
import PresentationScreenSvg from '@ic/normal/special/presentation-screen.svg?react'
import PriceTagSvg from '@ic/normal/special/price-tag.svg?react'
import ProfileCardSvg from '@ic/normal/special/profile-card.svg?react'
import PuzzleSvg from '@ic/normal/special/puzzle.svg?react'

import RulerCornerSvg from '@ic/normal/special/ruler-corner.svg?react'

import SoupSvg from '@ic/normal/special/soup.svg?react'

import TelegramSvg from '@ic/normal/special/telegram.svg?react'

import VaseMuseumSvg from '@ic/normal/special/vase-museum.svg?react'

import WhatsappSvg from '@ic/normal/special/whatsapp.svg?react'


export namespace SvgIconsPack {
  
  // UI Icons
  export const RadioActiveIc = generateSvgIcon(RadioActiveSvg)
  export const RadioInactiveIc = generateSvgIcon(RadioInactiveSvg)
  export const RestrictIc = generateSvgIcon(RestrictSvg)
  export const RingingBellIc = generateSvgIcon(RingingBellSvg)
  
  
  export const SearchIc = generateSvgIcon(SearchSvg)
  export const SoundOffIc = generateSvgIcon(SoundOffSvg)
  export const SoundOnIc = generateSvgIcon(SoundOnSvg)
  export const Spinner8LinesIc = React.memo(
    (() => {
      const rotation = keyframes({ to: { rotate: '1turn' } })
      const Spinner8Lines2 = styled(Spinner8LinesSvg)({
        animation: `${rotation} 1600ms linear infinite`,
      })
      return (props: SvgIconProps) => (
        <BaseSvgIcon {...props} SvgComponent={Spinner8Lines2}/>
      )
    })()
  )
  export const SpinnerCircleQuarterIc = React.memo(
    (() => {
      const rotation = keyframes({ to: { rotate: '1turn' } })
      const SpinnerCircleQuarter2 = styled(SpinnerCircleQuarterSvg)({
        animation: `${rotation} 650ms linear infinite`,
      })
      return (props: SvgIconProps) => (
        <BaseSvgIcon {...props} SvgComponent={SpinnerCircleQuarter2}/>
      )
    })()
  )
  export const SpinnerCircleQuarterBoldIc = React.memo(
    (() => {
      const rotation = keyframes({ to: { rotate: '1turn' } })
      const SpinnerCircleQuarter2 = styled(SpinnerCircleQuarterBoldSvg)({
        animation: `${rotation} 650ms linear infinite`,
      })
      return (props: SvgIconProps) => (
        <BaseSvgIcon {...props} SvgComponent={SpinnerCircleQuarter2}/>
      )
    })()
  )
  export const SyncErrorIc = generateSvgIcon(SyncErrorSvg)
  
  export const Unpin2Ic = generateSvgIcon(Unpin2Svg)
  
  export const VideoCameraIc = generateSvgIcon(VideoCameraSvg)
  export const VolumeIc = generateSvgIcon(VolumeSvg)
  export const VolumeMuteIc = generateSvgIcon(VolumeMuteSvg)
  
  export const InfoCircleOutlinedIc = generateSvgIcon(WarnCircleOutlinedSvg)
  export const WarnTriangleToastifyIc = generateSvgIcon(WarnTriangleToastifySvg)
  export const WarnTriangleOutlinedIc = generateSvgIcon(WarnTriangleOutlinedSvg)
  
  
  
  
  // Special icons
  export const CardsHeartIc = generateSvgIcon(CardsHeartSvg)
  export const CoffeeCupIc = generateSvgIcon(CoffeeCupSvg)
  
  export const DumbbellIc = generateSvgIcon(DumbbellSvg)
  
  export const EnvelopeIc = generateSvgIcon(EnvelopeSvg)
  
  export const Film2Ic = generateSvgIcon(Film2Svg)
  export const FountainIc = generateSvgIcon(FountainSvg)
  
  export const GenderIc = generateSvgIcon(GenderSvg)
  export const GiftBoxIc = generateSvgIcon(GiftBoxSvg)
  export const GlassAndDishIc = generateSvgIcon(GlassAndDishSvg)
  
  export const HandsetIc = generateSvgIcon(HandsetSvg)
  export const HeartIc = generateSvgIcon(HeartSvg)
  export const HeartFilledIc = generateSvgIcon(HeartFilledSvg)
  export const HeartLockIc = generateSvgIcon(HeartLockSvg)
  export const HeartsDoubleIc = generateSvgIcon(HeartsDoubleSvg)
  export const HelpIc = generateSvgIcon(HelpSvg)
  export const HomeIc = generateSvgIcon(HomeSvg)
  
  export const MasksTheatreIc = generateSvgIcon(MasksTheatreSvg)
  
  export const NameCardIc = generateSvgIcon(NameCardSvg)
  
  export const PictureArtIc = generateSvgIcon(PictureArtSvg)
  export const PlaneSendIc = generateSvgIcon(PlaneSendSvg)
  export const PresentationScreenIc = generateSvgIcon(PresentationScreenSvg)
  export const PriceTagIc = generateSvgIcon(PriceTagSvg)
  export const ProfileCardIc = generateSvgIcon(ProfileCardSvg)
  export const PuzzleIc = generateSvgIcon(PuzzleSvg)
  
  export const RulerCornerIc = generateSvgIcon(RulerCornerSvg)
  
  export const SoupIc = generateSvgIcon(SoupSvg)
  
  export const TelegramIc = generateSvgIcon(TelegramSvg)
  
  export const VaseMuseumIc = generateSvgIcon(VaseMuseumSvg)
  
  export const WhatsappIc = generateSvgIcon(WhatsappSvg)
  
  
  
}



