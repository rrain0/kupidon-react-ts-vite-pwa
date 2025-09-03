
import clsx from 'clsx'
import React from 'react'
import { GradSvgIconS6 } from 'src/components/elems/icons/GradSvgIcons/GradSvgIconS6.ts'
import { Pu } from '@utils/base/TypeUtils.ts'
import { isdef } from '@utils/base/TypeUtils.ts'




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

  const {
    sz: sizeProp,
    color0: color0Prop,
    color1: color1Prop,
  } = GradSvgIconS6.W.els.gradIcon.ps!

  const gradSvgIconStyleClassName = 'gradSvgIconStyle'

  return (
    <SvgComponent
      css={[
        {
          width: sizeProp.var(),
          height: sizeProp.var(),
          [color0Prop.n]: color0Prop.var('black'),
          [color1Prop.n]: color1Prop.var('black'),
        },
        {
          [`&.${gradSvgIconStyleClassName}`]: {
            ...isdef(w) && { width: w },
            ...isdef(h) && { height: h },
            ...isdef(color0) && { [color0Prop.n]: color0 },
            ...isdef(color1) && { [color1Prop.n]: color1 },
          },
        },
      ]}
      className={clsx(className, GradSvgIconS6.W.els.gradIcon.n, gradSvgIconStyleClassName)}
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
  
  