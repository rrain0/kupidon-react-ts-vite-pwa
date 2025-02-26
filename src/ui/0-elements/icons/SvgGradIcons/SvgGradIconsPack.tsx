import { css } from '@emotion/react'
import clsx from 'clsx'
import React from 'react'
import { SvgGradIconS6 } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconS6.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import falsyToUndef = TypeU.falsyToUndef
import exists = TypeU.exists


// UI Icons
import ArrowAngledRounded2GradSvg from '@ic/gradient/ui/arrow-angled-rounded-2-grad.svg?react'
import ArrowBackGradSvg from '@ic/gradient/ui/arrow-back-grad.svg?react'
import ArrowReload2GradSvg from '@ic/gradient/ui/arrow-reload-2-grad.svg?react'

import Calendar2GradSvg from '@ic/gradient/ui/calendar-2-grad.svg?react'
import ClockGradSvg from '@ic/gradient/ui/clock-grad.svg?react'
import ChatRoundGradSvg from '@ic/gradient/ui/chat-round-grad.svg?react'
import Cross2GradSvg from '@ic/gradient/ui/cross-2-grad.svg?react'

import InfoSquareRoundedGradSvg from '@ic/gradient/ui/info-square-rounded-grad.svg?react'

import PlanetFrameGradSvg from '@ic/gradient/ui/planet-frame-grad.svg?react'
import ProfileGradSvg from '@ic/gradient/ui/profile-grad.svg?react'

import SearchGradSvg from '@ic/gradient/ui/search-grad.svg?react'


// Special Icons

import BabyGradSvg from '@ic/gradient/special/baby-grad.svg?react'
import BasketballGradSvg from '@ic/gradient/special/basketball-grad.svg?react'
import BengalCatGradSvg from '@ic/gradient/special/bengal-cat-grad.svg?react'
import BookGradSvg from '@ic/gradient/special/book-grad.svg?react'
import BowArrowGradSvg from '@ic/gradient/special/bow-arrow-grad.svg?react'

import CardsDollarGradSvg from '@ic/gradient/special/cards-dollar-grad.svg?react'
import CardsHeartGradSvg from '@ic/gradient/special/cards-heart-grad.svg?react'
import CommunicationTwoPeopleGradSvg from '@ic/gradient/special/communication-two-people-grad.svg?react'
import Couple2GradSvg from '@ic/gradient/special/couple-2-grad.svg?react'
import CoupleDrinkingAtTableGradSvg from '@ic/gradient/special/couple-drinking-at-table.svg?react'

import EducationGradSvg from '@ic/gradient/special/education-grad.svg?react'

import FilmGradSvg from '@ic/gradient/special/film-grad.svg?react'

import GenderGradSvg from '@ic/gradient/special/gender-grad.svg?react'
import GiftBoxGradSvg from '@ic/gradient/special/gift-box-grad.svg?react'
import GoalGradSvg from '@ic/gradient/special/goal-grad.svg?react'

import HourglassGradSvg from '@ic/gradient/special/hourglass-grad.svg?react'

import MapLocationGradSvg from '@ic/gradient/special/map-location-grad.svg?react'

import NameCardGradSvg from '@ic/gradient/special/name-card-grad.svg?react'

import PuzzlesGradSvg from '@ic/gradient/special/puzzles-grad.svg?react'

import RelationshipMinusesGradSvg from '@ic/gradient/special/relationship-minuses-grad.svg?react'
import RulerVerticalGradSvg from '@ic/gradient/special/ruler-vertical-grad.svg?react'

import SmokeCigaretteGradSvg from '@ic/gradient/special/smoke-cigarette-grad.svg?react'

import TelescopeGradSvg from '@ic/gradient/special/telescope-grad.svg?react'

import WineBottleAlcoholGradSvg from '@ic/gradient/special/wine-bottle-alcohol-grad.svg?react'
import WorkSuitcaseGradSvg from '@ic/gradient/special/work-suitcase-grad.svg?react'



export namespace SvgGradIconsPack {

  // Base interface for simple svg icons
  
  type BaseGradSvgIconCustomProps = PartialUndef<{
    color0: string
    color1: string
    size: number | string
  }>
  
  type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string }
  type SvgComponentType = React.FunctionComponent<SvgProps>
  type BaseSimpleSvgIconSvgComponentProp = {
    SvgComponent: SvgComponentType
  }
  
  type BaseSimpleSvgIconForwardRefProps = React.ComponentPropsWithoutRef<'svg'>
  type BaseSimpleSvgIconRefElement = SVGSVGElement
  
  
  export type BaseGradSvgIconProps =
    BaseGradSvgIconCustomProps & BaseSimpleSvgIconForwardRefProps & BaseSimpleSvgIconSvgComponentProp
  
  export const BaseGradSvgIcon = React.memo(
    React.forwardRef<BaseSimpleSvgIconRefElement, BaseGradSvgIconProps>(
      (props, forwardedRef) => {
        const {
          className,
          color0, color1,
          size, width, height,
          SvgComponent,
          ...restProps
        } = props
        
        const w = width ?? size
        const h = height ?? size
        
        const sizeProp = SvgGradIconS6.W.els.gradIcon.ps!.sz
        const color0Prop = SvgGradIconS6.W.els.gradIcon.ps!.color0
        const color1Prop = SvgGradIconS6.W.els.gradIcon.ps!.color1
        
        return (
          <SvgComponent
            css={css`
              width:  ${falsyToUndef(!exists(w)) && sizeProp.var()};
              height: ${falsyToUndef(!exists(h)) && sizeProp.var()};
              //max-width: 100%;
              //max-height: 100%;
              ${color0Prop.n}: ${color0 || color0Prop.var('black')};
              ${color1Prop.n}: ${color1 || color1Prop.var('black')};
            `}
            width={w}
            height={h}
            className={clsx(className, SvgGradIconS6.W.els.gradIcon.n)}
            {...restProps}
            ref={forwardedRef}
          />
        )
      }
    )
  )
  
  
  
  
  export type SimpleSvgIconProps = BaseGradSvgIconCustomProps & BaseSimpleSvgIconForwardRefProps
  function generateSimpleSvgIcon(SvgComponent: SvgComponentType) {
    return (
      React.memo(
        React.forwardRef<BaseSimpleSvgIconRefElement, SimpleSvgIconProps>(
          (props, forwardedRef) =>
            <BaseGradSvgIcon {...props} SvgComponent={SvgComponent} ref={forwardedRef} />
        )
      )
    )
  }
  
  
  
  // UI Icons
  
  export const ArrowAngledRounded2GradIc = generateSimpleSvgIcon(ArrowAngledRounded2GradSvg)
  export const ArrowBackGradIc = generateSimpleSvgIcon(ArrowBackGradSvg)
  export const ArrowReload2GradIc = generateSimpleSvgIcon(ArrowReload2GradSvg)
  
  export const Calendar2GradIc = generateSimpleSvgIcon(Calendar2GradSvg)
  export const ClockGradIc = generateSimpleSvgIcon(ClockGradSvg)
  export const ChatRoundGradIc = generateSimpleSvgIcon(ChatRoundGradSvg)
  export const Cross2GradIc = generateSimpleSvgIcon(Cross2GradSvg)
  
  export const InfoSquareRoundedGradIc = generateSimpleSvgIcon(InfoSquareRoundedGradSvg)
  
  export const PlanetFrameGradIc = generateSimpleSvgIcon(PlanetFrameGradSvg)
  export const ProfileGradIc = generateSimpleSvgIcon(ProfileGradSvg)
  
  export const SearchGradIc = generateSimpleSvgIcon(SearchGradSvg)
  
  
  
  // Special Icons
  
  export const BabyGradIc = generateSimpleSvgIcon(BabyGradSvg)
  export const BasketballGradIc = generateSimpleSvgIcon(BasketballGradSvg)
  export const BengalCatGradIc = generateSimpleSvgIcon(BengalCatGradSvg)
  export const BookGradIc = generateSimpleSvgIcon(BookGradSvg)
  export const BowArrowGradIc = generateSimpleSvgIcon(BowArrowGradSvg)
  
  export const CardsDollarGradIc = generateSimpleSvgIcon(CardsDollarGradSvg)
  export const CardsHeartGradIc = generateSimpleSvgIcon(CardsHeartGradSvg)
  export const CommunicationTwoPeopleGradIc = generateSimpleSvgIcon(CommunicationTwoPeopleGradSvg)
  export const Couple2GradIc = generateSimpleSvgIcon(Couple2GradSvg)
  export const CoupleDrinkingAtTableGradIc = generateSimpleSvgIcon(CoupleDrinkingAtTableGradSvg)
  
  export const EducationGradIc = generateSimpleSvgIcon(EducationGradSvg)
  
  export const FilmGradIc = generateSimpleSvgIcon(FilmGradSvg)
  
  export const GenderGradIc = generateSimpleSvgIcon(GenderGradSvg)
  export const GiftBoxGradIc = generateSimpleSvgIcon(GiftBoxGradSvg)
  export const GoalGradIc = generateSimpleSvgIcon(GoalGradSvg)
  
  export const HourglassGradIc = generateSimpleSvgIcon(HourglassGradSvg)
  
  export const MapLocationGradIc = generateSimpleSvgIcon(MapLocationGradSvg)
  
  export const NameCardGradIc = generateSimpleSvgIcon(NameCardGradSvg)
  
  export const PuzzlesGradIc = generateSimpleSvgIcon(PuzzlesGradSvg)
  
  export const RelationshipMinusesGradIc = generateSimpleSvgIcon(RelationshipMinusesGradSvg)
  export const RulerVerticalGradIc = generateSimpleSvgIcon(RulerVerticalGradSvg)
  
  export const SmokeCigaretteGradIc = generateSimpleSvgIcon(SmokeCigaretteGradSvg)
  
  export const TelescopeGradIc = generateSimpleSvgIcon(TelescopeGradSvg)
  
  export const WineBottleAlcoholGradIc = generateSimpleSvgIcon(WineBottleAlcoholGradSvg)
  export const WorkSuitcaseGradIc = generateSimpleSvgIcon(WorkSuitcaseGradSvg)
  
  
}



