import { css } from '@emotion/react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { AppTheme } from 'src/ui-data/theme/AppTheme'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { PieProgressStyle } from 'src/ui/0-elements/PieProgress/PieProgressStyle'
import abs = EmotionCommon.abs
import flexC = EmotionCommon.flexC


export const imPlaceholderBoxS = (t: AppTheme.Theme) => css`
  ${abs};
  //pointer-events: none;
  border-radius: inherit;
  overflow: hidden;
  background: ${t.photos.bg[0]};
  ${flexC};
`

export const imPlaceholderIcS: AppWidgetStyle = t => [SvgIconS6.S.base, {
  iconSz: '30%',
  iconColor: t.photos.ct[0],
}]
export const imSmallPlaceholderIcS: AppWidgetStyle = [imPlaceholderIcS, {
  iconSz: '50%',
}]
export const imSmallPlaceholderIcFullTrans: AppWidgetStyle = t => [
  IconButtonS6.S.trans.round.lg2.normal2, {
    buttonSz: 'full',
    iconSz: '50%',
    iconColor: t.photos.ct[0],
  },
]

export const imPieProgressS = (t: AppTheme.Theme) => css`
  ${PieProgressStyle.El.thiz.pieProgress} {
    ${PieProgressStyle.Prop.prop.progressColor}: transparent;
    ${PieProgressStyle.Prop.prop.restColor}:     ${t.photos.ct[0]};
    height: 30%;
    aspect-ratio: 1;
  }
`

export const imSmallPieProgressS = (t: AppTheme.Theme) => css`
  ${imPieProgressS(t)};
  ${PieProgressStyle.El.thiz.pieProgress} {
    height: 50%;
  }
`

export const imPieProgressAccentS = (t: AppTheme.Theme) => css`
  ${imPieProgressS(t)};
  ${PieProgressStyle.El.thiz.pieProgress} {
    ${PieProgressStyle.Prop.prop.restColor}: ${t.photos.bg[0]};
  }
`
