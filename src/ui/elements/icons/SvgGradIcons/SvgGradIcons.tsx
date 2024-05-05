import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import React from 'react'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import PartialUndef = TypeUtils.PartialUndef
import falsyToUndef = TypeUtils.falsyToUndef
import exists = TypeUtils.exists
import { SvgGradIconsStyle } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIconsStyle.ts'


import GenderGradSvg from '@ic/gradient/gender-grad.svg?react'
import GiftBoxGradSvg from '@ic/gradient/gift-box-grad.svg?react'

import NameCardGradSvg from '@ic/gradient/name-card-grad.svg?react'

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
    
    const firstColorProp = SvgGradIconsStyle.Prop.firstColor
    const secondColorProp = SvgGradIconsStyle.Prop.secondColor
    
    return <SvgComponent
      css={css`
        width:  ${falsyToUndef(!exists(w)) && SvgGradIconsStyle.Prop.size.var()};
        height: ${falsyToUndef(!exists(h)) && SvgGradIconsStyle.Prop.size.var()};
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
  
  export const GenderGradIc = generateSimpleSvgIcon(GenderGradSvg)
  export const GiftBoxGradIc = generateSimpleSvgIcon(GiftBoxGradSvg)
  
  export const NameCardGradIc = generateSimpleSvgIcon(NameCardGradSvg)
  
  export const Search2GradIc = generateSimpleSvgIcon(Search2GradSvg)
  
  
  
}



