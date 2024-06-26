import { css } from '@emotion/react'
import clsx from 'clsx'
import React from 'react'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import PartialUndef = TypeUtils.PartialUndef
import falsyToUndef = TypeUtils.falsyToUndef
import exists = TypeUtils.exists
import { SvgGradIconsStyle } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIconsStyle.ts'


import BowArrowGradSvg from '@ic/gradient/bow-arrow-grad.svg?react'

import CardsHeartGradSvg from '@ic/gradient/cards-heart-grad.svg?react'
import ChatRoundGradSvg from '@ic/gradient/chat-round-grad.svg?react'

import EducationGradSvg from '@ic/gradient/education-grad.svg?react'

import GenderGradSvg from '@ic/gradient/gender-grad.svg?react'
import GiftBoxGradSvg from '@ic/gradient/gift-box-grad.svg?react'

import HourglassGradSvg from '@ic/gradient/hourglass-grad.svg?react'

import InfoSquareRoundedGradSvg from '@ic/gradient/info-square-rounded-grad.svg?react'

import WorkSuitcaseGradSvg from '@ic/gradient/work-suitcase-grad.svg?react'

import NameCardGradSvg from '@ic/gradient/name-card-grad.svg?react'

import ProfileGradSvg from '@ic/gradient/profile-grad.svg?react'

import RulerVerticalGradSvg from '@ic/gradient/ruler-vertical-grad.svg?react'

import Search2GradSvg from '@ic/gradient/search-2-grad.svg?react'




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
    
    return <SvgComponent
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
  }))
  
  
  
  
  export type SimpleSvgIconProps = BaseGradSvgIconCustomProps & BaseSimpleSvgIconForwardRefProps
  function generateSimpleSvgIcon(SvgComponent: SvgComponentType){
    return (
    React.memo(
    React.forwardRef<BaseSimpleSvgIconRefElement, SimpleSvgIconProps>(
      (props, forwardedRef) =>
        <BaseGradSvgIcon {...props} SvgComponent={SvgComponent} ref={forwardedRef}/>
    )))
  }
  
  
  
  // Icons
  
  export const BowArrowGradIc = generateSimpleSvgIcon(BowArrowGradSvg)
  
  export const CardsHeartGradIc = generateSimpleSvgIcon(CardsHeartGradSvg)
  export const ChatRoundGradIc = generateSimpleSvgIcon(ChatRoundGradSvg)
  
  export const EducationGradIc = generateSimpleSvgIcon(EducationGradSvg)
  
  export const GenderGradIc = generateSimpleSvgIcon(GenderGradSvg)
  export const GiftBoxGradIc = generateSimpleSvgIcon(GiftBoxGradSvg)
  
  export const HourglassGradIc = generateSimpleSvgIcon(HourglassGradSvg)
  
  export const InfoSquareRoundedGradIc = generateSimpleSvgIcon(InfoSquareRoundedGradSvg)
  
  export const WorkSuitcaseGradIc = generateSimpleSvgIcon(WorkSuitcaseGradSvg)
  
  export const NameCardGradIc = generateSimpleSvgIcon(NameCardGradSvg)
  
  export const ProfileGradIc = generateSimpleSvgIcon(ProfileGradSvg)
  
  export const RulerVerticalGradIc = generateSimpleSvgIcon(RulerVerticalGradSvg)
  
  export const Search2GradIc = generateSimpleSvgIcon(Search2GradSvg)
  
  
  
}



