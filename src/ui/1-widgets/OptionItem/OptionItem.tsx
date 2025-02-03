import { css } from '@emotion/react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import React from 'react'
import styled from '@emotion/styled'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { SvgGradIconS6 } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { TypeU } from '@util/common/TypeU.ts'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import PartialUndef = TypeU.PartialUndef
import ArrowAngledRoundedIc = SvgIconsPack.ArrowAngledRoundedIc
import Callback = TypeU.Callback




export type OptionItemProps = PartialUndef<{
  icon: React.ReactNode
  title: React.ReactNode
  value: React.ReactNode
  onClick: Callback
}>


const OptionItem = React.memo((props: OptionItemProps) => {
  const { icon, title, value, onClick } = props
  
  return (
    <Button
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
        <ArrowAngledRoundedIc css={SvgIconS6.t(nextIconS)} />
      </NextIconFrame>
      
    </Button>
  )
})
export default OptionItem



const buttonStyle = (t: AppTheme.Theme) => css`
  ${ButtonS6.t(ButtonS6.S.Text.Rect.Big.normal)(t)};
  ${ButtonS6.W.t(t, {
    button: {
      w: 'full', hMin: 50, h: 'ct', p: [2, 0],
      textAlign: 'start', ...WidgetStyleCommon.Txt.lg16,
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
    ${p => SvgGradIconS6.t(optionAndValueItemGradIconS)(p.theme)}
  }
  > {
    ${p => SvgIconS6.t(optionAndValueItemIconS)(p.theme)}
  }
`

const optionAndValueItemGradIconS: AppWidgetStyle = [SvgGradIconS6.S.Normal.normal, {
  gradIconW: '60%',
}]
const optionAndValueItemIconS: AppWidgetStyle = t => [SvgIconS6.S.base, {
  iconH: '50%',
  iconColor: t.boxNormal.ct3[0],
}]
const TitleFrame = styled.div`
  grid-area: title;
  justify-self: start;
  display: grid;
  place-items: center start;
  
  color: ${p => p.theme.boxNormal.ct[0]};
`
const ValueFrame = styled.div`
  grid-area: value;
  justify-self: start;
  display: grid;
  place-items: center start;
`
const Value = styled.div`
  display: -webkit-box;
  
  color: ${p => p.theme.boxNormal.ct3[0]};
  
  max-height: 40px;
  overflow: hidden;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  box-orient: vertical;
  -webkit-box-orient: vertical;
`
const NextIconFrame = styled.div`
  grid-area: next;
  place-self: start stretch;
  width: 40px;
  height: 50px;
  display: grid;
  place-items: center;
`
const nextIconS: AppWidgetStyle = t => [SvgIconS6.S.Normal.normal, {
  iconSz: 24, iconColor: t.boxNormal.ct3[0],
}]

