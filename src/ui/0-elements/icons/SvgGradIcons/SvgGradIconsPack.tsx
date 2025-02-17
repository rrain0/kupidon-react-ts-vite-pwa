import { css } from '@emotion/react'
import clsx from 'clsx'
import React from 'react'
import { SvgGradIconS6 } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconS6.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import falsyToUndef = TypeU.falsyToUndef
import exists = TypeU.exists


import ArrowAngledRounded2GradSvg from 'src/res/ic/gradient/arrow-angled-rounded-2-grad.svg?react'
import ArrowBackGradSvg from 'src/res/ic/gradient/arrow-back-grad.svg?react'
import ArrowReload2GradSvg from 'src/res/ic/gradient/arrow-reload-2-grad.svg?react'

import BabyGradSvg from 'src/res/ic/gradient/baby-grad.svg?react'
import BasketballGradSvg from 'src/res/ic/gradient/basketball-grad.svg?react'
import BengalCatGradSvg from 'src/res/ic/gradient/bengal-cat-grad.svg?react'
import BookGradSvg from 'src/res/ic/gradient/book-grad.svg?react'
import BowArrowGradSvg from 'src/res/ic/gradient/bow-arrow-grad.svg?react'

import Calendar2GradSvg from 'src/res/ic/gradient/calendar-2-grad.svg?react'
import CardsDollarGradSvg from 'src/res/ic/gradient/cards-dollar-grad.svg?react'
import CardsHeartGradSvg from 'src/res/ic/gradient/cards-heart-grad.svg?react'
import ClockGradSvg from 'src/res/ic/gradient/clock-grad.svg?react'
import ChatRoundGradSvg from 'src/res/ic/gradient/chat-round-grad.svg?react'
import CommunicationTwoPeopleGradSvg from 'src/res/ic/gradient/communication-two-people-grad.svg?react'
import Couple2GradSvg from 'src/res/ic/gradient/couple-2-grad.svg?react'
import Cross2GradSvg from 'src/res/ic/gradient/cross-2-grad.svg?react'

import EducationGradSvg from 'src/res/ic/gradient/education-grad.svg?react'

import FilmGradSvg from 'src/res/ic/gradient/film-grad.svg?react'

import GenderGradSvg from 'src/res/ic/gradient/gender-grad.svg?react'
import GiftBoxGradSvg from 'src/res/ic/gradient/gift-box-grad.svg?react'
import GoalGradSvg from 'src/res/ic/gradient/goal-grad.svg?react'

import HourglassGradSvg from 'src/res/ic/gradient/hourglass-grad.svg?react'

import InfoSquareRoundedGradSvg from 'src/res/ic/gradient/info-square-rounded-grad.svg?react'

import MapLocationGradSvg from 'src/res/ic/gradient/map-location-grad.svg?react'

import NameCardGradSvg from 'src/res/ic/gradient/name-card-grad.svg?react'

import PlanetFrameGradSvg from 'src/res/ic/gradient/planet-frame-grad.svg?react'
import ProfileGradSvg from 'src/res/ic/gradient/profile-grad.svg?react'
import PuzzlesGradSvg from 'src/res/ic/gradient/puzzles-grad.svg?react'

import RelationshipMinusesGradSvg from 'src/res/ic/gradient/relationship-minuses-grad.svg?react'
import RulerVerticalGradSvg from 'src/res/ic/gradient/ruler-vertical-grad.svg?react'

import Search2GradSvg from 'src/res/ic/gradient/search-2-grad.svg?react'

import SmokeCigaretteGradSvg from 'src/res/ic/gradient/smoke-cigarette-grad.svg?react'

import TelescopeGradSvg from 'src/res/ic/gradient/telescope-grad.svg?react'

import WineBottleAlcoholGradSvg from 'src/res/ic/gradient/wine-bottle-alcohol-grad.svg?react'

import WorkSuitcaseGradSvg from 'src/res/ic/gradient/work-suitcase-grad.svg?react'




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
  
  type BaseSimpleSvgIconForwardRefProps = React.JSX.IntrinsicElements['svg']
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
  
  
  
  // Icons
  
  export const ArrowAngledRounded2GradIc = generateSimpleSvgIcon(ArrowAngledRounded2GradSvg)
  export const ArrowBackGradIc = generateSimpleSvgIcon(ArrowBackGradSvg)
  export const ArrowReload2GradIc = generateSimpleSvgIcon(ArrowReload2GradSvg)
  
  export const BabyGradIc = generateSimpleSvgIcon(BabyGradSvg)
  export const BasketballGradIc = generateSimpleSvgIcon(BasketballGradSvg)
  export const BengalCatGradIc = generateSimpleSvgIcon(BengalCatGradSvg)
  export const BookGradIc = generateSimpleSvgIcon(BookGradSvg)
  export const BowArrowGradIc = generateSimpleSvgIcon(BowArrowGradSvg)
  
  export const Calendar2GradIc = generateSimpleSvgIcon(Calendar2GradSvg)
  export const CardsDollarGradIc = generateSimpleSvgIcon(CardsDollarGradSvg)
  export const CardsHeartGradIc = generateSimpleSvgIcon(CardsHeartGradSvg)
  export const ClockGradIc = generateSimpleSvgIcon(ClockGradSvg)
  export const ChatRoundGradIc = generateSimpleSvgIcon(ChatRoundGradSvg)
  export const CommunicationTwoPeopleGradIc = generateSimpleSvgIcon(CommunicationTwoPeopleGradSvg)
  export const Couple2GradIc = generateSimpleSvgIcon(Couple2GradSvg)
  export const Cross2GradIc = generateSimpleSvgIcon(Cross2GradSvg)
  
  export const EducationGradIc = generateSimpleSvgIcon(EducationGradSvg)
  
  export const FilmGradIc = generateSimpleSvgIcon(FilmGradSvg)
  
  export const GenderGradIc = generateSimpleSvgIcon(GenderGradSvg)
  export const GiftBoxGradIc = generateSimpleSvgIcon(GiftBoxGradSvg)
  export const GoalGradIc = generateSimpleSvgIcon(GoalGradSvg)
  
  export const HourglassGradIc = generateSimpleSvgIcon(HourglassGradSvg)
  
  export const InfoSquareRoundedGradIc = generateSimpleSvgIcon(InfoSquareRoundedGradSvg)
  
  export const MapLocationGradIc = generateSimpleSvgIcon(MapLocationGradSvg)
  
  export const NameCardGradIc = generateSimpleSvgIcon(NameCardGradSvg)
  
  export const PlanetFrameGradIc = generateSimpleSvgIcon(PlanetFrameGradSvg)
  export const ProfileGradIc = generateSimpleSvgIcon(ProfileGradSvg)
  export const PuzzlesGradIc = generateSimpleSvgIcon(PuzzlesGradSvg)
  
  export const RelationshipMinusesGradIc = generateSimpleSvgIcon(RelationshipMinusesGradSvg)
  export const RulerVerticalGradIc = generateSimpleSvgIcon(RulerVerticalGradSvg)
  
  export const Search2GradIc = generateSimpleSvgIcon(Search2GradSvg)
  
  export const SmokeCigaretteGradIc = generateSimpleSvgIcon(SmokeCigaretteGradSvg)
  
  export const TelescopeGradIc = generateSimpleSvgIcon(TelescopeGradSvg)
  
  export const WineBottleAlcoholGradIc = generateSimpleSvgIcon(WineBottleAlcoholGradSvg)
  export const WorkSuitcaseGradIc = generateSimpleSvgIcon(WorkSuitcaseGradSvg)
  
  
  
}



