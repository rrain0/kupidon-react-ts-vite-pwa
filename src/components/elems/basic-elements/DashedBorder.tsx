import styled from '@emotion/styled'
import { flexStyle } from '@libs/short-propsed/style/flexStyle.ts'
import clsx from 'clsx'
import React from 'react'

import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import { Pu } from '@utils/base/typeUtils.ts'
import { FunOrObj } from '@utils/base/typeUtils.ts'
import { isfunction } from '@utils/base/typeUtils.ts'



export type DashedBorderStyleProps = Pu<{
  rad: number
  w: number
  wAdd: number
  color: string
}>

export type DashedBorderExtraProps = Pu<{
  props: FunOrObj<(theme: AppTheme.Theme) => DashedBorderStyleProps>
}>

export type DashedBorderProps =
  & Omit<React.ComponentProps<typeof Flex>, 'children'>
  & DashedBorderExtraProps



const DashedBorder = React.memo((props: DashedBorderProps) => {
  const {
    props: dashedBorderProps,
    className,
    ...restProps
  } = props
  
  const dashedBorderViewClassName = 'dashedBorder'
  
  return (
    <DashedBorderView
      data-display-name='DashedBorder'
      {...restProps}
      className={clsx(className, dashedBorderViewClassName)}
      css={t => ({
        [`&.${dashedBorderViewClassName}`]: (() => {
          const p = dashedBorderProps
          const d = isfunction(p) ? p(t) : p
          if (d) {
            const { rad = 0, w = 0, wAdd = 0, color } = d
            return flexStyle({
              a: -wAdd,
              rad: rad + wAdd,
              borderWidth: w + wAdd,
              borderColor: color,
            })
          }
        })(),
      })}
    />
  )
})
DashedBorder.displayName = 'DashedBorder'
export default DashedBorder




const DashedBorderView = styled(Flex)(flexStyle({
  noOverflow: true,
  absolute: true,
  borderStyle: 'dashed',
}))


