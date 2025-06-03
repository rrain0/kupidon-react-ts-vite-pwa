import { TypeU } from '@util/common/TypeU.ts'
import clsx from 'clsx'
import React from 'react'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import Pu = TypeU.Pu





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




export type SvgIconProps =
  & BaseSvgIconExtraProps
  & SvgComponentProps


export const generateSvgIcon = (SvgComponent: SvgComponentType) => (
  React.memo((props: SvgIconProps) => (
    <BaseSvgIcon {...props} SvgComponent={SvgComponent}/>
  ))
)


