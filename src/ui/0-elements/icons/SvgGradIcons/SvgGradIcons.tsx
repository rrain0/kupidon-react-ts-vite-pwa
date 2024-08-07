import { css } from '@emotion/react'
import clsx from 'clsx'
import React from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import falsyToUndef = TypeU.falsyToUndef
import exists = TypeU.exists
import { SvgGradIconsStyle } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsStyle.ts'


import BasketballGradSvg from 'src/res/ic/gradient/basketball-grad.svg?react'
import BengalCatGradSvg from 'src/res/ic/gradient/bengal-cat-grad.svg?react'
import BowArrowGradSvg from 'src/res/ic/gradient/bow-arrow-grad.svg?react'

import CardsHeartGradSvg from 'src/res/ic/gradient/cards-heart-grad.svg?react'
import ChatRoundGradSvg from 'src/res/ic/gradient/chat-round-grad.svg?react'
import CommunicationTwoPeopleGradSvg from 'src/res/ic/gradient/communication-two-people-grad.svg?react'

import EducationGradSvg from 'src/res/ic/gradient/education-grad.svg?react'

import GenderGradSvg from 'src/res/ic/gradient/gender-grad.svg?react'
import GiftBoxGradSvg from 'src/res/ic/gradient/gift-box-grad.svg?react'

import HourglassGradSvg from 'src/res/ic/gradient/hourglass-grad.svg?react'

import InfoSquareRoundedGradSvg from 'src/res/ic/gradient/info-square-rounded-grad.svg?react'

import MapLocationGradSvg from 'src/res/ic/gradient/map-location-grad.svg?react'

import NameCardGradSvg from 'src/res/ic/gradient/name-card-grad.svg?react'

import ProfileGradSvg from 'src/res/ic/gradient/profile-grad.svg?react'
import PuzzlesGradSvg from 'src/res/ic/gradient/puzzles-grad.svg?react'

import RulerVerticalGradSvg from 'src/res/ic/gradient/ruler-vertical-grad.svg?react'

import Search2GradSvg from 'src/res/ic/gradient/search-2-grad.svg?react'

import SmokeCigaretteGradSvg from 'src/res/ic/gradient/smoke-cigarette-grad.svg?react'

import TelescopeGradSvg from 'src/res/ic/gradient/telescope-grad.svg?react'

import WineBottleAlcoholGradSvg from 'src/res/ic/gradient/wine-bottle-alcohol-grad.svg?react'

import WorkSuitcaseGradSvg from 'src/res/ic/gradient/work-suitcase-grad.svg?react'




export namespace SvgGradIcons {

  // Base interface for simple svg icons
  
  type BaseGradSvgIconCustomProps = PartialUndef<{
    firstColor: string
    secondColor: string
    size: number|string
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
  
  export const BaseGradSvgIcon =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, BaseGradSvgIconProps>(
  (props, forwardedRef) => {
    const {
      className,
      firstColor, secondColor,
      size, width, height,
      SvgComponent,
      ...restProps
    } = props
    
    const w = width ?? size
    const h = height ?? size
    
    const sizeProp = SvgGradIconsStyle.El.root.props.size
    const firstColorProp = SvgGradIconsStyle.El.root.props.firstColor
    const secondColorProp = SvgGradIconsStyle.El.root.props.secondColor
    
    return (
      <SvgComponent
        css={css`
          width:  ${falsyToUndef(!exists(w)) && sizeProp.var()};
          height: ${falsyToUndef(!exists(h)) && sizeProp.var()};
          //max-width: 100%;
          //max-height: 100%;
          ${firstColorProp.name}: ${firstColor || firstColorProp.var('black')};
          ${secondColorProp.name}: ${secondColor || secondColorProp.var('black')};
        `}
        width={w}
        height={h}
        className={clsx(className, SvgGradIconsStyle.El.icon.name)}
        {...restProps}
        ref={forwardedRef}
      />
    )
  }))
  
  
  
  
  export type SimpleSvgIconProps = BaseGradSvgIconCustomProps & BaseSimpleSvgIconForwardRefProps
  function generateSimpleSvgIcon(SvgComponent: SvgComponentType) {
    return (
    React.memo(
    React.forwardRef<BaseSimpleSvgIconRefElement, SimpleSvgIconProps>(
      (props, forwardedRef) =>
        <BaseGradSvgIcon {...props} SvgComponent={SvgComponent} ref={forwardedRef}/>
    )))
  }
  
  
  
  // Icons
  
  export const BasketballGradIc = generateSimpleSvgIcon(BasketballGradSvg)
  export const BengalCatGradIc = generateSimpleSvgIcon(BengalCatGradSvg)
  export const BowArrowGradIc = generateSimpleSvgIcon(BowArrowGradSvg)
  
  export const CardsHeartGradIc = generateSimpleSvgIcon(CardsHeartGradSvg)
  export const ChatRoundGradIc = generateSimpleSvgIcon(ChatRoundGradSvg)
  export const CommunicationTwoPeopleGradIc = generateSimpleSvgIcon(CommunicationTwoPeopleGradSvg)
  
  export const EducationGradIc = generateSimpleSvgIcon(EducationGradSvg)
  
  export const GenderGradIc = generateSimpleSvgIcon(GenderGradSvg)
  export const GiftBoxGradIc = generateSimpleSvgIcon(GiftBoxGradSvg)
  
  export const HourglassGradIc = generateSimpleSvgIcon(HourglassGradSvg)
  
  export const InfoSquareRoundedGradIc = generateSimpleSvgIcon(InfoSquareRoundedGradSvg)
  
  export const MapLocationGradIc = generateSimpleSvgIcon(MapLocationGradSvg)
  
  export const NameCardGradIc = generateSimpleSvgIcon(NameCardGradSvg)
  
  export const ProfileGradIc = generateSimpleSvgIcon(ProfileGradSvg)
  export const PuzzlesGradIc = generateSimpleSvgIcon(PuzzlesGradSvg)
  
  export const RulerVerticalGradIc = generateSimpleSvgIcon(RulerVerticalGradSvg)
  
  export const Search2GradIc = generateSimpleSvgIcon(Search2GradSvg)
  
  export const SmokeCigaretteGradIc = generateSimpleSvgIcon(SmokeCigaretteGradSvg)
  
  export const TelescopeGradIc = generateSimpleSvgIcon(TelescopeGradSvg)
  
  export const WineBottleAlcoholGradIc = generateSimpleSvgIcon(WineBottleAlcoholGradSvg)
  export const WorkSuitcaseGradIc = generateSimpleSvgIcon(WorkSuitcaseGradSvg)
  
  
  
}



