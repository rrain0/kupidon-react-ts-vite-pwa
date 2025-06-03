import { TypeU } from '@util/common/TypeU.ts'
import clsx from 'clsx'
import React from 'react'
import { GradSvgIconS6 } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconS6.ts'
import Pu = TypeU.Pu




// Base interface for gradient svg icons

type BaseGradSvgIconExtraProps = Pu<{
  color0: string
  color1: string
  size: number | string
}>

type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string }
type SvgComponentType = React.FC<SvgProps>
type SvgComponentProp = { SvgComponent: SvgComponentType }

type SvgComponentProps = React.ComponentProps<'svg'>


export type BaseGradSvgIconProps =
  & BaseGradSvgIconExtraProps
  & SvgComponentProps
  & SvgComponentProp

export const BaseGradSvgIcon = React.memo((props: BaseGradSvgIconProps) => {
  const {
    className,
    color0, color1,
    size,
    width: w = size,
    height: h = size,
    SvgComponent,
    ...restProps
  } = props
  
  
  const sizeProp = GradSvgIconS6.W.els.gradIcon.ps!.sz
  const color0Prop = GradSvgIconS6.W.els.gradIcon.ps!.color0
  const color1Prop = GradSvgIconS6.W.els.gradIcon.ps!.color1
  
  return (
    <SvgComponent
      css={{
        width: w ?? sizeProp.var(),
        height: h ?? sizeProp.var(),
        [color0Prop.n]: color0 ?? color0Prop.var('black'),
        [color1Prop.n]: color1 ?? color1Prop.var('black'),
      }}
      className={clsx(className, GradSvgIconS6.W.els.gradIcon.n)}
      {...restProps}
    />
  )
})




export type GradSvgIconProps = 
  & BaseGradSvgIconExtraProps 
  & SvgComponentProps

export function generateGradSvgIcon(SvgComponent: SvgComponentType) {
  return React.memo((props: GradSvgIconProps) => (
    <BaseGradSvgIcon {...props} SvgComponent={SvgComponent}/>
  ))
}
  
  