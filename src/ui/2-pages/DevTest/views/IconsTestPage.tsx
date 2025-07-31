import styled from '@emotion/styled'
import { flexStyle } from '@util/react/short-props/style/flexStyle.ts'
import React from 'react'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { GradSvgIconS6 } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'

// UI icons
import AddModuleIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/AddModuleIc.tsx'
import ArchiveBoxOutlinedIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/ArchiveBoxOutlinedIc.tsx'
import ArrowAngledRoundedIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/ArrowAngledRoundedIc.tsx'
import ArrowBackIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/ArrowBackIc.tsx'
import ArrowLinesSharp1Ic from 'src/ui/0-elements/icons/SvgIcons/pack/ui/ArrowLinesSharp1Ic.tsx'
import ArrowRefreshCwIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/ArrowRefreshCwIc.tsx'
import ArrowReloadIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/ArrowReloadIc.tsx'
import Calendar2Ic from 'src/ui/0-elements/icons/SvgIcons/pack/ui/Calendar2Ic.tsx'
import CalendarIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CalendarIc.tsx'
import ChatRoundIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/ChatRoundIc.tsx'
import CheckmarkBoldIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CheckmarkBoldIc.tsx'
import CheckmarkCircleToastifyIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CheckmarkCircleToastifyIc.tsx'
import CheckmarkDoubleIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CheckmarkDoubleIc.tsx'
import CheckmarkIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CheckmarkIc.tsx'
import ClearTrashIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/ClearTrashIc.tsx'
import ClipIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/ClipIc.tsx'
import CopyIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CopyIc.tsx'
import CrossBoldIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CrossBoldIc.tsx'
import CrossIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CrossIc.tsx'
import CrossInCircleIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/CrossInCircleIc.tsx'
import DangerRoundToastifyIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/DangerRoundToastifyIc.tsx'
import DayIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/DayIc.tsx'
import DayNightIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/DayNightIc.tsx'
import DocumentErrorIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/DocumentErrorIc.tsx'
import DownloadIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/DownloadIc.tsx'
import EmojiLaughIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/EmojiLaughIc.tsx'
import EyeCrossedOutIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/EyeCrossedOutIc.tsx'
import EyeIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/EyeIc.tsx'
import EyeWideIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/EyeWideIc.tsx'
import FloppyDisk1Ic from 'src/ui/0-elements/icons/SvgIcons/pack/ui/FloppyDisk1Ic.tsx'
import FourDotsIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/FourDotsIc.tsx'
import FullscreenIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/FullscreenIc.tsx'
import FunnelFilterListIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/FunnelFilterListIc.tsx'
import GearIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/GearIc.tsx'
import GearOutlinedIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/GearOutlinedIc.tsx'
import InfoCircleOutlinedIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/InfoCircleOutlinedIc.tsx'
import InfoToastifyIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/InfoToastifyIc.tsx'
import LockIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/LockIc.tsx'
import LocationIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/LocationIc.tsx'
import MapLocationIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/MapLocationIc.tsx'
import MicrophoneIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/MicrophoneIc.tsx'
import MoonIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/MoonIc.tsx'
import NightIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/NightIc.tsx'
import PencilWrite2Ic from 'src/ui/0-elements/icons/SvgIcons/pack/ui/PencilWrite2Ic.tsx'
import PictureIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/PictureIc.tsx'
import Pin2Ic from 'src/ui/0-elements/icons/SvgIcons/pack/ui/Pin2Ic.tsx'
import PinIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/PinIc.tsx'
import PlanetFrameIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/PlanetFrameIc.tsx'
import PlusIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/PlusIc.tsx'
import ProfileIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/ProfileIc.tsx'
import RadioActiveIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/RadioActiveIc.tsx'
import RadioInactiveIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/RadioInactiveIc.tsx'
import RestrictIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/RestrictIc.tsx'
import RingingBellIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/RingingBellIc.tsx'
import SearchIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/SearchIc.tsx'
import SoundOffIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/SoundOffIc.tsx'
import SoundOnIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/SoundOnIc.tsx'
import Spinner8LinesIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/Spinner8LinesIc.tsx'
import SpinnerCircleQuarterBoldIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/SpinnerCircleQuarterBoldIc.tsx'
import SpinnerCircleQuarterIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/SpinnerCircleQuarterIc.tsx'
import SyncErrorIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/SyncErrorIc.tsx'
import Unpin2Ic from 'src/ui/0-elements/icons/SvgIcons/pack/ui/Unpin2Ic.tsx'
import VideoCameraIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/VideoCameraIc.tsx'
import VolumeIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/VolumeIc.tsx'
import VolumeMuteIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/VolumeMuteIc.tsx'
import WarnTriangleOutlinedIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/WarnTriangleOutlinedIc.tsx'
import WarnTriangleToastifyIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/WarnTriangleToastifyIc.tsx'

// Special icons
import BlacklistIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/BlacklistIc.tsx'
import BowArrowIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/BowArrowIc.tsx'
import CardsHeartIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/CardsHeartIc.tsx'
import CoffeeCupIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/CoffeeCupIc.tsx'
import DumbbellIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/DumbbellIc.tsx'
import EnvelopeIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/EnvelopeIc.tsx'
import Film2Ic from 'src/ui/0-elements/icons/SvgIcons/pack/special/Film2Ic.tsx'
import FountainIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/FountainIc.tsx'
import GenderIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/GenderIc.tsx'
import GiftBoxIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/GiftBoxIc.tsx'
import GlassAndDishIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/GlassAndDishIc.tsx'
import HandsetIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/HandsetIc.tsx'
import HeartFilledIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/HeartFilledIc.tsx'
import HeartIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/HeartIc.tsx'
import HeartLockIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/HeartLockIc.tsx'
import HeartsDoubleIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/HeartsDoubleIc.tsx'
import HelpIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/HelpIc.tsx'
import HomeIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/HomeIc.tsx'
import MasksTheatreIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/MasksTheatreIc.tsx'
import NameCardIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/NameCardIc.tsx'
import PictureArtIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/PictureArtIc.tsx'
import PlaneSendIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/PlaneSendIc.tsx'
import PresentationScreenIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/PresentationScreenIc.tsx'
import PriceTagIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/PriceTagIc.tsx'
import ProfileCardIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/ProfileCardIc.tsx'
import PuzzleIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/PuzzleIc.tsx'
import QrScanIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/QrScanIc.tsx'
import RulerCornerIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/RulerCornerIc.tsx'
import SoupIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/SoupIc.tsx'
import TelegramIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/TelegramIc.tsx'
import VaseMuseumIc from 'src/ui/0-elements/icons/SvgIcons/pack/special/VaseMuseumIc.tsx'
import Whatsapp from 'src/ui/0-elements/icons/SvgIcons/pack/special/Whatsapp.tsx'

// Gradient UI icons
import ArrowAngledRounded2GradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/ArrowAngledRounded2GradIc.tsx'
import ArrowBackGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/ArrowBackGradIc.tsx'
import ArrowReload2GradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/ArrowReload2GradIc.tsx'
import Calendar2GradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/Calendar2GradIc.tsx'
import ChatRoundGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/ChatRoundGradIc.tsx'
import ClockGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/ClockGradIc.tsx'
import Cross2GradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/Cross2GradIc.tsx'
import HeartOutlinedGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/HeartOutlinedGradIc.tsx'
import InfoSquareRoundedGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/InfoSquareRoundedGradIc.tsx'
import MapLocationGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/MapLocationGradIc.tsx'
import PlanetFrameGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/PlanetFrameGradIc.tsx'
import ProfileGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/ProfileGradIc.tsx'
import SearchGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/SearchGradIc.tsx'

// Gradient Special icons
import BabyGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/BabyGradIc.tsx'
import BasketballGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/BasketballGradIc.tsx'
import BengalCatGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/BengalCatGradIc.tsx'
import BookGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/BookGradIc.tsx'
import BowArrowGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/BowArrowGradIc.tsx'
import CardsDollarGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/CardsDollarGradIc.tsx'
import CardsHeartGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/CardsHeartGradIc.tsx'
import CommunicationTwoPeopleGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/CommunicationTwoPeopleGradIc.tsx'
import Couple2GradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/Couple2GradIc.tsx'
import CoupleDrinkingAtTableGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/CoupleDrinkingAtTableGradIc.tsx'
import EducationGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/EducationGradIc.tsx'
import FilmGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/FilmGradIc.tsx'
import GenderGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/GenderGradIc.tsx'
import GiftBoxGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/GiftBoxGradIc.tsx'
import GoalGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/GoalGradIc.tsx'
import HourglassGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/HourglassGradIc.tsx'
import NameCardGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/NameCardGradIc.tsx'
import PuzzlesGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/PuzzlesGradIc.tsx'
import RelationshipMinusesGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/RelationshipMinusesGradIc.tsx'
import RulerVerticalGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/RulerVerticalGradIc.tsx'
import SmokeCigaretteGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/SmokeCigaretteGradIc.tsx'
import TelescopeGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/TelescopeGradIc.tsx'
import WineBottleAlcoholGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/WineBottleAlcoholGradIc.tsx'
import WorkSuitcaseGradIc from 'src/ui/0-elements/icons/GradSvgIcons/pack/special/WorkSuitcaseGradIc.tsx'



const IconsTestPage = React.memo(() => {
  
  return (
    <>
      
      <PageLayout col css={{ '*': { userSelect: 'text' } }}>
        <PageContentLayout col>
          
          <Flex>Icons showcase</Flex>
          
          <Flex row wrap g={10}>
            {Icons.map(({ name, Icon, style }) => (
              <IconItemBox key={name}>
                <Flex grow>{name}</Flex>
                <IconBox>
                  <Icon css={style}/>
                </IconBox>
              </IconItemBox>
            ))}
          </Flex>
        
        </PageContentLayout>
      </PageLayout>
      
      
      <BottomFloatingBar settingsButton/>
    
    </>
  )
})
IconsTestPage.displayName = 'IconsTestPage'
export default IconsTestPage


const IconItemBox = styled(Flex)(flexStyle({
  col: true, align: true, w: 200, h: 110, rad: 10, p: 4, g: 4,
  border: '2px solid #5f6b82',
}))
const IconBox = styled(Flex)(flexStyle({
  col: true, sz: 50, rad: 10, p: 4, g: 10,
  border: '2px solid #5f6b82',
}))





const icS = SvgIconS6.t(SvgIconS6.S.icon.icon.full.normal)
const icWithAccentS = SvgIconS6.t(t => [SvgIconS6.S.icon.icon.full.normal, {
  iconColor: t.boxAccentCt4.bgf,
  iconColorAcc: t.boxAccentCt4.ctf,
}])
const blacklistIcS = SvgIconS6.t(t => [SvgIconS6.S.icon.icon.full.normal, {
  // TODO Theme
  icon: { color: '#263238', colorAcc: '#e53935' },
}])
const gradIcS = GradSvgIconS6.t(GradSvgIconS6.S.icon.icon.full.accent)

const Icons = [
  // UI icons
  { name: 'AddModuleIc', Icon: AddModuleIc, style: icS },
  { name: 'ArchiveBoxOutlinedIc', Icon: ArchiveBoxOutlinedIc, style: icS },
  { name: 'ArrowAngledRoundedIc', Icon: ArrowAngledRoundedIc, style: icS },
  { name: 'ArrowBackIc', Icon: ArrowBackIc, style: icS },
  { name: 'ArrowLinesSharp1Ic', Icon: ArrowLinesSharp1Ic, style: icS },
  { name: 'ArrowRefreshCwIc', Icon: ArrowRefreshCwIc, style: icS },
  { name: 'ArrowReloadIc', Icon: ArrowReloadIc, style: icS },
  { name: 'Calendar2Ic', Icon: Calendar2Ic, style: icS },
  { name: 'CalendarIc', Icon: CalendarIc, style: icS },
  { name: 'ChatRoundIc', Icon: ChatRoundIc, style: icS },
  { name: 'CheckmarkBoldIc', Icon: CheckmarkBoldIc, style: icS },
  { name: 'CheckmarkCircleToastifyIc', Icon: CheckmarkCircleToastifyIc, style: icS },
  { name: 'CheckmarkDoubleIc', Icon: CheckmarkDoubleIc, style: icS },
  { name: 'CheckmarkIc', Icon: CheckmarkIc, style: icS },
  { name: 'ClearTrashIc', Icon: ClearTrashIc, style: icS },
  { name: 'ClipIc', Icon: ClipIc, style: icS },
  { name: 'CopyIc', Icon: CopyIc, style: icS },
  { name: 'CrossBoldIc', Icon: CrossBoldIc, style: icS },
  { name: 'CrossIc', Icon: CrossIc, style: icS },
  { name: 'CrossInCircleIc', Icon: CrossInCircleIc, style: icS },
  { name: 'DangerRoundToastifyIc', Icon: DangerRoundToastifyIc, style: icS },
  { name: 'DayIc', Icon: DayIc, style: icS },
  { name: 'DayNightIc', Icon: DayNightIc, style: icS },
  { name: 'DocumentErrorIc', Icon: DocumentErrorIc, style: icS },
  { name: 'DownloadIc', Icon: DownloadIc, style: icS },
  { name: 'EmojiLaughIc', Icon: EmojiLaughIc, style: icS },
  { name: 'EyeCrossedOutIc', Icon: EyeCrossedOutIc, style: icS },
  { name: 'EyeIc', Icon: EyeIc, style: icS },
  { name: 'EyeWideIc', Icon: EyeWideIc, style: icS },
  { name: 'FloppyDisk1Ic', Icon: FloppyDisk1Ic, style: icS },
  { name: 'FourDotsIc', Icon: FourDotsIc, style: icS },
  { name: 'FullscreenIc', Icon: FullscreenIc, style: icS },
  { name: 'FunnelFilterListIc', Icon: FunnelFilterListIc, style: icS },
  { name: 'GearIc', Icon: GearIc, style: icS },
  { name: 'GearOutlinedIc', Icon: GearOutlinedIc, style: icS },
  { name: 'InfoCircleOutlinedIc', Icon: InfoCircleOutlinedIc, style: icS },
  { name: 'InfoToastifyIc', Icon: InfoToastifyIc, style: icS },
  { name: 'LockIc', Icon: LockIc, style: icS },
  { name: 'LocationIc', Icon: LocationIc, style: icS },
  { name: 'MapLocationIc', Icon: MapLocationIc, style: icS },
  { name: 'MicrophoneIc', Icon: MicrophoneIc, style: icS },
  { name: 'MoonIc', Icon: MoonIc, style: icS },
  { name: 'NightIc', Icon: NightIc, style: icS },
  { name: 'PencilWrite2Ic', Icon: PencilWrite2Ic, style: icS },
  { name: 'PictureIc', Icon: PictureIc, style: icS },
  { name: 'Pin2Ic', Icon: Pin2Ic, style: icS },
  { name: 'PinIc', Icon: PinIc, style: icS },
  { name: 'PlanetFrameIc', Icon: PlanetFrameIc, style: icS },
  { name: 'PlusIc', Icon: PlusIc, style: icS },
  { name: 'ProfileIc', Icon: ProfileIc, style: icS },
  { name: 'RadioActiveIc', Icon: RadioActiveIc, style: icS },
  { name: 'RadioInactiveIc', Icon: RadioInactiveIc, style: icS },
  { name: 'RestrictIc', Icon: RestrictIc, style: icS },
  { name: 'RingingBellIc', Icon: RingingBellIc, style: icS },
  { name: 'SearchIc', Icon: SearchIc, style: icS },
  { name: 'SoundOffIc', Icon: SoundOffIc, style: icS },
  { name: 'SoundOnIc', Icon: SoundOnIc, style: icS },
  { name: 'Spinner8LinesIc', Icon: Spinner8LinesIc, style: icS },
  { name: 'SpinnerCircleQuarterBoldIc', Icon: SpinnerCircleQuarterBoldIc, style: icWithAccentS },
  { name: 'SpinnerCircleQuarterIc', Icon: SpinnerCircleQuarterIc, style: icWithAccentS },
  { name: 'SyncErrorIc', Icon: SyncErrorIc, style: icS },
  { name: 'Unpin2Ic', Icon: Unpin2Ic, style: icS },
  { name: 'VideoCameraIc', Icon: VideoCameraIc, style: icS },
  { name: 'VolumeIc', Icon: VolumeIc, style: icS },
  { name: 'VolumeMuteIc', Icon: VolumeMuteIc, style: icS },
  { name: 'WarnTriangleOutlinedIc', Icon: WarnTriangleOutlinedIc, style: icS },
  { name: 'WarnTriangleToastifyIc', Icon: WarnTriangleToastifyIc, style: icS },

  // Special icons
  { name: 'BlacklistIc', Icon: BlacklistIc, style: blacklistIcS },
  { name: 'BowArrowIc', Icon: BowArrowIc, style: icS },
  { name: 'CardsHeartIc', Icon: CardsHeartIc, style: icS },
  { name: 'CoffeeCupIc', Icon: CoffeeCupIc, style: icS },
  { name: 'DumbbellIc', Icon: DumbbellIc, style: icS },
  { name: 'EnvelopeIc', Icon: EnvelopeIc, style: icS },
  { name: 'Film2Ic', Icon: Film2Ic, style: icS },
  { name: 'FountainIc', Icon: FountainIc, style: icS },
  { name: 'GenderIc', Icon: GenderIc, style: icS },
  { name: 'GiftBoxIc', Icon: GiftBoxIc, style: icS },
  { name: 'GlassAndDishIc', Icon: GlassAndDishIc, style: icS },
  { name: 'HandsetIc', Icon: HandsetIc, style: icS },
  { name: 'HeartFilledIc', Icon: HeartFilledIc, style: icS },
  { name: 'HeartIc', Icon: HeartIc, style: icS },
  { name: 'HeartLockIc', Icon: HeartLockIc, style: icS },
  { name: 'HeartsDoubleIc', Icon: HeartsDoubleIc, style: icS },
  { name: 'HelpIc', Icon: HelpIc, style: icS },
  { name: 'HomeIc', Icon: HomeIc, style: icS },
  { name: 'MasksTheatreIc', Icon: MasksTheatreIc, style: icS },
  { name: 'NameCardIc', Icon: NameCardIc, style: icS },
  { name: 'PictureArtIc', Icon: PictureArtIc, style: icS },
  { name: 'PlaneSendIc', Icon: PlaneSendIc, style: icS },
  { name: 'PresentationScreenIc', Icon: PresentationScreenIc, style: icS },
  { name: 'PriceTagIc', Icon: PriceTagIc, style: icS },
  { name: 'ProfileCardIc', Icon: ProfileCardIc, style: icS },
  { name: 'PuzzleIc', Icon: PuzzleIc, style: icS },
  { name: 'QrScanIc', Icon: QrScanIc, style: icS },
  { name: 'RulerCornerIc', Icon: RulerCornerIc, style: icS },
  { name: 'SoupIc', Icon: SoupIc, style: icS },
  { name: 'TelegramIc', Icon: TelegramIc, style: icS },
  { name: 'VaseMuseumIc', Icon: VaseMuseumIc, style: icS },
  { name: 'Whatsapp', Icon: Whatsapp, style: icS },

  // Gradient UI icons
  { name: 'ArrowAngledRounded2GradIc', Icon: ArrowAngledRounded2GradIc, style: gradIcS },
  { name: 'ArrowBackGradIc', Icon: ArrowBackGradIc, style: gradIcS },
  { name: 'ArrowReload2GradIc', Icon: ArrowReload2GradIc, style: gradIcS },
  { name: 'Calendar2GradIc', Icon: Calendar2GradIc, style: gradIcS },
  { name: 'ChatRoundGradIc', Icon: ChatRoundGradIc, style: gradIcS },
  { name: 'ClockGradIc', Icon: ClockGradIc, style: gradIcS },
  { name: 'Cross2GradIc', Icon: Cross2GradIc, style: gradIcS },
  { name: 'HeartOutlinedGradIc', Icon: HeartOutlinedGradIc, style: gradIcS },
  { name: 'InfoSquareRoundedGradIc', Icon: InfoSquareRoundedGradIc, style: gradIcS },
  { name: 'MapLocationGradIc', Icon: MapLocationGradIc, style: gradIcS },
  { name: 'PlanetFrameGradIc', Icon: PlanetFrameGradIc, style: gradIcS },
  { name: 'ProfileGradIc', Icon: ProfileGradIc, style: gradIcS },
  { name: 'SearchGradIc', Icon: SearchGradIc, style: gradIcS },

  // Gradient Special icons
  { name: 'BabyGradIc', Icon: BabyGradIc, style: gradIcS },
  { name: 'BasketballGradIc', Icon: BasketballGradIc, style: gradIcS },
  { name: 'BengalCatGradIc', Icon: BengalCatGradIc, style: gradIcS },
  { name: 'BookGradIc', Icon: BookGradIc, style: gradIcS },
  { name: 'BowArrowGradIc', Icon: BowArrowGradIc, style: gradIcS },
  { name: 'CardsDollarGradIc', Icon: CardsDollarGradIc, style: gradIcS },
  { name: 'CardsHeartGradIc', Icon: CardsHeartGradIc, style: gradIcS },
  { name: 'CommunicationTwoPeopleGradIc', Icon: CommunicationTwoPeopleGradIc, style: gradIcS },
  { name: 'Couple2GradIc', Icon: Couple2GradIc, style: gradIcS },
  { name: 'CoupleDrinkingAtTableGradIc', Icon: CoupleDrinkingAtTableGradIc, style: gradIcS },
  { name: 'EducationGradIc', Icon: EducationGradIc, style: gradIcS },
  { name: 'FilmGradIc', Icon: FilmGradIc, style: gradIcS },
  { name: 'GenderGradIc', Icon: GenderGradIc, style: gradIcS },
  { name: 'GiftBoxGradIc', Icon: GiftBoxGradIc, style: gradIcS },
  { name: 'GoalGradIc', Icon: GoalGradIc, style: gradIcS },
  { name: 'HourglassGradIc', Icon: HourglassGradIc, style: gradIcS },
  { name: 'NameCardGradIc', Icon: NameCardGradIc, style: gradIcS },
  { name: 'PuzzlesGradIc', Icon: PuzzlesGradIc, style: gradIcS },
  { name: 'RelationshipMinusesGradIc', Icon: RelationshipMinusesGradIc, style: gradIcS },
  { name: 'RulerVerticalGradIc', Icon: RulerVerticalGradIc, style: gradIcS },
  { name: 'SmokeCigaretteGradIc', Icon: SmokeCigaretteGradIc, style: gradIcS },
  { name: 'TelescopeGradIc', Icon: TelescopeGradIc, style: gradIcS },
  { name: 'WineBottleAlcoholGradIc', Icon: WineBottleAlcoholGradIc, style: gradIcS },
  { name: 'WorkSuitcaseGradIc', Icon: WorkSuitcaseGradIc, style: gradIcS },
]

