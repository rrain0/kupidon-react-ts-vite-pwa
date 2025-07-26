import { TypeU } from '@util/common/TypeU.ts'
import clsx from 'clsx'
import React from 'react'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import Pu = TypeU.Pu
import isdef = TypeU.isdef



// Base interface for simple svg icons

type BaseSvgIconExtraProps = Pu<{
  color: string
  colorAccent: string
  size: number | string
}>

type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string }
type SvgComponentType = React.FC<SvgProps>
type SvgComponentProp = { SvgComponent: SvgComponentType }

type SvgComponentProps = React.ComponentProps<'svg'>


export type BaseSvgIconProps =
  & BaseSvgIconExtraProps
  & SvgComponentProps
  & SvgComponentProp

export const BaseSvgIcon = React.memo((props: BaseSvgIconProps) => {
  const {
    className,
    color, colorAccent,
    size,
    width: w = size,
    height: h = size,
    SvgComponent,
    ...restProps
  } = props
  
  const {
    size: sizeProp,
    color: colorProp,
    colorAcc: colorAccentProp,
  } = SvgIconS6.W.els.icon.ps!
  
  
  const svgIconStyleClassName = 'svgIconStyle'
  
  
  return (
    <SvgComponent
      css={[
        {
          width: sizeProp.var(),
          height: sizeProp.var(),
          fill: colorProp.var('black'),
          stroke: colorProp.var('black'),
          [colorAccentProp.n]: colorAccentProp.var('gray'),
        },
        {
          [`&.${svgIconStyleClassName}`]: {
            ...isdef(w) && { width: w },
            ...isdef(h) && { height: h },
            ...isdef(color) && { fill: color, stroke: color },
            ...isdef(colorAccent) && { [colorAccentProp.n]: colorAccent },
          },
        },
      ]}
      className={clsx(className, SvgIconS6.W.els.icon.n, svgIconStyleClassName)}
      {...restProps}
    />
  )
})




export type SvgIconProps =
  & BaseSvgIconExtraProps
  & SvgComponentProps


export const generateSvgIcon = (SvgComponent: SvgComponentType) => (
  React.memo((props: SvgIconProps) => (
    <BaseSvgIcon {...props} SvgComponent={SvgComponent}/>
  ))
)


