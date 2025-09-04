import { css } from '@emotion/react'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { WidgetStyleCommon } from 'src/styles/common/WidgetStyleCommon.ts'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import React from 'react'
import styled from '@emotion/styled'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import { GradSvgIconS6 } from 'src/components/elems/icons/GradSvgIcons/GradSvgIconS6.ts'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'

import { Pu } from '@utils/base/math/typeUtils.ts'
import ArrowAngledRoundedIc from 'src/components/elems/icons/SvgIcons/pack/ui/ArrowAngledRoundedIc.tsx'
import { Callback } from '@utils/base/math/typeUtils.ts'
import maxLines = EmotionCommon.maxLines




export type OptionItemProps = Pu<{
  icon: React.ReactNode
  title: React.ReactNode
  value: React.ReactNode
  onClick: Callback
}>


const OptionItem = React.memo((props: OptionItemProps) => {
  const { icon, title, value, onClick } = props
  
  return (
    <Button
      data-display-name='OptionItem'
      css={buttonStyle}
      onClick={onClick}
    >
      
      <IconFrame>{icon}</IconFrame>
      <TitleFrame>{title}</TitleFrame>
      <ValueFrame>
        <Value>
          {value}
        </Value>
      </ValueFrame>
      <NextIconFrame>
        <ArrowAngledRoundedIc css={SvgIconS6.t(nextIconS)}/>
      </NextIconFrame>
      
    </Button>
  )
})
OptionItem.displayName = 'OptionItem'
export default OptionItem



const buttonStyle = (t: AppTheme.Theme) => css`
  ${ButtonS6.t(ButtonS6.S.text.rect.lg.normal)(t)};
  ${ButtonS6.W.t(t, {
    button: {
      w: 'full', hMin: 50, h: 'ct', p: [2, 0],
      textAlign: 'start', ...WidgetStyleCommon.Txt.s16LhNorm,
      display: 'grid',
      grid:
        `'icon title next' auto` +
        `'icon value next' auto` +
        `/ auto 1fr   auto`,
      g: [4, 0],
    },
  })}
`



const IconFrame = styled.div`
  grid-area: icon;
  place-self: start;
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  > {
    ${p => GradSvgIconS6.t(optionAndValueItemGradIconS)(p.theme)}
  }
  > {
    ${p => SvgIconS6.t(optionAndValueItemIconS)(p.theme)}
  }
`

const optionAndValueItemGradIconS: AppWidgetStyle = [GradSvgIconS6.S.icon.icon.full.accent, {
  gradIconW: '60%',
}]
const optionAndValueItemIconS: AppWidgetStyle = t => [SvgIconS6.Parts.base, {
  iconH: '50%',
  iconColor: t.boxDefault6.ct,
}]
const TitleFrame = styled.div`
  grid-area: title;
  justify-self: start;
  display: grid;
  place-items: center start;
  
  color: ${p => p.theme.boxDefault2.ct};
`
const ValueFrame = styled.div`
  grid-area: value;
  justify-self: start;
  display: grid;
  place-items: center start;
`
const Value = styled.div(({ theme: t }) => ([
  {
    maxHeight: 40,
    overflow: 'hidden',
    color: t.boxDefault6.ct,
  },
  maxLines(2),
]))
const NextIconFrame = styled.div`
  grid-area: next;
  place-self: start stretch;
  width: 40px;
  height: 50px;
  display: grid;
  place-items: center;
`
const nextIconS: AppWidgetStyle = t => [SvgIconS6.S.icon.icon.full.normal, {
  iconSz: 24, iconColor: t.boxDefault6.ct,
}]

